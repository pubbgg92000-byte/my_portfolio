export type BusinessItem = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  coverImage?: string;
  galleryImages: string[];
  type: string;
  stack: string[];
  status: string;
  links: { label: string; href: string }[];
};

export const businessItems: BusinessItem[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    summary:
      "Brand-facing sites for service businesses, portfolios, and companies that need a polished online presence.",
    description:
      "A business site should explain what is offered, prove the work visually, and make the next step obvious without feeling pushy or crowded.",
    coverImage: "/images/projects/pro-shoot/cover/proshoot_cover.png",
    galleryImages: [],
    type: "Website / service business",
    stack: ["Next.js", "Tailwind CSS", "Responsive layouts"],
    status: "Available service direction",
    links: [{ label: "See Pro Shoot", href: "/projects/pro-shoot" }],
  },
  {
    slug: "internal-tools",
    title: "Internal Tools and Dashboards",
    summary:
      "Workflow-heavy interfaces for teams that need visibility, structure, and clear daily-use screens.",
    description:
      "Dashboard and admin interfaces need strong information hierarchy, role-aware navigation, and reusable UI systems that keep complex work readable.",
    coverImage: "/images/projects/staffly/cover/staffly_cover.png",
    galleryImages: [],
    type: "Dashboard / operations UI",
    stack: ["React", "TypeScript", "Product UI"],
    status: "Portfolio-backed capability",
    links: [{ label: "See Staffly", href: "/projects/staffly" }],
  },
  {
    slug: "resale-inventory-context",
    title: "Small-Business Operations Context",
    summary:
      "Hands-on resale and inventory experience that informs storefront, inventory, and workflow thinking.",
    description:
      "A short-term local resale operation gave practical exposure to sourcing, pricing, stock handling, and day-to-day business operations. It is business context, not a software case study.",
    galleryImages: [],
    type: "Real business experience",
    stack: ["Sourcing", "Inventory", "Local sales"],
    status: "Publishable details TBD",
    links: [{ label: "Talk business web", href: "/contact" }],
  },
];
