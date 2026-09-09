import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import SEO from "../components/SEO";

function Home() {
  const destinations = [
    ["Ready-to-Buy", "Business cards, flyers, banners, and more.", "/services"],
    ["Custom printing", "Made-to-order projects with design support.", "/custom"],
    ["Get a quote", "Tell us what you need and start a conversation.", "/quote"],
  ];

  return (
    <main
      style={{
        background:
          "linear-gradient(180deg, #1f2430 15%, #456882 70%, #DDDDDD 100%)",
        minHeight: "100%",
      }}
    >
      <SEO
        title="Communicare | Professional Printing Consultants"
        description="Communicare provides professional printing, custom design support, 
        and practical guidance for businesses, events, and everyday projects."
        path="/"
      />
      <section className="relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[560px] 
        lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12">
          <div className="relative z-10">
            <p className="mb-5 font-semibold uppercase tracking-[0.2em] text-brand-secondary sm:text-base sm:tracking-[0.28em]">
              Quality printing, made simple
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Custom Printing Solutions for Your Brand
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-brand-background sm:text-lg sm:leading-8">
              From ideas to prints, we make the process simple, transparent and
              stress free.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/about#our-services"
                className="rounded-lg border border-brand-background px-6 py-3 text-center font-semibold text-brand-background
                transition hover:border-white hover:bg-white/10 focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Services
              </Link>
              <div className="relative">
                <details className="group">
                  <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-white/40 px-6 py-3 font-semibold text-white
                    transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Explore Products</span>
                    <span className="ml-2 text-sm">⏷</span>
                  </summary>

                  <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-white/40 bg-[#1f2430] shadow-lg">
                    <a
                      href="/services"
                      className="block px-4 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      Ready-to-Buy Items
                    </a>
                    <a
                      href="/custom"
                      className="block px-4 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      Custom Orders
                    </a>
                  </div>
                </details>
              </div>


              <Link
                to="/quote"
                className="rounded-lg bg-brand-background px-6 py-3 text-center font-semibold text-brand-navy transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-background"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[280px] flex-col items-center justify-center lg:flex">
            <p className="max-w-2xl py-5 text-center text-base font-semibold uppercase tracking-[0.18em] text-brand-muted sm:text-base">
              Trusted since 1986
            </p>
            <img
              src="/COMMUNICARE%20blue%20grey.png"
              alt="Communicare Printing Consultants"
              className="relative mt-4 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            // glowing shadow
            />
          </div>

        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {destinations.map(([title, description, to]) =>
            <Link key={to} to={to} className="rounded-2xl border border-brand-border bg-brand-text p-6
         transition hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg">
              <h2 className="text-2xl font-bold text-brand-surface">
                {title}</h2><p className="mt-3 leading-7 text-brand-surface">
                {description}</p>
              <span className="mt-5 inline-block font-semibold text-brand-secondary">
                Learn more →</span>
            </Link>)}
        </div>
      </section>
      <section className="px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center">
            <img
              src="/COMMUNICARE%20blue%20grey.png"
              alt="Communicare Printing Consultants"
              className="h-auto w-full max-w-[280px] rounded-lg object-contain sm:max-w-[360px]"
            />
          </div>
          <StatsSection />
          <AboutSection />
        </div>
      </section>
    </main>
  );
}

function StatsSection() {
  const stats = [
    { target: 40, suffix: "+", label: "Years of Experience" },
    { target: 100, suffix: "+", label: "Clients Served" },
    { target: 10000, suffix: "+", label: "Projects Completed" },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3">
      {stats.map(({ target, suffix, label }) => (
        <CounterStat
          key={label}
          target={target}
          suffix={suffix}
          label={label}
        />
      ))}
    </div>
  );
}

function CounterStat({ target, suffix, label }) {
  const ref = useRef(null);
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.65 } // starts when 65% of the card is visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let frameId;
    const duration = 2500; // ms
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, target]);

  return (
    <article
      ref={ref}
      className="rounded-2xl border border-brand-border bg-brand-navy p-6 text-center shadow-lg shadow-black/10"
    >
      <p className="text-3xl font-bold text-white sm:text-3xl">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white">
        {label}
      </p>
    </article>
  );
}

export { StatsSection };
function AboutSection() {
  return (
    <section className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy">
        About Communicare
      </p>
      <h2 className="mt-3 text-3xl font-bold text-brand-text sm:text-4xl">
        Reliable printing for every important message.
      </h2>
      <p className="mt-4 text-base leading-7 text-brand-primary sm:text-lg sm:leading-8">
        We combine dependable service, quality materials, and practical guidance
        to help businesses, event organizers, and individuals choose the right
        printing solution for every project.
      </p>
    </section>
  );
}

export default Home;
