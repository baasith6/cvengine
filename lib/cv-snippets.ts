export type Snippet = {
  id: string;
  title: string;
  description: string;
  markdown: string;
  category: "Core" | "Optional";
};

export const CV_SNIPPETS: Snippet[] = [
  {
    id: "professional-summary",
    title: "Professional Summary",
    description: "Short opening paragraph for your CV (2–4 lines).",
    category: "Core",
    markdown: `## Professional Summary
Experienced [role] with [X] years in [industry/field]. Skilled in [key skill 1], [key skill 2], and [key skill 3]. Focus on [value you bring].`,
  },
  {
    id: "work-experience",
    title: "Work Experience",
    description: "Job entry with title, dates, and bullet achievements.",
    category: "Core",
    markdown: `## Work Experience
### [Job Title], [Company Name]
**Month YYYY – Month YYYY** (or Present)
- [Achievement with metric or outcome]
- [Another achievement]
- [Responsibility or result]`,
  },
  {
    id: "education",
    title: "Education",
    description: "Degree and institution in ATS-friendly format.",
    category: "Core",
    markdown: `## Education
### [Degree], [Institution]
**Year – Year**
[Relevant coursework, honors, or details.]`,
  },
  {
    id: "skills",
    title: "Skills",
    description: "Skills section with categories.",
    category: "Core",
    markdown: `## Skills
**Technical:** [Skill 1], [Skill 2], [Skill 3]
**Tools:** [Tool 1], [Tool 2]
**Languages:** [Language 1], [Language 2]`,
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Certifications or courses.",
    category: "Optional",
    markdown: `## Certifications
- **[Certification Name]** — [Issuer] (Year)
- **[Course or cert]** — [Provider]`,
  },
  {
    id: "single-bullet",
    title: "Achievement bullet",
    description: "One strong bullet (metric + action).",
    category: "Core",
    markdown: `- [Action verb] [what you did] that [result with number], e.g. improved X by 40%`,
  },
  {
    id: "projects",
    title: "Projects",
    description: "Side projects, open source, or portfolio work.",
    category: "Optional",
    markdown: `## Projects
### [Project Name]
**[Link or tech stack]**
- [What you built and why]
- [Outcome or metric]`,
  },
  {
    id: "volunteer",
    title: "Volunteer / Activities",
    description: "Volunteer work or extracurriculars.",
    category: "Optional",
    markdown: `## Volunteer / Activities
### [Role], [Organisation]
**Month YYYY – Present**
- [Responsibility or achievement]`,
  },
  {
    id: "references",
    title: "References",
    description: "Optional references line (or omit and provide when asked).",
    category: "Optional",
    markdown: `## References
References available on request.`,
  },
];
