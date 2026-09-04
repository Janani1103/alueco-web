"use client";

import { useState, type FormEvent } from "react";
import { productCategories } from "@/data/products";
import { useSiteData } from "@/context/SiteDataContext";

interface QuoteFormProps {
  id?: string;
  showEmail?: boolean;
  submitLabel?: string;
}

function FloatingField({
  id,
  name,
  label,
  type = "text",
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(!!e.target.value);
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className="peer w-full rounded-lg border border-border bg-surface px-4 pb-2.5 pt-5 text-sm text-text transition-all focus:border-brand"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          focused || hasValue
            ? "top-2 text-[10px] font-semibold uppercase tracking-wider text-brand"
            : "top-3.5 text-sm text-muted"
        }`}
      >
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingSelect({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(!!e.target.value);
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className="peer w-full appearance-none rounded-lg border border-border bg-surface px-4 pb-2.5 pt-5 text-sm text-text transition-all focus:border-brand"
        defaultValue=""
      >
        <option value="" disabled />
        {productCategories.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.name}
          </option>
        ))}
        <option value="custom">Custom Project</option>
      </select>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          focused || hasValue
            ? "top-2 text-[10px] font-semibold uppercase tracking-wider text-brand"
            : "top-3.5 text-sm text-muted"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(!!e.target.value);
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className="peer w-full resize-none rounded-lg border border-border bg-surface px-4 pb-2.5 pt-5 text-sm text-text transition-all focus:border-brand"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          focused || hasValue
            ? "top-2 text-[10px] font-semibold uppercase tracking-wider text-brand"
            : "top-3.5 text-sm text-muted"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function QuoteForm({
  id = "quote",
  showEmail = false,
  submitLabel = "Send Inquiry",
}: QuoteFormProps) {
  const { submitInquiry } = useSiteData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const next: Record<string, string> = {};
    if (!form.get("name")?.toString().trim()) next.name = "Name is required";
    if (!form.get("phone")?.toString().trim()) next.phone = "Phone is required";
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const name = form.get("name")?.toString().trim() || "";
    const phone = form.get("phone")?.toString().trim() || "";
    const email = form.get("email")?.toString().trim() || "";
    const location = form.get("location")?.toString().trim() || "";
    const product = form.get("product")?.toString().trim() || "";
    const message = form.get("message")?.toString().trim() || "";

    try {
      await submitInquiry({
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        location: location,
        productName: product || "Aluminium System",
        vehicleName: product || "Aluminium System",
        systemNeeded: product || "General Fabrication Inquiry",
        notes: message,
        type: "quotation",
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-brand/30 bg-surface p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-heading">Thank you!</h3>
        <p className="mt-2 text-sm text-muted">
          Your inquiry has been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FloatingField
        id={`${id}-name`}
        name="name"
        label="Name"
        required
        error={errors.name}
      />
      <FloatingField
        id={`${id}-phone`}
        name="phone"
        label="Phone"
        type="tel"
        required
        error={errors.phone}
      />
      {showEmail && (
        <FloatingField id={`${id}-email`} name="email" label="Email" type="email" />
      )}
      <FloatingField id={`${id}-location`} name="location" label="Location" />
      <FloatingSelect id={`${id}-product`} name="product" label="Product Type" />
      <FloatingTextarea id={`${id}-message`} name="message" label="Project Message" />

      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-[9px] bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#6aaa00] disabled:opacity-70"
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            {submitLabel}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </>
        )}
      </button>
    </form>
  );
}
