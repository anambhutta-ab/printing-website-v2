function CatalogueCard({
  title,
  description,
  category,
  availability,
  details = [],
  icon,
  actionLabel = "Contact us",
  onAction,
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-lg text-brand-primary sm:h-12 sm:w-12 sm:text-xl">
          {icon}
        </div>

        {availability && (
          <span className="rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-semibold text-brand-accent">
            {availability}
          </span>
        )}
      </div>

      {/* <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">
        {category}
      </p> */}

      <h3 className="mt-2 text-lg font-bold text-brand-text sm:text-xl">{title}</h3>

      <p className="mt-3 flex-1 text-justify text-sm leading-6 text-brand-muted sm:text-base sm:leading-7">
        {description}
      </p>

      {details.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-brand-border pt-4 text-xs text-brand-muted text-justify sm:mt-5 sm:pt-5 sm:text-sm">
          {details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="font-bold text-brand-primary" aria-hidden="true">
                •
              </span>

              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onAction}
        className="mt-4 w-full rounded-lg border border-brand-primary px-3 py-2.5 text-xs font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white sm:mt-6 sm:px-4 sm:py-3 sm:text-sm"
      >
        {actionLabel}
      </button>
    </article>
  );
}

export default CatalogueCard;