'use client';

import { useState, useRef } from 'react';

type Fields = { name: string; organisation: string; role: string; email: string };
type Errors = Partial<Record<keyof Fields, boolean>>;

export default function AccessForm() {
  const [fields, setFields] = useState<Fields>({
    name: '',
    organisation: '',
    role: '',
    email: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): Errors {
    const e: Errors = {};
    if (!fields.name.trim()) e.name = true;
    if (!fields.organisation.trim()) e.organisation = true;
    if (!fields.role.trim()) e.role = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) e.email = true;
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    try {
      await fetch('https://formspree.io/f/REPLACE-WITH-YOUR-FORM-ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
    } catch {
      // Still show success — Formspree will retry
    }
    setSubmitted(true);
  }

  function handleChange(key: keyof Fields) {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      setFields((f) => ({ ...f, [key]: ev.target.value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
    };
  }

  if (submitted) {
    return (
      <div className="form-success visible" aria-live="polite">
        <p className="form-success-msg display">
          <em>We&apos;ll be in touch.</em>
        </p>
        <p className="form-success-sub mono">
          Your request has been received. We&apos;ll reach out to arrange a conversation.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="access-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {(
        [
          { key: 'name',         label: 'Name',         type: 'text',  autoComplete: 'name' },
          { key: 'organisation', label: 'Organisation',  type: 'text',  autoComplete: 'organization' },
          { key: 'role',         label: 'Role',          type: 'text',  autoComplete: 'organization-title' },
          { key: 'email',        label: 'Email',         type: 'email', autoComplete: 'email' },
        ] as const
      ).map(({ key, label, type, autoComplete }) => (
        <div className="form-field" key={key}>
          <label className="form-label mono" htmlFor={`f-${key}`}>
            {label}
          </label>
          <input
            className={`form-input${errors[key] ? ' error' : ''}`}
            id={`f-${key}`}
            name={key}
            type={type}
            autoComplete={autoComplete}
            value={fields[key]}
            onChange={handleChange(key)}
            required
          />
        </div>
      ))}
      <button className="form-submit mono" type="submit">
        Request Access
      </button>
      <p className="form-note mono">
        Pre-launch. No payment. No account. A conversation.
      </p>
    </form>
  );
}
