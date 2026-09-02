import CatalogueCard from "../components/CatalogueCard";

const READY_TO_BUY_ITEMS = [
  {
    id: "notebooks",
    title: "Notebooks and Diaries",
    description:
      "Useful stationery for offices, students, events, and corporate gifting.",
    category: "Ready to buy",
    availability: "Available in stock",
    icon: "▤",
    details: [
      "Different sizes and page counts",
      "Plain, ruled, or custom cover options",
      "Suitable for personal or business use",
    ],
  },
  {
    id: "envelopes",
    title: "Envelopes",
    description:
      "Professional envelopes for letters, invoices, invitations, and business communication.",
    category: "Ready to buy",
    availability: "Available in stock",
    icon: "✉",
    details: [
      "Common business and invitation sizes",
      "Suitable for office and personal use",
      "Ask us about branded envelope printing",
    ],
  },
  {
    id: "labels",
    title: "Labels and Stickers",
    description:
      "Ready-to-use labels and stickers for packaging, filing, products, and personal use.",
    category: "Ready to buy",
    availability: "Available in stock",
    icon: "◉",
    details: [
      "Paper and adhesive label options",
      "Useful for packaging and organization",
      "Custom sizes can also be requested",
    ],
  },
  {
    id: "greeting-cards",
    title: "Greeting and Gift Cards",
    description:
      "Ready-made cards for celebrations, professional gifting, and special occasions.",
    category: "Ready to buy",
    availability: "Available in stock",
    icon: "✦",
    details: [
      "Suitable for personal and business gifting",
      "Different themes and card styles",
      "Custom cards are available on request",
    ],
  },
];

const CUSTOM_PRINTING_SERVICES = [
  {
    id: "business-cards",
    title: "Business and Visiting Cards",
    description:
      "Professional cards for individuals, teams, businesses, and networking.",
    category: "Custom printing",
    availability: "Made to order",
    icon: "▣",
    details: [
      "Single- or double-sided printing",
      "Matte, glossy, or premium finishes",
      "Share a print-ready design or request designer assistance",
    ],
  },
  {
    id: "brochures-flyers",
    title: "Brochures and Flyers",
    description:
      "Marketing materials for promotions, company profiles, products, and events.",
    category: "Custom printing",
    availability: "Made to order",
    icon: "▤",
    details: [
      "Multiple sizes, folds, and paper options",
      "Suitable for marketing and information sharing",
      "Client design or graphic-designer support available",
    ],
  },
  {
    id: "flex-banners",
    title: "Flex Banners and Posters",
    description:
      "High-visibility printing for shops, events, campaigns, and outdoor promotion.",
    category: "Custom printing",
    availability: "Made to order",
    icon: "▥",
    details: [
      "Custom dimensions for your display area",
      "Suitable for indoor or outdoor use",
      "Design must be supplied or created with our designer",
    ],
  },
  {
    id: "stickers-labels",
    title: "Custom Stickers and Labels",
    description:
      "Branded labels and stickers for products, packaging, promotions, and events.",
    category: "Custom printing",
    availability: "Made to order",
    icon: "◉",
    details: [
      "Custom shapes, sizes, and material choices",
      "Useful for packaging and product branding",
      "Provide artwork or request design assistance",
    ],
  },
];

