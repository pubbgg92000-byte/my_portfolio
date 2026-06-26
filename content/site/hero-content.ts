export const heroCopy = {
  navItems: ["Home", "About", "Projects", "Experience", "Skills", "Contact"],
  eyebrow: "HELLO, I'M ARVIND",
  identity: "ARVIND",
  role: "Frontend Developer",
  headlinePrefix: "I build digital products that are",
  headlineAccents: ["fast", "useful", "delightful"],
  supportingText: "Frontend Developer crafting modern, interactive and scalable web experiences.",
  primaryCta: "View My Work",
  secondaryCta: "Download Resume",
  tourCta: "Follow Arvi",
} as const;

export const heroStats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "5+", label: "Technologies" },
  { value: "100%", label: "Client Satisfaction" },
] as const;

export const heroFeatures = [
  { title: "Clean Code", description: "Simple, readable and maintainable." },
  { title: "Modern Tech", description: "Using latest tools and frameworks." },
  { title: "Performance", description: "Fast, optimized and user focused." },
  { title: "Creative UI", description: "Designs that engage and delight." },
] as const;
