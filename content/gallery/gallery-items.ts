import { projects } from "@/content/projects/projects";

export const galleryItems = projects.flatMap((project) =>
  [project.coverImage, ...project.galleryImages.slice(0, 2)].map((image, index) => ({
    id: `${project.slug}-${index}`,
    title: project.title,
    image,
    href: `/projects/${project.slug}`,
    category: project.category,
  })),
);