const CONTACT_DETAILS = {
  phoneDisplay: "+92 321 8446614",
  phoneLink: "+923218446614",
  whatsappLink: "+923218446614",
  email: "print.prestiges@gmail.com",
  location: "Davis Road, Lahore, Pakistan",
  hours: "Monday–Saturday, 10:00 AM–6:00 PM",
};
function Home({ onOpenChat }) {
  return (
    <main className="bg-brand-background text-brand-ink">
      <header className="border-b border-white/10 bg-brand-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-12">
          <a
            href="/"
            className="group flex items-center gap-3"
            aria-label="Communicare Printing Consultants home"
          >
            <span className="flex h-10 w-1 rounded-full bg-brand-ruby transition group-hover:h-12" />

            <span className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Communicare
              </span>

              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-brand-gold sm:text-xs sm:tracking-[0.25em]">
                Printing Consultants
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 md:flex">
            <a
              href="#services"
              className="transition hover:text-brand-gold"
            >
              Services
            </a>

            <a href="#items" className="transition hover:text-brand-ruby">
              Items
            </a>

            <a href="#about" className="transition hover:text-brand-ruby">
              About
            </a>

            <a href="#contact" className="transition hover:text-brand-ruby">
              Contact
            </a>

            <button
              type="button"
              onClick={onOpenChat}
              className="rounded-lg bg-brand-ruby px-4 py-2 text-white shadow-sm transition hover:bg-brand-ruby-dark hover:shadow-md"
            >
              Ask assistant
            </button>
          </nav>

          <button
            type="button"
            onClick={onOpenChat}
            className="shrink-0 rounded-lg bg-brand-ruby px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-ruby-dark hover:shadow-md sm:px-4 sm:text-sm md:hidden"
          >
            Chat
          </button>
        </div>
      </header>

      <section className="bg-brand-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[620px] lg:grid-cols-2 lg:gap-12 lg:px-12">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold sm:mb-5 sm:tracking-[0.25em]">
              Quality printing, made simple
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Bring your ideas to life on paper.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
              Communicare provides professional printing solutions for
              businesses, events, and everyday needs. From business cards to
              large-format banners, we help your brand make a lasting
              impression.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#services"
                className="rounded-lg bg-brand-ruby px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-ruby-dark"
              >
                Explore services
              </a>

              <button
                type="button"
                onClick={onOpenChat}
                className="rounded-lg border border-slate-400 px-6 py-3 text-center font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold"
              >
                Ask our assistant
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-600 bg-brand-navy-dark p-5 shadow-2xl sm:rounded-3xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">
                COMMUNICARE ASSISTANT
              </span>

              <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-medium text-brand-gold">
                Online
              </span>
            </div>

            <div className="space-y-4">
              <div className="max-w-xs rounded-2xl rounded-bl-none bg-white/10 p-4 text-sm text-slate-100">
                What would you like to print today?
              </div>

              <div className="ml-auto max-w-xs rounded-2xl rounded-br-none bg-brand-ruby p-4 text-sm text-white">
                I need professional business cards.
              </div>

              <div className="max-w-xs rounded-2xl rounded-bl-none bg-white/10 p-4 text-sm text-slate-100">
                I can help you choose the right size, paper, finish, and
                quantity.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-brand-surface px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ruby">
              Our services
            </p>

            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Printing that supports your business.
            </h2>

            <p className="mt-4 text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
              Choose reliable printing services for marketing, branding, and
              professional communication.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              title="Business cards"
              description="Make a strong first impression with professional business cards."
              icon="▣"
            />

            <ServiceCard
              title="Flyers and brochures"
              description="Promote your products, services, and events effectively."
              icon="▤"
            />

            <ServiceCard
              title="Banners and posters"
              description="Get noticed with bold, high-quality large-format printing."
              icon="▥"
            />

            <ServiceCard
              title="Custom printing"
              description="Bring your unique ideas to life with flexible print solutions."
              icon="✦"
            />
          </div>
        </div>
      </section>

      <section id="items" className="bg-brand-rose px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ruby">
              Ready-to-buy items
            </p>

            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Useful printing and stationery items, ready when you are.
            </h2>

            <p className="mt-4 text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
              Browse selected items that may be available for immediate purchase.
              Contact Communicare to confirm current stock, variations, and
              collection or delivery options.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {READY_TO_BUY_ITEMS.map((item) => (
              <CatalogueCard
                key={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                availability={item.availability}
                icon={item.icon}
                details={item.details}
                actionLabel="Ask about this item"
                onAction={onOpenChat}
              />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-border bg-brand-surface p-5 sm:mt-10 sm:p-6">
            <p className="font-semibold text-brand-ink">
              Looking for something specific?
            </p>

            <p className="mt-2 leading-7 text-brand-muted">
              Ask the Communicare Assistant about availability, materials, sizes,
              and suitable options—or contact us for customized printing.
            </p>

            <button
              type="button"
              onClick={onOpenChat}
              className="mt-4 rounded-lg bg-brand-ruby px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-ruby-dark"
            >
              Ask the assistant
            </button>
          </div>
        </div>
      </section>
      <section className="bg-brand-surface px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ruby">
              Custom printing
            </p>

            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Printing tailored to your idea, brand, and requirements.
            </h2>

            <p className="mt-4 text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
              Our custom printing services are made to order. Tell us what you need,
              share your specifications, and provide a print-ready design—or contact
              our graphic designer for professional design support.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CUSTOM_PRINTING_SERVICES.map((service) => (
              <CatalogueCard
                key={service.id}
                title={service.title}
                description={service.description}
                category={service.category}
                availability={service.availability}
                icon={service.icon}
                details={service.details}
                actionLabel="Ask about this service"
                onAction={onOpenChat}
              />
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-brand-border bg-brand-rose p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-ruby">
                Have a design ready?
              </p>

              <h3 className="mt-3 text-2xl font-bold text-brand-ink">
                Send your print-ready file.
              </h3>

              <p className="mt-3 leading-7 text-brand-muted">
                Share your final design and confirm the required size, quantity,
                finish, and deadline. We will guide you on the most suitable
                printing option before production.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-navy p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
                Need a design?
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Work with our graphic designer.
              </h3>

              <p className="mt-3 leading-7 text-slate-200">
                Share your idea, business details, text, logo, images, and preferred
                style. Our designer can help create a professional print-ready design
                for your project.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-rose px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ruby">
              How custom orders work
            </p>

            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              From your idea to a finished print.
            </h2>

            <p className="mt-4 text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
              We make custom printing simple. Share your requirements, provide your
              design or work with our graphic designer, and approve the final details
              before production begins.
            </p>
          </div>

         <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
            <OrderStep
              number="01"
              title="Tell us what you need"
              description="Choose a service and share the intended size, quantity, material preference, finish, and deadline."
            />

            <OrderStep
              number="02"
              title="Send your design or idea"
              description="Provide a print-ready file, or contact our graphic designer with your logo, text, images, and design requirements."
            />

            <OrderStep
              number="03"
              title="Review the details"
              description="We confirm your specifications and share any needed recommendations before the job moves to production."
            />

            <OrderStep
              number="04"
              title="Approve and print"
              description="After final approval, your custom order moves into production for collection or delivery."
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-ruby">
                Print-ready design checklist
              </p>

              <h3 className="mt-3 text-2xl font-bold text-brand-ink">
                Sending us a design?
              </h3>

              <p className="mt-3 leading-7 text-brand-muted">
                To help avoid delays, please send the final artwork with the relevant
                print details.
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-brand-muted">
                <li className="flex gap-3">
                  <span className="font-bold text-brand-ruby">✓</span>
                  <span>Preferred file: print-ready PDF whenever possible.</span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-brand-ruby">✓</span>
                  <span>Confirm the final size, quantity, finish, and deadline.</span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-brand-ruby">✓</span>
                  <span>Use high-resolution images for clear printed results.</span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-brand-ruby">✓</span>
                  <span>Keep important text and logos away from trim edges.</span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-brand-ruby">✓</span>
                  <span>Ask us if you need help preparing the file.</span>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl bg-brand-navy p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
                Graphic design support
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Do not have a design yet?
              </h3>

              <p className="mt-3 leading-7 text-slate-200">
                Our graphic designer can help transform your idea into professional,
                print-ready artwork. Share your brand name, text, logo, images,
                preferred style, and printing requirements to get started.
              </p>

              <button
                type="button"
                onClick={onOpenChat}
                className="mt-6 rounded-lg bg-brand-ruby px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-ruby-dark"
              >
                Ask about design support
              </button>
            </article>
          </div>
        </div>
      </section>
      <section id="about" className="bg-brand-surface px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-ruby">
              About Communicare
            </p>

            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Reliable printing for every important message.
            </h2>
          </div>

          <p className="text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
            We combine dependable service, quality materials, and practical
            guidance to help customers choose the right printing solution.
            Whether you are launching a business, promoting an event, or
            preparing professional materials, our goal is to make printing
            straightforward.
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="bg-brand-navy px-4 py-16 text-white sm:px-6 sm:py-20"
      >
          <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-2 xl:items-center">          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Get in touch
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Let’s discuss your printing needs.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Contact Communicare for ready-to-buy items, made-to-order printing,
              design support, and project guidance. You can also ask our Printing
              Assistant for help choosing the right option.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
              <a
                href={`tel:${CONTACT_DETAILS.phoneLink}`}
                className="rounded-lg bg-brand-ruby px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-ruby-dark sm:min-h-12"
              >
                Call us
              </a>

              <a
                href={`https://wa.me/${CONTACT_DETAILS.whatsappLink}?text=${encodeURIComponent(
                  "Hello Communicare, I would like to enquire about printing services."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-brand-gold px-5 py-3 text-center text-sm font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy sm:min-h-12"
              >
                WhatsApp us
              </a>

              <button
                type="button"
                onClick={onOpenChat}
                className="rounded-lg border border-white/40 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:min-h-12"
              >
                Ask the assistant
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ContactDetail
              label="Phone / WhatsApp"
              value={CONTACT_DETAILS.phoneDisplay}
              icon="☎"
            />

            <ContactDetail
              label="Email"
              value={CONTACT_DETAILS.email}
              icon={<span className="text-2xl">✉</span>} 
            />

            <ContactDetail
              label="Location"
              value={CONTACT_DETAILS.location}
              icon={<span className="text-4xl inline-flex items-center align-middle">⌖</span>} 
            />

            <ContactDetail
              label="Business hours"
              value={CONTACT_DETAILS.hours}
              icon={<span className="text-2xl">◷</span>} 
            />
          </div>
        </div>
      </section>

      <footer className="bg-brand-navy-dark px-4 py-10 text-center text-sm text-slate-300 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-bold text-white">Communicare</p>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Printing Consultants
          </p>

          <div className="mt-5 flex max-w-3xl flex-col items-center justify-center gap-2 text-center text-slate-300 sm:mx-auto sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            <a
              href={`tel:${CONTACT_DETAILS.phoneLink}`}
              className="transition hover:text-brand-gold"
            >
              {CONTACT_DETAILS.phoneDisplay}
            </a>

            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="transition hover:text-brand-gold"
            >
              {CONTACT_DETAILS.email}
            </a>

            <span>{CONTACT_DETAILS.location}</span>
          </div>

          <p className="mt-5 text-slate-400">
            Smart printing guidance powered by retrieval-augmented generation.
          </p>

          <p className="mt-4 text-xs text-slate-500">
            © 2026 Communicare. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
function ContactDetail({ label, value, icon }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-ruby/20 text-lg text-brand-gold">
        {icon}
      </span>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
        {label}
      </p>

      <p className="mt-2 break-words font-semibold text-white">{value}</p>
    </article>
  );
}

function OrderStep({ number, title, description }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm">
      <span className="text-sm font-bold tracking-[0.16em] text-brand-ruby">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-bold text-brand-ink">{title}</h3>

      <p className="mt-3 leading-7 text-brand-muted">{description}</p>
    </article>
  );
}

function ServiceCard({ title, description, icon }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-background p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-ruby/30 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-rose text-xl text-brand-ruby">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-brand-ink">{title}</h3>

      <p className="mt-3 leading-7 text-brand-muted">{description}</p>
    </article>
  );
}

export default Home;