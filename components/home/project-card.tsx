import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  year: string;
  imageUrl: string;
  imageAlt: string;
}

export function ProjectCard({
  title,
  description,
  category,
  year,
  imageUrl,
  imageAlt,
}: ProjectCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden glass bg-card-light dark:bg-card-dark border border-white/40 dark:border-white/5 hover:border-primary/20 dark:hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-900 relative">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover opacity-90 dark:opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-primary dark:text-white bg-white dark:bg-white/10 px-2 py-1 rounded shadow-sm dark:shadow-none">
            {category}
          </span>
          <span className="text-xs text-gray-500">{year}</span>
        </div>
        <h3 className="text-xl font-display font-semibold text-primary dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
