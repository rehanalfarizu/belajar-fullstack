import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parse as parseJavaScript } from "@babel/parser";
import { parse as parseYaml } from "yaml";

const root = process.cwd();
const verbose = process.argv.includes("--verbose");
const ignoredDirectories = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  "vendor",
]);
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"]);
const vueExtensions = new Set([".vue"]);
const markdownExtensions = new Set([".md"]);
const htmlExtensions = new Set([".html"]);
const yamlExtensions = new Set([".yml", ".yaml"]);
const jsonExtensions = new Set([".json"]);

const errors = [];
const warnings = [];
const statistics = {
  files: 0,
  lines: 0,
  markdown: 0,
  source: 0,
  vue: 0,
  html: 0,
};

function relative(filePath) {
  return path.relative(root, filePath) || ".";
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(absolute));
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }

  return files;
}

function validateJavaScript(filePath, text) {
  statistics.source += 1;

  try {
    parseJavaScript(text, {
      sourceType: "unambiguous",
      allowAwaitOutsideFunction: true,
      errorRecovery: false,
      plugins: [
        "jsx",
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
        "dynamicImport",
        "importMeta",
        "topLevelAwait",
        "typescript",
      ],
    });
  } catch (error) {
    const location = error.loc ? `:${error.loc.line}:${error.loc.column + 1}` : "";
    errors.push(`${relative(filePath)}${location} — sintaks tidak valid: ${error.message}`);
  }
}

function validateVue(filePath, text) {
  statistics.vue += 1;
  const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  const scripts = [...text.matchAll(scriptPattern)];

  if (scripts.length === 0) {
    warnings.push(`${relative(filePath)} — Vue SFC tidak memiliki <script>`);
  }

  for (const script of scripts) {
    validateJavaScript(filePath, script[1]);
  }

  if (!/<template\b[^>]*>[\s\S]*<\/template>/i.test(text)) {
    warnings.push(`${relative(filePath)} — Vue SFC tidak memiliki <template>`);
  }
}

function validateMarkdown(filePath, text) {
  statistics.markdown += 1;
  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;

  for (const match of text.matchAll(linkPattern)) {
    let target = match[1].trim().replace(/^<|>$/g, "");
    if (
      !target ||
      /^(?:https?:|mailto:|tel:|data:|#)/i.test(target) ||
      target.includes("://")
    ) {
      continue;
    }

    target = target.split("#")[0].split("?")[0];
    try {
      target = decodeURIComponent(target);
    } catch {
      errors.push(
        `${relative(filePath)}:${lineNumberAt(text, match.index)} — URL lokal tidak valid: ${match[1]}`,
      );
      continue;
    }

    const resolved = path.resolve(path.dirname(filePath), target);
    if (!fs.existsSync(resolved)) {
      errors.push(
        `${relative(filePath)}:${lineNumberAt(text, match.index)} — tautan lokal tidak ditemukan: ${match[1]}`,
      );
    }
  }
}

function validateHtml(filePath, text) {
  statistics.html += 1;

  if (!/<!doctype html>/i.test(text)) {
    warnings.push(`${relative(filePath)} — tidak memiliki <!DOCTYPE html>`);
  }

  if (/<html\b/i.test(text) && !/<html\b[^>]*\blang=["'][^"']+["']/i.test(text)) {
    warnings.push(`${relative(filePath)} — elemen <html> tidak memiliki atribut lang`);
  }
}

function validateYaml(filePath, text) {
  try {
    parseYaml(text);
  } catch (error) {
    errors.push(`${relative(filePath)} — YAML tidak valid: ${error.message}`);
  }
}

function validateJson(filePath, text) {
  try {
    JSON.parse(text);
  } catch (error) {
    errors.push(`${relative(filePath)} — JSON tidak valid: ${error.message}`);
  }
}

function validateUnexpectedCharacters(filePath, text) {
  if (!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) return;

  const allowedContexts = [
    /Hello,? 世界/u,
    /["']中文["']/u,
    /karakter seperti ["'][^"']*中/u,
  ];

  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (
      /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(line) &&
      !allowedContexts.some((pattern) => pattern.test(line))
    ) {
      warnings.push(
        `${relative(filePath)}:${index + 1} — periksa karakter CJK yang mungkin tidak disengaja`,
      );
    }
  });
}

function validateCurriculumDirectories() {
  for (const level of fs.readdirSync(root, { withFileTypes: true })) {
    if (!level.isDirectory() || !level.name.startsWith("LEVEL-")) continue;

    const levelPath = path.join(root, level.name);
    const emptyDirectories = [];

    function findEmptyDirectories(directory) {
      const entries = fs.readdirSync(directory, { withFileTypes: true });
      const visibleEntries = entries.filter(
        (entry) => !ignoredDirectories.has(entry.name),
      );

      if (visibleEntries.length === 0) {
        emptyDirectories.push(relative(directory));
        return;
      }

      for (const entry of visibleEntries) {
        if (entry.isDirectory()) {
          findEmptyDirectories(path.join(directory, entry.name));
        }
      }
    }

    findEmptyDirectories(levelPath);
    if (emptyDirectories.length > 0) {
      warnings.push(
        `${level.name} — ${emptyDirectories.length} folder kosong: ${emptyDirectories.join(", ")}`,
      );
    }
  }
}

const files = walk(root);

for (const filePath of files) {
  const extension = path.extname(filePath).toLowerCase();
  const text = fs.readFileSync(filePath, "utf8");

  statistics.files += 1;
  statistics.lines += text === "" ? 0 : text.split("\n").length;

  if (sourceExtensions.has(extension)) validateJavaScript(filePath, text);
  if (vueExtensions.has(extension)) validateVue(filePath, text);
  if (markdownExtensions.has(extension)) validateMarkdown(filePath, text);
  if (htmlExtensions.has(extension)) validateHtml(filePath, text);
  if (yamlExtensions.has(extension)) validateYaml(filePath, text);
  if (jsonExtensions.has(extension)) validateJson(filePath, text);

  if (!filePath.includes(`${path.sep}scripts${path.sep}`)) {
    validateUnexpectedCharacters(filePath, text);
  }
}

validateCurriculumDirectories();

console.log("Validasi kurikulum fullstack");
console.log(
  `Files: ${statistics.files} | Lines: ${statistics.lines} | Markdown: ${statistics.markdown} | Scripts: ${statistics.source} | Vue: ${statistics.vue} | HTML: ${statistics.html}`,
);

if (errors.length > 0) {
  console.error(`\nERROR (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
}

if (warnings.length > 0 && (verbose || errors.length === 0)) {
  console.warn(`\nWARNING (${warnings.length})`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length === 0) {
  console.log(`\nPASS — tidak ada error struktural.`);
}

process.exitCode = errors.length > 0 ? 1 : 0;
