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
    <article className="flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-xl text-brand-primary">
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

      <h3 className="mt-2 text-xl font-bold text-brand-text">{title}</h3>

      <p className="mt-3 flex-1 text-justify leading-7 text-brand-muted">
        {description}
      </p>

      {details.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-brand-border pt-5 text-sm text-brand-muted text-justify">
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
        className="mt-6 w-full rounded-lg border border-brand-primary px-4 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
      >
        {actionLabel}
      </button>
    </article>
  );
}

export default CatalogueCard;