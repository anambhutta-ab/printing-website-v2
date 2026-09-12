import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";


const SETUP_MEDIA = [
  { type: "video", src: "/Printing%20machine%20vid.mp4", alt: "Printing machine running" },
  { type: "video", src: "/Plotter%20cutting%20vid.mp4", alt: "Plotter cutting printed material" },
  // { type: "video", src: "/Plotter%20cutting%20vid2.mp4", alt: "Plotter cutting process" },

  // { type: "image", src: "/Plotter%20cutting.jpeg", alt: "Plotter cutting machine" },
  { type: "image", src: "/FinalProduct.jpeg", alt: "Finished printed product" },
  { type: "image", src: "/Dye%20Cutting1.jpeg", alt: "Dye cutting machine in operation" },
  { type: "image", src: "/Dye%20Cutting2.jpeg", alt: "Dye cutting equipment" }
];


function About() {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);


  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveMediaIndex((currentIndex) => (currentIndex + 1) % SETUP_MEDIA.length);
    }, 2500);


    return () => window.clearInterval(intervalId);
  }, []);


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
      <section className="px-4 py-12 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-surface sm:text-base sm:tracking-[0.2em]">
              About Communicare
            </p>
            <h1 className="mt-3 text-2xl font-bold text-slate-300 sm:text-5xl">
              Reliable printing for every important message.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
              We combine dependable service, quality materials, and practical guidance
              to help customers choose the right printing solution. Whether you are launching
              a business, looking for a professional design, promoting an event, or preparing
              professional materials, our goal is to make printing straightforward.
            </p>
          </div>


          <div className="flex w-full justify-center drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] lg:justify-end">
            <div className="inline-flex w-full max-w-[22rem] flex-col overflow-hidden rounded-2xl border border-white/15 bg-brand-navy/40 shadow-2xl backdrop-blur sm:w-100">
              <div className="flex items-center justify-center gap-2 border-b border-white/10 bg-brand-navy/60 px-4 py-3">
                <span className="text-xl text-brand-secondary">↬</span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-background sm:text-sm sm:tracking-[0.18em]">
                  A quick view of our setup
                </span>
              </div>


              <div className="relative flex h-[18rem] items-center justify-center overflow-hidden bg-brand-navy sm:h-[26rem]">
                {SETUP_MEDIA[activeMediaIndex].type === "video" ? (
                  <video
                    key={SETUP_MEDIA[activeMediaIndex].src}
                    className="pointer-events-none h-full w-full object-cover"
                    src={SETUP_MEDIA[activeMediaIndex].src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    aria-label={SETUP_MEDIA[activeMediaIndex].alt}
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover"
                    src={SETUP_MEDIA[activeMediaIndex].src}
                    alt={SETUP_MEDIA[activeMediaIndex].alt}
                  />
                )}


                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent pb-4 pt-10">
                  {SETUP_MEDIA.map((media, index) => (
                    <span
                      key={media.src}
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        index === activeMediaIndex
                          ? "w-5 bg-white"
                          : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="px-4 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-surface sm:text-base sm:tracking-[0.2em]">
            What we help with
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {focusAreas.map(([title, description]) => (
              <article
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-lg sm:p-6"
              >
                <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-brand-background/90 sm:mt-3 sm:text-base sm:leading-7">
                  {description}
                </p>
              </article>
            ))}
          </div>


          <Link
            to="/quote"
            className="mt-6 inline-block rounded-lg bg-brand-background px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white sm:mt-8 sm:px-5 sm:py-3"
          >
            Talk about your project
          </Link>
        </div>
      </section>


      {/* Our services */}
      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-surface sm:text-base sm:tracking-[0.2em]">
            Our services
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-300 sm:text-4xl">
            Printing that supports your business.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-lg sm:leading-8">
            Choose reliable printing services for marketing, branding, and professional
            communication.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, description, icon]) => (
              <article
                key={title}
                className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-background p-4 transition hover:-translate-y-1 hover:border-brand-secondary hover:shadow-lg sm:p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent/15 text-lg text-brand-primary transition group-hover:scale-110 sm:mb-5 sm:h-12 sm:w-12 sm:text-xl">
                  {icon}
                </div>
                <h2 className="text-lg font-bold text-brand-text sm:text-xl">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-brand-muted sm:mt-3 sm:text-base sm:leading-7">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


export default About;