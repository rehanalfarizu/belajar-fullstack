// ============================================================
// FILE: 05-latihan-form/code/01-controlled-form.jsx
// MATERI: Controlled Components, Multiple Inputs, Array Fields
// ============================================================
import { useState } from "react";

// ============================================================
// TODO: EmployeeForm — Controlled Components
// ============================================================
// State shape:
//   {
//     fullName: "", email: "", phone: "",
//     department: "", role: "", salary: "",
//     startDate: "", skills: [""], isRemote: false,
//     employmentType: "full-time",
//   }
//
// Fitur:
//   1. Semua input controlled (value dari state)
//   2. Satu handler untuk semua input: handleChange
//      - e.target.name sebagai key
//      - e.target.type === "checkbox" ? checked : value
//   3. Dynamic skills: array of strings dengan add/remove
//   4. Salary formatting: number input → formatted display
//
// const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   setForm(prev => ({
//     ...prev,
//     [name]: type === "checkbox" ? checked : value
//   }));
// };
//
// const handleSkillChange = (index, value) => {
//   setForm(prev => {
//     const skills = [...prev.skills];
//     skills[index] = value;
//     return { ...prev, skills };
//   });
// };
//
// const addSkill = () => {
//   setForm(prev => ({ ...prev, skills: [...prev.skills, ""] }));
// };
//
// const removeSkill = (index) => {
//   setForm(prev => ({
//     ...prev,
//     skills: prev.skills.filter((_, i) => i !== index)
//   }));
// };
// ============================================================

const DEPARTMENTS = ["engineering", "marketing", "sales", "hr", "finance"];
const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

export function EmployeeForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    salary: "",
    startDate: "",
    skills: [""],
    isRemote: false,
    employmentType: "full-time",
  });

  const [submitted, setSubmitted] = useState(null);

  // TODO: handleChange — satu handler untuk semua input
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setForm(prev => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value
  //   }));
  // };

  // TODO: handleSkillChange(index, value)

  // TODO: addSkill — tambah field kosong ke skills array

  // TODO: removeSkill(index) — hapus skill di index

  // TODO: formatCurrency — format salary untuk display
  // const formatCurrency = (value) => {
  //   const num = parseInt(value.replace(/\D/g, ""), 10);
  //   return isNaN(num) ? "" : num.toLocaleString("id-ID");
  // };

  // TODO: handleSalaryBlur — format saat input blur

  // TODO: handleSubmit — console.log + reset form

  return (
    <div className="employee-form">
      <h1>Employee Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        {/* TODO: fullName (text) */}
        {/* TODO: email (email) */}
        {/* TODO: phone (tel) */}

        {/* Employment Info */}
        {/* TODO: department (select dari DEPARTMENTS) */}
        {/* TODO: role (text) */}
        {/* TODO: salary (number dengan formatting) */}
        {/* TODO: startDate (date) */}

        {/* Dynamic Skills */}
        {/* TODO: Skills list dengan add/remove buttons */}

        {/* Additional */}
        {/* TODO: isRemote (checkbox) */}
        {/* TODO: employmentType (radio buttons) */}

        {/* Submit */}
        {/* TODO: Submit button */}
      </form>

      {/* TODO: Preview submitted data */}
    </div>
  );
}

// ============================================================
// TODO: ContactForm — Multiple Fields dengan satu handleChange
// ============================================================
// State shape:
//   { name: "", email: "", subject: "", message: "", priority: "normal" }
//
// Fitur:
//   1. Satu handleChange untuk semua fields
//   2. Subject dropdown dengan options
//   3. Message textarea
//   4. Priority select (low, normal, high, urgent)
//   5. Character counter untuk message (max 500)
//   6. Submit validation
//
// const MAX_MESSAGE_LENGTH = 500;
//
// Validation rules:
//   - name: required, min 2 chars
//   - email: required, valid email
//   - subject: required
//   - message: required, max 500 chars
// ============================================================

const SUBJECTS = [
  "Pertanyaan Umum",
  "Bug Report",
  "Feature Request",
  "Kerjasama",
  "Lainnya",
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal",
  });

  const [errors, setErrors] = useState({});

  // TODO: handleChange — single handler

  // TODO: validate — return errors object

  // TODO: handleSubmit — validate, then show success

  return (
    <div className="contact-form">
      <h1>Hubungi Kami</h1>
      <form>
        {/* TODO: name, email, subject, message, priority */}
        {/* TODO: Character counter */}
        {/* TODO: Error messages */}
        {/* TODO: Submit button */}
      </form>
    </div>
  );
}

// ============================================================
// TODO: SurveyForm — Array Fields dengan Dynamic Add/Remove
// ============================================================
// State shape:
//   {
//     title: "", description: "",
//     questions: [
//       { id: "Q1", text: "", type: "text", options: [] }
//     ]
//   }
//
// Question types: "text" | "single" | "multiple"
//
// Fitur:
//   1. Survey title dan description
//   2. Dynamic questions dengan add/remove
//   3. Per question type:
//      - text: textarea
//      - single: radio buttons (options array)
//      - multiple: checkboxes (options array)
//   4. Add/remove options per question (untuk single/multiple)
//   5. Reorder questions (up/down buttons)
// ============================================================

export function SurveyForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [
      { id: "Q1", text: "", type: "text", options: [] },
    ],
  });

  // TODO: handleBasicChange — untuk title dan description

  // TODO: addQuestion — tambah question baru

  // TODO: removeQuestion(id) — hapus question

  // TODO: updateQuestion(id, updates) — update question

  // TODO: moveQuestion(id, direction) — reorder

  // TODO: addOption(questionId) — tambah option ke question

  // TODO: removeOption(questionId, optionIndex)

  // TODO: updateOption(questionId, optionIndex, value)

  return (
    <div className="survey-form">
      <h1>Buat Survey</h1>
      <form>
        {/* TODO: Title dan description */}
        {/* TODO: Questions list */}
        {/* TODO: Add question button */}
        {/* TODO: Submit button */}
      </form>
    </div>
  );
}