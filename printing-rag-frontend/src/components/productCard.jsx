import React from "react";

/**
 * @param {{
 *  title: string;
 *  description: string;
 *  price?: string;
 *  image?: string;
 *  tags?: string[];
 *  ctaLabel: "Order Now" | "Request a Quote" | string;
 *  onCtaClick?: () => void;
 * }} props
 */
export default function ProductCard({
  title,
  description,
  price,
  image,
  tags = [],
  ctaLabel,
  onCtaClick,
}) {
  return (
    <div className="bg-brand-surface rounded-lg shadow-card overflow-hidden flex flex-col">
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-brand-primary">
          {title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-brand-secondary/10 text-brand-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-text-secondary text-sm mt-2 flex-1">
          {description}
        </p>

        {price && (
          <p className="text-text-primary font-medium mt-3">
            From {price}
          </p>
        )}

        <button
          onClick={onCtaClick}
          className="mt-4 w-full bg-brand-accent hover:bg-brand-primary transition-colors text-white text-sm font-medium py-2 rounded-md"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}