import { Link } from "react-router-dom";
import { CONTACT_DETAILS } from "../pages/content";

const QUICK_LINKS = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Custom Printing", "/custom"],
  ["Get a Quote", "/quote"],
];

const SOCIAL_LINKS = [
  ["Facebook", "#"],
  ["Instagram", "#"],
  ["LinkedIn", "#"],
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-accent text-brand-background">
      <div className="mx-auto grid max-w-7xl gap-30 px-8 py-12 sm:px-6 lg:grid-cols-3 lg:px-20 lg:py-14">
        {/* Column 1: Communicare, tagline, and line */}
        <div>
          <p className="text-xl font-bold text-white">Communicare</p>
          <p className="mt-2 max-w-xs text-base leading-6 text-brand-background text-justify">
            Printing Consultants helping individuals and businesses turn ideas into professional,
            high-quality prints.
          </p>
          <div className="mt-4 h-px w-75 bg-brand-muted " />
        </div>

        <div>
          <h2 className="text-base font-semibold uppercase tracking-[0.16em] text-white">
            Contact
          </h2>
          <div className="mt-4 space-y-3 text-base leading-6">
            <a
              className="flex items-center gap-2 transition hover:text-white"
              href={`mailto:${CONTACT_DETAILS.email}`}
            >
              <svg
                className="h-4 w-4 flex-none text-brand-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {CONTACT_DETAILS.email}
            </a>
            <a
              className="flex items-center gap-2 transition hover:text-white"
              href={`tel:${CONTACT_DETAILS.phoneLink}`}
            >
              <svg
                className="h-4 w-4 flex-none text-brand-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92Z" />
              </svg>
              {CONTACT_DETAILS.phoneDisplay}
            </a>
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 flex-none text-brand-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {CONTACT_DETAILS.location}
            </span>
          </div>
        </div>

        {/* Column 3: Quick links */}
        <nav aria-label="Footer navigation">
          <h2 className="text-base font-semibold uppercase tracking-[0.16em] text-white">
            Quick links
          </h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-base">
            {QUICK_LINKS.map(([label, to]) => (
              <Link key={to} to={to} className="transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Follow us
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                aria-label={`${label} placeholder link`}
                title={`${label} placeholder`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-xs font-bold text-brand-background transition hover:border-brand-background hover:bg-brand-background hover:text-brand-navy"
              >
                {label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div> */}
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-brand-background sm:px-6">
        © 2026 Communicare Printing Consultants. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;