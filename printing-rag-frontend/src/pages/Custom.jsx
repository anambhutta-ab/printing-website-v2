import CatalogueCard from "../components/CatalogueCard";
import SEO from "../components/SEO";
import { CUSTOM_PRINTING_SERVICES } from "./content";

function Custom({ onOpenChat }) {
  const steps = [
    ["01", "Tell us what you need", "Choose a service and share the intended size, quantity, material preference, finish, and deadline."],
    ["02", "Send your design or idea", "Provide a print-ready file, or contact our graphic designer with your logo, text, images, and design requirements."],
    ["03", "Review the details", "We confirm your specifications and share recommendations before production begins."],
    ["04", "Approve and print", "After final approval, your custom order moves into production for collection or delivery."],
  ];

return (
  <main
    style={{
      background:
        "linear-gradient(180deg, #1f2430 15%, #456882 75%, #DDDDDD 100%)",
      minHeight: "100%",
    }}
  >
    <SEO
      title="Custom Printing Services | Communicare"
      description="Order custom printing tailored to your brand, specifications, materials, finishes, and design requirements."
      path="/custom"
    />
    <section className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-surface sm:text-base sm:tracking-[0.2em]">
          Custom printing
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-300 sm:text-4xl">
          Printing tailored to your idea, brand, and requirements.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-lg sm:leading-8">
          Our custom printing services are made to order. Share your specifications and provide a
          print-ready design, or contact our graphic designer for professional design support.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {CUSTOM_PRINTING_SERVICES.map((service) => (
            <div key={service.id} className="flex h-full">
              <CatalogueCard
                {...service}
                actionLabel="Ask about this service"
                onAction={onOpenChat}
                className="flex h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      <section className="px-4 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white sm:text-base sm:tracking-[0.2em]">
            How custom orders work
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-250 sm:text-4xl">
            From your idea to a finished print.
          </h2>

          <div className="mt-7 grid gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map(([number, title, description], index) => (
              <div key={number} className="relative flex h-full">
                <article className="flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
                  <span className="text-sm font-bold tracking-[0.16em] text-brand-background text-justify">
                    {number}
                  </span>
                  <h3 className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl">{title}</h3>
                  <p className="mt-2 flex-1 text-justify text-sm leading-6 text-brand-background sm:mt-3 sm:text-base sm:leading-7">
                    {description}
                  </p>
                </article>

                {/* Arrow to next step */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 translate-x-1/2 xl:block">
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      {/* Chevron arrow */}
                      <svg
                        className="relative h-10 w-6 text-brand-secondary transition-transform duration-700 ease-in-out [animation:pulseArrow_2s_ease-in-out_infinite]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="url(#chevronGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 6l6 6-6 6" />
                        <defs>
                          <linearGradient
                            id="chevronGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor="#9aa0ad" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-white/10 bg-brand-primary p-4 sm:mt-10 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">
              Need design support?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white text-justify sm:mt-3 sm:text-base sm:leading-7">
              Share your brand name, text, logo, images, preferred style, and printing requirements.
              Our designer can help create professional, print-ready artwork.
            </p>
            <button
              type="button"
              onClick={onOpenChat}
              className="mt-5 rounded-lg bg-brand-background px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white sm:mt-6 sm:px-5 sm:py-3"
            >
              Ask about design support
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Custom;