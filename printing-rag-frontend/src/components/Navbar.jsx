import { Link, NavLink } from "react-router-dom";

function Navbar({ onOpenChat }) {
  const linkClass = ({ isActive }) =>
    `transition hover:text-brand-background ${isActive ? "text-brand-background" : "text-slate-200"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-12">
        <Link to="/" className="group flex items-center gap-3" aria-label="Communicare Printing Consultants home">
          <span className="flex h-10 w-1 rounded-full bg-brand-background transition group-hover:h-12" />
          <span className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Communicare
              </span>
            <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-brand-background sm:text-xs sm:tracking-[0.25em]">
              Printing Consultants
              </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <NavLink to="/custom" className={`${linkClass} transition hover:text-brand-secondary`}>Custom printing</NavLink>
          <NavLink to="/services" className={`${linkClass} transition hover:text-brand-secondary`}>Ready-to-Buy</NavLink>
          <NavLink to="/about" className={`${linkClass} transition hover:text-brand-secondary`}>About</NavLink>
          <NavLink to="/quote" className={`${linkClass} transition hover:text-brand-secondary`}>Quote</NavLink>
          <button type="button" onClick={onOpenChat} className="rounded-lg bg-brand-secondary px-4 py-2 text-white shadow-sm transition hover:bg-brand-background hover:text-brand-navy hover:shadow-md">Ask assistant</button>
        </nav>

        <button type="button" onClick={onOpenChat} className="shrink-0 rounded-lg bg-brand-secondary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-background hover:text-brand-navy sm:px-4 sm:text-sm md:hidden">Chat</button>
      </div>
    </header>
  );
}

export default Navbar;