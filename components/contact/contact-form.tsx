"use client";

import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";

export function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      brief: formData.get('brief'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      // Form'u temizle - formRef kullanarak
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // 5 saniye sonra success mesajını kaldır
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionTransition delay={0.2}>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 md:p-10 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-8">
            {t.contact.form.title}
          </h2>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-800 dark:text-green-200">
                {t.contact.form.successMessage}
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-200">
                {errorMessage || t.contact.form.errorMessage}
              </p>
            </div>
          )}

          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                  htmlFor="name"
                >
                  {t.contact.form.name}
                </label>
                <input
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors placeholder-gray-400/50"
                  id="name"
                  name="name"
                  placeholder={t.contact.form.namePlaceholder}
                  type="text"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                  htmlFor="email"
                >
                  {t.contact.form.email}
                </label>
                <input
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors placeholder-gray-400/50 disabled:opacity-50"
                  id="email"
                  name="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  type="email"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                htmlFor="company"
              >
                {t.contact.form.company}
              </label>
              <input
                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors placeholder-gray-400/50 disabled:opacity-50"
                id="company"
                name="company"
                placeholder={t.contact.form.companyPlaceholder}
                type="text"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                htmlFor="brief"
              >
                {t.contact.form.projectBrief}
              </label>
              <textarea
                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors resize-none placeholder-gray-400/50 disabled:opacity-50"
                id="brief"
                name="brief"
                placeholder={t.contact.form.briefPlaceholder}
                rows={4}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="pt-4">
              <button
                className="w-full bg-primary dark:bg-white text-white dark:text-primary font-display font-bold tracking-widest text-sm uppercase py-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-gray-200/50 dark:shadow-none flex items-center justify-center gap-2 group-hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.contact.form.sending : t.contact.form.sendInquiry}{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionTransition>
  );
}
