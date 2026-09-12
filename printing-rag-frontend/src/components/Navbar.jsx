import { useState } from "react";
import { Link, NavLink } from "react-router-dom";


function Navbar({ onOpenChat }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition hover:text-brand-secondary md:hover:text-brand-background ${
      isActive ? "text-brand-primary md:text-brand-background" : "text-brand-navy md:text-slate-200"
    }`;


  function closeMenu() {
    setIsMenuOpen(false);
  }


  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/30 bg-white text-brand-navy backdrop-blur md:border-white/10 md:bg-brand-navy/95 md:text-white">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-4 lg:px-12">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 md:static"
          aria-label="Communicare Printing Consultants home"
        >
          <img
            src="/COMMUNICARE%20blue%20grey.png"
            alt="Communicare Printing Consultants"
            className="absolute left-1/2 h-9 w-auto -translate-x-1/2 object-contain md:hidden"
          />
          <span className="hidden items-center gap-3 md:flex">
            <span className="flex h-10 w-1 rounded-full bg-brand-background transition group-hover:h-12" />
            <span className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Communicare
              </span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-brand-background sm:text-xs sm:tracking-[0.25em]">
                Printing Consultants
              </span>
            </span>
          </span>
        </Link>


        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <NavLink to="/custom" className={linkClass}>
            Custom printing
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Ready-to-Buy
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/quote" className={linkClass}>
            Quote
          </NavLink>
          <button
            type="button"
            onClick={onOpenChat}
            className="rounded-lg bg-brand-secondary px-4 py-2 text-white shadow-sm transition hover:bg-brand-background hover:text-brand-navy hover:shadow-md"
          >
            Ask assistant
          </button>
        </nav>


        {/* Hamburger button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-brand-navy/20 text-brand-navy transition hover:bg-brand-navy/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <span
            className="flex h-5 w-5 flex-col items-center justify-center gap-1.5"
            aria-hidden="true"
          >
            <span
              className={`h-0.5 w-5 bg-current transition-all duration-200 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-current transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-all duration-200 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : "translate-y-1"
              }`}
            />
          </span>
        </button>
      </div>


      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          className="border-t border-brand-border/30 bg-white px-3 pb-4 pt-3 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            <NavLink
              to="/custom"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-sm font-semibold ${linkClass({ isActive })}`
              }
            >
              Custom printing
            </NavLink>
            <NavLink
              to="/services"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-sm font-semibold ${linkClass({ isActive })}`
              }
            >
              Ready-to-Buy
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-sm font-semibold ${linkClass({ isActive })}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/quote"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-sm font-semibold ${linkClass({ isActive })}`
              }
            >
              Get a quote
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}


export default Navbar;