import Image from "next/image";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {images.map((image, index) => (
        <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-surface">
          <Image
            src={image}
            alt={`${title} screen ${index + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
