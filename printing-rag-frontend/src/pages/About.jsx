import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function About() {
  const focusAreas = [
    ["Business communication", "Professional cards, stationery, brochures, and other materials for teams and businesses."],
    ["Events and promotion", "Visible, practical print for events, campaigns, shops, and special occasions."],
    ["Design guidance", "Clear advice on materials, sizes, finishes, and print-ready artwork."],
  ];

  const services = [
    ["Business cards", "Make a strong first impression with professional business cards.", "▣"],
    ["Flyers and brochures", "Promote your products, services, and events effectively.", "▤"],
    ["Banners and posters", "Get noticed with bold, high-quality large-format printing.", "▥"],
    ["Custom printing", "Bring your unique ideas to life with flexible print solutions.", "✦"],
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
        title="About Communicare | Printing Consultants"
        description="Learn how Communicare helps businesses, event organizers, and individuals choose reliable printing solutions."
        path="/about"
      />
      {/* Hero / About intro */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-brand-surface">
              About Communicare
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-300 sm:text-5xl">
              Reliable printing for every important message.
            </h1>
          </div>
          <p className="text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 text-justify">
            We combine dependable service, quality materials, and practical guidance
             to help customers choose the right printing solution. Whether you are launching 
             a business, looking for a professional design, promoting an event, or preparing professional materials,
              our goal is to make printing straightforward.
          </p>

        </div>
      </section>

      <section className="px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-brand-surface">
            What we help with
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {focusAreas.map(([title, description]) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-brand-background text-justify">{description}</p>
              </article>
            ))}
          </div>

          <Link
            to="/quote"
            className="mt-8 inline-block rounded-lg bg-brand-background px-5 py-3 font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            Talk about your project
          </Link>
        </div>
      </section>

      {/* Our services (now under "What we help with") */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-brand-surface">
            Our services
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-300 sm:text-4xl">
            Printing that supports your business.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Choose reliable printing services for marketing, branding, and professional
            communication.
          </p>
          <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, description, icon]) => (
              <article
                key={title}
                className="rounded-2xl border border-brand-border bg-brand-background p-6 transition hover:-translate-y-1 hover:border-brand-secondary hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/15 text-xl text-brand-primary">
                  {icon}
                </div>
                <h2 className="text-xl font-bold text-brand-text">{title}</h2>
                <p className="mt-3 leading-7 text-brand-muted text-justify">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;