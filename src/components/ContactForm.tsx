import React, { useState, useRef } from 'react';
import { ContactFormData, FormErrors } from '../types/portfolio';
import { Send, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface ContactFormProps {
  announceMessage: (msg: string) => void;
  isInspectSemantics: boolean;
}

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  email: '',
  organization: '',
  inquiryType: 'audit',
  wcagTarget: 'wcag22-aaa',
  budgetTimeline: '1-3 months',
  message: '',
  consent: false,
};

export const ContactForm: React.FC<ContactFormProps> = ({
  announceMessage,
  isInspectSemantics
}) => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Error summary container ref for programmatic focus shift
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successBannerRef = useRef<HTMLDivElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g., name@domain.com).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project message or audit scope is required.';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide at least 20 characters describing your inquiry.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must confirm consent to process your contact inquiry.';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      announceMessage(
        `Form submission failed with ${Object.keys(validationErrors).length} errors. Please fix highlighted fields.`
      );
      // Accessibility best practice: focus the error summary so screen reader announces it immediately
      setTimeout(() => {
        if (errorSummaryRef.current) {
          errorSummaryRef.current.focus();
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulated network submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      announceMessage(
        'Thank you! Your inquiry has been sent successfully. Elena will respond within 1 business day.'
      );
      setTimeout(() => {
        if (successBannerRef.current) {
          successBannerRef.current.focus();
        }
      }, 50);
    }, 600);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsSubmitted(false);
    announceMessage('Form has been reset. You may enter a new inquiry.');
    setTimeout(() => {
      if (fullNameInputRef.current) {
        fullNameInputRef.current.focus();
      }
    }, 50);
  };

  const errorKeys = Object.keys(errors) as (keyof FormErrors)[];

  return (
    <div className="w-full">
      {isInspectSemantics && (
        <div
          className="mb-3 px-3 py-1 bg-amber-950 text-amber-200 border border-amber-600 rounded text-xs font-mono"
          aria-hidden="true"
        >
          &lt;form aria-labelledby="contact-form-heading" role="form"&gt; with WCAG error summary &amp; explicit labels
        </div>
      )}

      {/* Success Notification State */}
      {isSubmitted ? (
        <div
          ref={successBannerRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-600 rounded-xl flex flex-col gap-4 text-emerald-950 dark:text-emerald-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                Inquiry Received Successfully
              </h2>
              <p className="text-sm mt-1 text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Thank you, <strong className="font-semibold">{formData.fullName}</strong>. Elena will review your project specification ({formData.inquiryType.toUpperCase()}, target: {formData.wcagTarget.toUpperCase()}) and respond to <strong className="font-semibold">{formData.email}</strong> within 24 business hours.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <span className="text-xs text-emerald-700 dark:text-emerald-400">
              Reference ID: A11Y-{Math.floor(100000 + Math.random() * 900000)}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-medium focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form
          aria-labelledby="contact-form-heading"
          noValidate
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          {/* Error Summary Alert (WCAG 3.3.1 & 3.3.3) */}
          {errorKeys.length > 0 && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              aria-labelledby="error-summary-title"
              className="p-4 bg-rose-50 dark:bg-rose-950/70 border-l-4 border-rose-600 rounded-r-lg text-rose-950 dark:text-rose-100 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                <h3 id="error-summary-title" className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  There are {errorKeys.length} errors that require your attention:
                </h3>
              </div>
              <ul className="mt-2.5 space-y-1 text-xs list-disc pl-6 text-rose-800 dark:text-rose-300">
                {errorKeys.map((key) => (
                  <li key={key}>
                    <a
                      href={`#field-${key}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(`field-${key}`);
                        if (element) {
                          element.focus();
                        }
                      }}
                      className="underline font-medium hover:text-rose-950 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden rounded-xs"
                    >
                      {errors[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Form instructions */}
          <p id="form-general-instructions" className="text-xs text-slate-500 dark:text-slate-400">
            Fields marked with an asterisk (<span aria-hidden="true" className="text-rose-600 font-bold">*</span>) are mandatory. Keyboard navigation is enabled for all controls via <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-[11px] font-mono">Tab</kbd> and <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-[11px] font-mono">Shift+Tab</kbd>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="field-fullName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Full Name <span aria-hidden="true" className="text-rose-600 font-bold">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={fullNameInputRef}
                id="field-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={`hint-fullName ${errors.fullName ? 'error-fullName' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g., Marcus Vance"
                className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/80 border transition-colors ${
                  errors.fullName
                    ? 'border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500'
                    : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500'
                } focus-visible:outline-hidden`}
              />
              <p id="hint-fullName" className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Enter your preferred personal or business name.
              </p>
              {errors.fullName && (
                <p id="error-fullName" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="field-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Work Email <span aria-hidden="true" className="text-rose-600 font-bold">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                id="field-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={`hint-email ${errors.email ? 'error-email' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="name@organization.org"
                className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/80 border transition-colors ${
                  errors.email
                    ? 'border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500'
                    : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500'
                } focus-visible:outline-hidden`}
              />
              <p id="hint-email" className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                We respect your privacy; no marketing spam will ever be sent.
              </p>
              {errors.email && (
                <p id="error-email" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Organization / Company */}
            <div>
              <label
                htmlFor="field-organization"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Organization / Company <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="field-organization"
                name="organization"
                type="text"
                autoComplete="organization"
                aria-describedby="hint-organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g., Civic Health Labs"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus-visible:outline-hidden transition-colors"
              />
              <p id="hint-organization" className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Your institution, agency, or open-source collective.
              </p>
            </div>

            {/* Inquiry Type (Select Dropdown) */}
            <div>
              <label
                htmlFor="field-inquiryType"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Inquiry Focus <span aria-hidden="true" className="text-rose-600 font-bold">*</span>
              </label>
              <select
                id="field-inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                aria-describedby="hint-inquiryType"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus-visible:outline-hidden transition-colors"
              >
                <option value="audit">Accessibility Audit &amp; VPAT / ACR Report</option>
                <option value="design-system">Headless Design System Architecture</option>
                <option value="consulting">Enterprise WCAG 2.2 AAA Engineering Retainer</option>
                <option value="speaking">Keynote / Technical Workshop Training</option>
                <option value="other">General Engineering Collaboration</option>
              </select>
              <p id="hint-inquiryType" className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Select the primary scope for our initial technical review.
              </p>
            </div>
          </div>

          {/* Fieldset 1: Compliance Standard Target (Radio Group) */}
          <fieldset className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Target Compliance Benchmark <span className="text-slate-400 font-normal">(Select One)</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <input
                  type="radio"
                  name="wcagTarget"
                  value="wcag22-aaa"
                  checked={formData.wcagTarget === 'wcag22-aaa'}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 focus-visible:ring-2"
                />
                <span>
                  <strong className="block font-medium">WCAG 2.2 Level AAA</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Enhanced 7:1 contrast &amp; no timeouts</span>
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <input
                  type="radio"
                  name="wcagTarget"
                  value="wcag22-aa"
                  checked={formData.wcagTarget === 'wcag22-aa'}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 focus-visible:ring-2"
                />
                <span>
                  <strong className="block font-medium">WCAG 2.2 Level AA</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Standard enterprise compliance</span>
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <input
                  type="radio"
                  name="wcagTarget"
                  value="section-508"
                  checked={formData.wcagTarget === 'section-508'}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 focus-visible:ring-2"
                />
                <span>
                  <strong className="block font-medium">Section 508 / EN 301 549</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">US &amp; EU government mandates</span>
                </span>
              </label>
            </div>
          </fieldset>

          {/* Project Details Message */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="field-message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Project Scope &amp; Details <span aria-hidden="true" className="text-rose-600 font-bold">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <span
                id="message-char-count"
                className="text-[11px] font-mono text-slate-500 dark:text-slate-400"
                aria-live="polite"
              >
                {formData.message.length} characters (min 20)
              </span>
            </div>
            <textarea
              id="field-message"
              name="message"
              rows={4}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={`hint-message message-char-count ${errors.message ? 'error-message' : ''}`}
              value={formData.message}
              onChange={handleChange}
              placeholder="Outline your tech stack, number of views/components to audit, target timeline, or specific assistive technology concerns..."
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/80 border transition-colors ${
                errors.message
                  ? 'border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500'
              } focus-visible:outline-hidden`}
            />
            <p id="hint-message" className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Please include any existing assistive tech feedback (e.g. JAWS, NVDA, VoiceOver bugs).
            </p>
            {errors.message && (
              <p id="error-message" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox (WCAG Explicit Action) */}
          <div>
            <div className="flex items-start gap-3">
              <input
                id="field-consent"
                name="consent"
                type="checkbox"
                required
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'error-consent' : 'hint-consent'}
                checked={formData.consent}
                onChange={handleChange}
                className={`mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 focus-visible:ring-2 ${
                  errors.consent ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-slate-600'
                }`}
              />
              <label
                htmlFor="field-consent"
                className="text-xs text-slate-700 dark:text-slate-300 leading-normal cursor-pointer"
              >
                I acknowledge that this form submits project specifications directly to Elena Rostova's encrypted engineering queue under strict NDA confidentiality standards.
                <span aria-hidden="true" className="text-rose-600 font-bold ml-1">*</span>
                <span className="sr-only">(required)</span>
              </label>
            </div>
            {errors.consent && (
              <p id="error-consent" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1.5 pl-7" role="alert">
                {errors.consent}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Guaranteed SLA: Response within 24 business hours.
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:outline-hidden"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? (
                  <span>Encrypting &amp; Submitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Submit Accessible Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
