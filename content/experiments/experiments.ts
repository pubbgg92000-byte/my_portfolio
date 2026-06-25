export type Experiment = {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  type: string;
  status: string;
  href: string;
};

export const experiments: Experiment[] = [
  {
    slug: "sculpture-gallery-pacing",
    title: "Sculpture Gallery Pacing",
    summary: "Image-led rhythm, quiet motion, and editorial spacing for immersive visual work.",
    coverImage: "/images/projects/sculpt-verse/cover/sculpt_verse_cover.png",
    type: "Gallery study",
    status: "Case-study backed",
    href: "/projects/sculpt-verse",
  },
  {
    slug: "premium-showcase-layouts",
    title: "Premium Showcase Layouts",
    summary: "Composed frames for creative-service websites where visuals and inquiry flow stay balanced.",
    coverImage: "/images/projects/pro-shoot/gallery/proshoot_gallery-1.png",
    type: "Presentation study",
    status: "Portfolio direction",
    href: "/projects/pro-shoot",
  },
  {
    slug: "interface-depth-studies",
    title: "Interface Depth Studies",
    summary: "Layered panels, dimensional hover states, and product UI surfaces for focused workflows.",
    coverImage: "/images/projects/staffly/gallery/staffly_admin_dashboard.png",
    type: "Interaction study",
    status: "In progress",
    href: "/projects/staffly",
  },
];
