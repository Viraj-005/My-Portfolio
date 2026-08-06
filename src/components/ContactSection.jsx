import { useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, ArrowUpRight, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { useReveal, stagger } from '@/hooks/use-reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { WHATSAPP_ICON, WHATSAPP_URL } from '@/lib/brand-icons';

const WhatsAppGlyph = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    focusable="false"
    fill={WHATSAPP_ICON.color}
    className={className}
  >
    <path d={WHATSAPP_ICON.path} />
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    label: 'email',
    value: 'virajinduruwa123@gmail.com',
    href: 'mailto:virajinduruwa123@gmail.com',
  },
  {
    // Same number as the phone line, but a different intent: message rather
    // than call. Worth its own row so nobody has to guess whether it is on
    // WhatsApp.
    icon: WhatsAppGlyph,
    label: 'whatsapp',
    value: '+94 75 541 5575',
    href: WHATSAPP_URL,
    brandIcon: true,
  },
  {
    icon: Phone,
    label: 'phone',
    value: '+94 75 541 5575',
    href: 'tel:+94755415575',
  },
  {
    icon: MapPin,
    label: 'location',
    value: 'Sri Lanka',
    href: 'https://maps.app.goo.gl/VyLz6RkyuPLX7baS7',
  },
];

const validators = {
  name: (value) => (value.trim().length < 2 ? 'Please enter your name.' : ''),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ''
      : 'Enter a valid email address so I can reply.',
  message: (value) =>
    value.trim().length < 10
      ? 'Tell me a little more, at least 10 characters.'
      : '',
};

export const ContactSection = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef(null);
  const revealRef = useReveal();

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Only re-validate live once the field is already flagged, so an error
    // clears as you fix it but never appears mid-keystroke.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](values[field]) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      Object.entries(validators).map(([field, validate]) => [
        field,
        validate(values[field]),
      ])
    );
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    // Move focus to the first problem rather than leaving the user to hunt.
    const firstInvalid = Object.keys(nextErrors).find((key) => nextErrors[key]);
    if (firstInvalid) {
      const fieldNames = { name: 'user_name', email: 'from_email', message: 'message' };
      formRef.current?.elements[fieldNames[firstInvalid]]?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setValues({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});

      toast({
        title: 'Message sent',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Couldn't send your message",
        description:
          'Something went wrong on the way out. Try again, or email me directly at virajinduruwa123@gmail.com.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (field) => (touched[field] ? errors[field] : '');

  return (
    <section id="contact" ref={revealRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          title="Get in touch"
          lead="Open to freelance work, interesting problems, and conversations about building systems."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* ── Form ────────────────────────────────────────────── */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            data-reveal
            className="panel p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  name="user_name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={setField('name')}
                  onBlur={handleBlur('name')}
                  aria-invalid={Boolean(fieldError('name'))}
                  aria-describedby={fieldError('name') ? 'name-error' : undefined}
                  className="field"
                  placeholder="Your name"
                />
                {fieldError('name') && (
                  <p
                    id="name-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-primary"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {fieldError('name')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  name="from_email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={setField('email')}
                  onBlur={handleBlur('email')}
                  aria-invalid={Boolean(fieldError('email'))}
                  aria-describedby={fieldError('email') ? 'email-error' : undefined}
                  className="field"
                  placeholder="you@example.com"
                />
                {fieldError('email') && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-primary"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {fieldError('email')}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={values.message}
                onChange={setField('message')}
                onBlur={handleBlur('message')}
                aria-invalid={Boolean(fieldError('message'))}
                aria-describedby={
                  fieldError('message') ? 'message-error' : 'message-hint'
                }
                className="field resize-y"
                placeholder="What are you working on?"
              />
              {fieldError('message') ? (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-primary"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {fieldError('message')}
                </p>
              ) : (
                <p id="message-hint" className="mt-1.5 text-xs text-subtle">
                  A sentence or two about the project is plenty to start.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mt-6 w-full"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                  />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>
          </form>

          {/* ── Direct contact ──────────────────────────────────── */}
          <div>
            <p data-reveal className="prose-body">
              I'm always interested in hearing about new opportunities and
              interesting projects. The form works, but a direct email is just as
              good.
            </p>

            <ul className="mt-8 space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const isExternal = info.href.startsWith('http');

                return (
                  <li key={info.label} data-reveal style={stagger(index + 1)}>
                    <a
                      href={info.href}
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="panel-interactive group flex items-center gap-4 px-4 py-3.5"
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          info.brandIcon ? '' : 'text-primary'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="label-mono block">{info.label}</span>
                        <span className="block truncate text-sm font-medium">
                          {info.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-subtle transition-transform duration-[--duration-base] ease-[--ease-out-expo] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div data-reveal style={stagger(4)} className="panel mt-6 p-5">
              <p className="flex items-center gap-2 text-sm font-medium">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Currently available
              </p>
              <p className="prose-body mt-2 text-sm">
                Taking on freelance backend, automation, and ML work alongside my
                role at Sri Lanka Telecom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
