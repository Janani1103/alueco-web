import Image from "next/image";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  size?: "default" | "large";
  align?: "left" | "center";
}

export function PageHero({
  label,
  title,
  description,
  image,
  imageAlt,
  size = "default",
  align = "left",
}: PageHeroProps) {
  const height =
    size === "large"
      ? "min-h-[50vh] md:min-h-[55vh]"
      : "min-h-[38vh] md:min-h-[42vh]";

  return (
    <section className={`relative w-full overflow-hidden ${height} max-h-[560px]`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center transition-transform duration-[8000ms] ease-out hover:scale-105"
        sizes="100vw"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
      <div
        className={`absolute inset-0 flex items-center ${
          align === "center" ? "justify-center text-center" : ""
        }`}
      >
        <div className={`container-main ${align === "center" ? "max-w-3xl" : "max-w-2xl"}`}>
          {label && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
              {label}
            </p>
          )}
          <h1
            className={`font-bold leading-tight tracking-tight text-white ${
              size === "large"
                ? "mt-3 text-3xl md:text-4xl lg:text-5xl"
                : "mt-3 text-3xl md:text-4xl"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
