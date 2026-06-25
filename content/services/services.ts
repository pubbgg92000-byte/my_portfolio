export type Service = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  deliverables: string[];
  relatedProjects: string[];
  ctaText: string;
};

export const services: Service[] = [
  {
    slug: "product-frontend",
    title: "Frontend Development for Product Interfaces",
    summary:
      "Dashboards, admin panels, internal tools, and workflow-heavy product screens with reusable frontend structure.",
    details:
      "I turn product requirements and workflow ideas into maintainable, responsive frontend systems with clear hierarchy and practical interaction patterns.",
    deliverables: [
      "Dashboard and admin interface implementation",
      "Multi-page frontend application structure",
      "Reusable UI components and layouts",
      "Tables, forms, and workflow screens",
    ],
    relatedProjects: ["Staffly"],
    ctaText: "Discuss a product UI",
  },
  {
    slug: "business-websites",
    title: "Business Websites and Brand-Facing Experiences",
    summary:
      "Premium websites for brands, service businesses, portfolios, and small companies that need clarity and polish.",
    details:
      "I structure pages around business storytelling, service clarity, responsive presentation, and a clear contact or inquiry path.",
    deliverables: [
      "Homepage and core business pages",
      "Service, portfolio, about, and contact sections",
      "Image-led responsive layouts",
      "Inquiry and conversion-aware content flow",
    ],
    relatedProjects: ["Pro Shoot"],
    ctaText: "Start a website",
  },
  {
    slug: "premium-showcase-sites",
    title: "Portfolio, Showcase, and Premium Presentation Sites",
    summary:
      "Editorial and gallery-style web experiences for creatives, studios, founders, and personal brands.",
    details:
      "I build polished presentation systems where imagery, pacing, copy, and motion work together without overwhelming the visitor.",
    deliverables: [
      "Portfolio and showcase pages",
      "Gallery and case-study layouts",
      "Motion-aware section flow",
      "Premium mobile presentation",
    ],
    relatedProjects: ["Sculpt Verse"],
    ctaText: "Plan a showcase",
  },
  {
    slug: "workflow-prototypes",
    title: "Workflow Frontend and AI-Assisted Prototypes",
    summary:
      "Early-stage interface exploration for internal tools, AI-assisted workflows, and operations-focused product ideas.",
    details:
      "This is exploratory product frontend work: mapping workflows into usable screens, dashboards, controls, and prototype experiences.",
    deliverables: [
      "Frontend prototypes",
      "Workflow and dashboard concepts",
      "AI-assisted interface explorations",
      "Control-panel style UI systems",
    ],
    relatedProjects: ["Staffly"],
    ctaText: "Explore a workflow",
  },
];
