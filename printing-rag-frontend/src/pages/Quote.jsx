import { useState } from "react";
import SEO from "../components/SEO";
import { CONTACT_DETAILS } from "./content";

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  company: "",
  productType: "",
  quantity: "",
  description: "",
  timeline: "",
  finish: "",
};

const PRODUCT_OPTIONS = [
  "Business cards",
  "Flyers and brochures",
  "Banners and posters",
  "Stickers and labels",
  "Notebooks and diaries",
  "Envelopes",
  "Greeting and gift cards",
  "Other printing",
];

const PHONE_PATTERN = /^03\d{9}$/;

function Quote() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setStatus("idle");
  }

  function validateForm() {
    const nextErrors = {};
    const trimmedDescription = form.description.trim();
    const emailParts = form.email.trim().split("@");
    const hasValidEmail = emailParts.length === 2 && emailParts[0] && emailParts[1].includes(".");

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!PHONE_PATTERN.test(form.phone.trim())) {
      nextErrors.phone = "Use 11 digits in this format: 03XXxxxxxxxx.";
    }
    if (form.email.trim() && !hasValidEmail) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.productType) nextErrors.productType = "Please select a product type.";
    if (!form.quantity || !/^\d+$/.test(form.quantity) || Number(form.quantity) < 1) {
      nextErrors.quantity = "Enter a whole-number quantity greater than zero.";
    }
    if (trimmedDescription.length < 20) {
      nextErrors.description = "Please provide at least 20 characters about your requirements.";
    } else if (trimmedDescription.length > 1000) {
      nextErrors.description = "Keep your requirements under 1000 characters.";
    }

    return nextErrors;
  }

  function buildWhatsAppMessage() {
    return [
      "Hello Communicare, I would like to request a quote.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : "",
      form.company.trim() ? `Company: ${form.company.trim()}` : "",
      `Product type: ${form.productType}`,
      `Quantity: ${form.quantity}`,
      `Description/requirements: ${form.description.trim()}`,
      form.timeline.trim() ? `Preferred timeline: ${form.timeline.trim()}` : "",
      form.finish.trim() ? `Finish, paper, and other info: ${form.finish.trim()}` : "",
    ].filter(Boolean).join("\n");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    const whatsappNumber = CONTACT_DETAILS.whatsappLink.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

    window.setTimeout(() => {
      const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus(whatsappWindow ? "success" : "error");
    }, 250);
  }

  return (
    <main
      style={{
        background:
          "linear-gradient(180deg, #1f2430 15%, #456882 75%, #DDDDDD 100%)",
        minHeight: "100%",
      }}
    >
      <SEO
        title="Request a Printing Quote | Communicare"
        description="Tell Communicare what you need printed and request a clear, no-obligation quote for your project."
        path="/quote"
      />
      <section
        className="bg-brand-navy px-4 py-12 text-white sm:px-6 sm:py-20"
        style={{
          background:
            "linear-gradient(180deg, #1f2430 15%, #456882 75%, #DDDDDD 100%)",
          minHeight: "100%",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-surface sm:text-base sm:tracking-[0.2em]">
                Get a quote</p>
            <h1 className="mt-3 text-2xl font-bold text-slate-300 sm:text-5xl">
                Tell us what you need printed.</h1>
            <p className="mt-4 text-sm leading-6 text-slate-200 sm:mt-5 sm:text-lg sm:leading-8">
                Every project is different. Tell us what you need and we'll get back to you with a clear, no-obligation quote.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-4 rounded-2xl border border-white/10 bg-brand-surface p-4 text-brand-text shadow-2xl sm:mt-10 sm:gap-6 sm:p-8 lg:grid-cols-2">
            <FormField label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} required autoComplete="name" />
            <FormField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} required placeholder="03XXxxxxxxxx" inputMode="tel" autoComplete="tel" maxLength={11} />
            <FormField label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} type="email" autoComplete="email" />
            <FormField label="Company" name="company" value={form.company} onChange={handleChange} autoComplete="organization" />

            <div>
              <label htmlFor="productType" className="mb-1.5 block text-base font-semibold text-brand-text sm:mb-2 sm:text-lg">Product type <span className="text-brand-primary">*</span></label>
              <select id="productType" name="productType" value={form.productType} onChange={handleChange} required aria-invalid={Boolean(errors.productType)} aria-describedby={errors.productType ? "productType-error" : undefined} className={fieldClass(errors.productType)}>
                <option value="">Select a product</option>
                {PRODUCT_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <FieldError id="productType-error" message={errors.productType} />
            </div>

            <FormField label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} error={errors.quantity} required type="number" min="1" step="1" inputMode="numeric" />

            <div className="lg:col-span-2">
              <label htmlFor="description" className="mb-1.5 block text-base font-semibold text-brand-text sm:mb-2 sm:text-lg">Description / Requirements <span className="text-brand-primary">*</span></label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="I want visiting cards with 3 colors on it, with the following details..." required minLength={20} maxLength={1000} rows={5} aria-invalid={Boolean(errors.description)} aria-describedby="description-help description-error" className={fieldClass(errors.description)} />
              <div className="mt-2 flex justify-between gap-4 text-xs text-brand-muted"><span>{form.description.length}/1000</span></div>
              <FieldError id="description-error" message={errors.description} />
            </div>

            <FormField label="Preferred timeline" name="timeline" value={form.timeline} onChange={handleChange} placeholder="For example: Needed in 5 days" />
            <FormField label="Finish, paper, and other info" name="finish" value={form.finish} onChange={handleChange} placeholder="For example: matte finish, 300gsm card, lamination" />

            <div className="lg:col-span-2">
              {status === "success" && <output className="mb-4 block rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-3 text-sm text-emerald-700">Your quote request is ready. Please send the prefilled message to complete your request.</output>}
              {status === "error" && <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-700"><span>Failed to open WhatsApp. Please try again or contact us directly at +92 321 8446614.</span><button type="button" onClick={() => setStatus("idle")} className="font-semibold underline transition hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary">Try again</button></div>}
              <button type="submit" disabled={status === "submitting"} className="w-full rounded-lg bg-brand-primary px-5 py-3 font-semibold text-white transition hover:bg-brand-navy hover:text-brand-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary disabled:cursor-wait disabled:opacity-70 sm:w-auto">{status === "submitting" ? "Submitting..." : "Send quote request"}</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function FormField({ label, name, value, onChange, error, required = false, type = "text", ...props }) {
  const errorId = `${name}-error`;
  return <div><label htmlFor={name} className="mb-1.5 block text-base font-semibold text-brand-text sm:mb-2 sm:text-lg">{label} {required && <span className="text-brand-primary">*</span>}</label><input id={name} name={name} type={type} value={value} onChange={onChange} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={fieldClass(error)} {...props} /><FieldError id={errorId} message={error} /></div>;
}

function FieldError({ id, message }) {
  return message ? <p id={id} className="mt-2 text-sm font-medium text-red-700 sm:text-lg" role="alert">{message}</p> : null;
}

function fieldClass(error) {
  return `w-full rounded-lg border bg-brand-background px-3 py-2.5 text-sm text-brand-text outline-none transition placeholder:text-brand-muted focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/40 sm:py-3 sm:text-base ${error ? "border-red-500" : "border-brand-border"}`;
}

export default Quote;
