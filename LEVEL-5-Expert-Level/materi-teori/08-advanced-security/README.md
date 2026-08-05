# Advanced Application Security

Level ini berfokus pada desain aman, supply chain, multi-tenant isolation, dan
kemampuan mencegah serta menangani insiden. Tool scan membantu, tetapi tidak
menggantikan reasoning tentang asset dan business abuse.

## 1. Secure design dan threat modeling

Untuk setiap sistem:

1. inventaris asset/data dan classification;
2. gambar data flow, identity, trust boundary, dan third party;
3. tulis actor, capability, entry point, dan abuse case;
4. nilai likelihood/dampak secara konsisten;
5. pilih preventive, detective, dan recovery control;
6. tetapkan owner, evidence, residual risk, dan review trigger.

Gunakan STRIDE, attack tree, atau metode lain sebagai prompt. Jangan menganggap
checklist sebagai bukti threat model lengkap.

## 2. Broken access control dan multi-tenancy

Access control adalah deny-by-default dan diperiksa pada setiap request/job/event.
Uji:

- horizontal privilege escalation antar-user;
- vertical escalation user ke admin;
- tenant A mengakses tenant B;
- object yang ID-nya dapat ditebak;
- background job/search/export/cache yang kehilangan tenant scope;
- admin/support impersonation dan audit trail;
- race antara perubahan privilege dan sesi aktif.

Gunakan database constraint/row-level policy bila sesuai sebagai defense in depth,
bukan pengganti policy aplikasi yang teruji.

## 3. Supply-chain security

- Minimalkan dependency dan maintainer trust yang diperlukan.
- Commit lockfile dan gunakan install reproducible/frozen.
- Review install script, release provenance/signature/SBOM bila tersedia.
- Pin CI action/image secara tepat untuk risiko lingkungan.
- Pisahkan build credential dari runtime credential.
- Lindungi branch/release, require review, dan catat artifact provenance.
- Scan vulnerability dan secret, tetapi punya SLA triage/remediation.
- Uji recovery ketika package/image/runner dianggap compromised.

Scanner menghasilkan false positive dan false negative; keputusan tetap perlu
asset context serta exploitability.

## 4. SSRF dan egress

Server-side URL fetcher, webhook, image/PDF renderer, dan import feature dapat
menjadi SSRF.

- allowlist tujuan/protocol bila mungkin;
- resolve dan blok loopback, private, link-local, metadata network;
- validasi kembali setelah redirect/DNS resolution sesuai threat model;
- batasi redirect, timeout, response size, dan content type;
- gunakan network egress policy;
- jangan meneruskan internal credential/header;
- log tujuan normalized dan keputusan policy.

Parser URL custom mudah salah; gunakan library standar dan test IPv4/IPv6,
encoding, redirect, serta DNS rebinding scenarios dalam lab berizin.

## 5. Cryptography dan secret lifecycle

- Jangan membuat algoritma crypto sendiri.
- Password memakai password hashing yang sesuai dan parameter terukur.
- Encryption key terpisah dari data, mempunyai version, rotation, dan access audit.
- Signing dan encryption menjawab masalah berbeda.
- Random token memakai CSPRNG, cukup entropy, expiry, single use, dan revocation.
- Rotasi harus menjaga read compatibility selama migrasi dan punya rollback.

## 6. Integrity dan deserialization

Jangan mengeksekusi/evaluate data tidak dipercaya. Signed payload hanya menjamin
integrity jika key dan verification benar; ia tidak otomatis merahasiakan isi.
Batasi tipe, ukuran, depth, dan schema pada parser. Plugin/template/rule engine
harus memiliki sandbox atau language yang benar-benar dibatasi.

## 7. Exceptional conditions

OWASP Top 10:2025 menekankan mishandling exceptional conditions. Prinsip:

- authorization/security dependency error harus fail closed;
- partial failure memiliki transaction/compensation yang eksplisit;
- timeout, cancellation, exhaustion, dan malformed state diuji;
- error tidak membocorkan detail, tetapi cukup untuk diagnosis internal;
- retry tidak boleh menciptakan side effect ganda;
- emergency bypass memiliki approval, expiry, alert, dan audit.

## 8. Security logging dan response

Log security-relevant event dengan correlation, actor, target, action, result,
reason code, dan source context yang aman. Jangan log credential/token/raw PII.
Deteksi harus memiliki baseline, severity, owner, runbook, dan latihan.

Incident security:

1. contain akses dan jaga bukti;
2. rotate/revoke credential;
3. tentukan scope serta affected data;
4. pulihkan dari artifact/data terpercaya;
5. komunikasikan sesuai kewajiban;
6. perbaiki root cause dan detection gap;
7. lakukan post-incident review tanpa menyalahkan individu.

## 9. Security verification plan

Gabungkan:

- architecture/threat-model review;
- code review pada trust boundary;
- static/dependency/secret/container/IaC scan;
- unit/integration authorization negative tests;
- dynamic/API testing di environment berizin;
- fuzz/property test untuk parser/invariant;
- penetration test berbasis risiko;
- incident/tabletop exercise.

## Exit criteria

- [ ] Threat model dan data classification direview.
- [ ] Access-control matrix memiliki automated negative tests.
- [ ] Supply-chain policy, SBOM/provenance, dan remediation SLA tersedia.
- [ ] Secret rotation/revocation pernah disimulasikan.
- [ ] SSRF/egress dan parser limits diuji.
- [ ] Alert/runbook serta security incident drill menghasilkan action item.
- [ ] Residual risk diterima oleh owner yang tepat, bukan disembunyikan.

## Referensi utama

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/0x00_2025-Introduction/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Software Assurance Maturity Model](https://owaspsamm.org/)
