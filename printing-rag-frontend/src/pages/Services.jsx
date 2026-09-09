import CatalogueCard from "../components/CatalogueCard";
import SEO from "../components/SEO";
import { READY_TO_BUY_ITEMS } from "./content";


function Services({ onOpenChat }) {
  return (
    <main>
      <SEO
        title="Printing Services | Communicare"
        description="Explore Communicare's ready-to-buy printing products and professional services for individuals, business, events, and promotion."
        path="/services"
      />
      <section
        id="ready-to-buy"
        className="relative px-4 py-16 sm:px-6 sm:py-20"
        style={{
          background:
            "linear-gradient(180deg, #1f2430 15%, #456882 75%, #DDDDDD 100%)",
          minHeight: "100%",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-brand-surface">
            Ready-to-buy items
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-300 sm:text-4xl">
            Coming Soon!
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {READY_TO_BUY_ITEMS.map((item) => (
              <CatalogueCard
                key={item.id}
                {...item}
                actionLabel="Ask about this item"
                onAction={onOpenChat}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


export default Services;