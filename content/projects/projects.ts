import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "staffly",
    title: "Staffly",
    shortDescription:
      "AI-assisted HRMS learning build exploring multi-role dashboards, employee workflows, attendance, leave, and internal admin experiences.",
    longDescription:
      "Staffly is a self-initiated product case study focused on how a modern HRMS can organize internal employee workflows across multiple roles. It explores admin visibility, employee records, attendance, leave workflows, and self-service screens through a structured product interface.",
    category: "HRMS / dashboard / internal workflow product",
    tags: ["Dashboard", "HRMS", "Product UI"],
    coverImage: "/images/projects/staffly/cover/staffly_cover.png",
    galleryImages: [
      "/images/projects/staffly/gallery/staffly_admin_dashboard.png",
      "/images/projects/staffly/gallery/staffly_employee_dashboard.png",
      "/images/projects/staffly/gallery/staffly_admin_leaves_dashboard.png",
    ],
    year: "2026",
    role: "Frontend developer and project builder",
    projectType: "Self-initiated learning project / portfolio case study",
    problem:
      "Internal tools need dense workflows, clear role separation, and readable information architecture without feeling like a static dashboard demo.",
    solution:
      "A multi-role product structure with admin and employee experiences, reusable interface patterns, dashboard views, and workflow-oriented screens.",
    features: [
      "Admin dashboard overview",
      "Employee records and profile views",
      "Attendance and leave workflow screens",
      "Employee self-service areas",
      "Role-aware navigation structure",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI-assisted iteration"],
    liveUrl: "https://staffly-admin.vercel.app/auth/sign-in?from=%2F",
    githubUrl: "https://github.com/pubbgg92000-byte/staffly",
    featured: true,
    status: "Portfolio case study / in development",
  },
  {
    slug: "sculpt-verse",
    title: "Sculpt Verse",
    shortDescription:
      "A sculpture and gallery web experience exploring editorial storytelling, visual atmosphere, interaction, and premium presentation.",
    longDescription:
      "Sculpt Verse is a creative portfolio case study about translating sculpture, atmosphere, and digital pacing into an immersive gallery-like web experience. It uses restrained layouts and image-led storytelling to create a calm, curated presentation.",
    category: "Creative gallery / immersive visual experience",
    tags: ["Gallery", "Creative", "Editorial"],
    coverImage: "/images/projects/sculpt-verse/cover/sculpt_verse_cover.png",
    galleryImages: [
      "/images/projects/sculpt-verse/gallery/sculpt_verse_gallery-1.png",
      "/images/projects/sculpt-verse/gallery/sculpt_verse_gallery-2.png",
      "/images/projects/sculpt-verse/gallery/sculpt_verse_gallery-3.png",
    ],
    year: "2026",
    role: "Frontend developer and project builder",
    projectType: "Self-initiated learning project / portfolio case study",
    problem:
      "Creative showcase sites can become generic grids unless pacing, whitespace, imagery, and motion are treated as part of the story.",
    solution:
      "A dark, gallery-inspired presentation with large visual moments, editorial sections, and restrained interaction patterns.",
    features: [
      "Immersive opening scene",
      "Gallery-style visual sequence",
      "Detail-focused image panels",
      "Responsive premium presentation",
      "Atmosphere-led content pacing",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion-aware UI"],
    liveUrl: "https://sculpt-verse.vercel.app/",
    githubUrl: "https://github.com/pubbgg92000-byte/sculpt_verse",
    featured: true,
    status: "Portfolio case study / in development",
  },
  {
    slug: "pro-shoot",
    title: "Pro Shoot",
    shortDescription:
      "A photography and creative-business showcase exploring premium brand presentation, service storytelling, and inquiry-aware structure.",
    longDescription:
      "Pro Shoot is a business-facing website case study that balances brand impression, proof of work, service explanation, and contact direction for a photography or creative-service business.",
    category: "Photography / creative-business / showcase website",
    tags: ["Business Site", "Gallery", "Services"],
    coverImage: "/images/projects/pro-shoot/cover/proshoot_cover.png",
    galleryImages: [
      "/images/projects/pro-shoot/gallery/proshoot_gallery-1.png",
      "/images/projects/pro-shoot/gallery/proshoot_gallery-2.png",
      "/images/projects/pro-shoot/gallery/proshoot_gallery-3.png",
    ],
    year: "2026",
    role: "Frontend developer and project builder",
    projectType: "Self-initiated learning project / portfolio case study",
    problem:
      "A creative-service website needs to present strong visuals while still making services, trust, and inquiry paths clear.",
    solution:
      "A premium, image-led website structure with curated work, service storytelling, responsive galleries, and a direct contact path.",
    features: [
      "Image-led homepage structure",
      "Service and portfolio presentation",
      "Gallery-driven proof of work",
      "Inquiry-oriented CTA flow",
      "Responsive visual layout",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive image layouts"],
    liveUrl: "https://proshoot-gamma.vercel.app/",
    githubUrl: "https://github.com/pubbgg92000-byte/pro_shoot",
    featured: true,
    status: "Portfolio case study / in development",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
