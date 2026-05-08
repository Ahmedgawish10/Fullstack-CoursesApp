"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import "../contact/contact.css";

const EMAILJS_SERVICE_ID = "service_2nyjtqx";
const EMAILJS_TEMPLATE_ID = "template_3vyedct";
const EMAILJS_PUBLIC_KEY = "BCHWeb1hlnZu1FDFl";

const optionalPortfolioUrl = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true;
      try {
        new URL(val.startsWith("http") ? val : `https://${val}`);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Enter a valid URL (optional)" }
  );

const instructorSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Email is invalid"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[+]?[\d\s()-]{7,20}$/, "Please enter a valid phone number"),
  expertise: z.string().trim().min(1, "Please describe your teaching focus or stack"),
  coursesOffered: z
    .string()
    .trim()
    .min(1, "List or describe the courses you want to offer")
    .min(30, "Please add a bit more detail (at least a few sentences)"),
  credentials: z.string(),
  portfolioUrl: optionalPortfolioUrl,
});

function buildMessage(data) {
  const credentials = data.credentials?.trim() ?? "";
  const portfolioUrl = data.portfolioUrl?.trim() ?? "";
  return [
    "— Instructor application —",
    "",
    `Teaching focus / tech: ${data.expertise}`,
    "",
    "Courses they want to teach (or list):",
    data.coursesOffered,
    "",
    credentials ? `Background & credentials:\n${credentials}\n` : "",
    portfolioUrl ? `Portfolio / link: ${portfolioUrl}\n` : "",
    "",
    "After approval, they can apply their courses on the platform per your process.",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function BecomeInstructorPage() {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      expertise: "",
      coursesOffered: "",
      credentials: "",
      portfolioUrl: "",
    },
  });

  useEffect(() => {
    if (pathname === "/become-instructor") {
      document.body.classList.add("contact-page");
    } else {
      document.body.classList.remove("contact-page");
    }
    return () => document.body.classList.remove("contact-page");
  }, [pathname]);

  const onSubmit = async (data) => {
    toast.loading("Sending your application…", { duration: 2000 });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: "Ahmed Gawish",
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: buildMessage(data),
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success(
        "Application sent. We will review it and email you. Once approved, you can submit your courses for listing.",
        { className: "custom-class-toast", duration: 6000 }
      );
      reset();
    } catch {
      toast.error("Could not send right now. Please try again or use Contact Us.");
    }
  };

  return (
    <section className="contact-page-wrapper">
      <div className="contact-shell">
        <div className="contact-header">
          <span className="text-[#263c8c] text-2xl font-bold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">Become an instructor</span>
          <p className="contact-subtitle text-xl">
          Join us as an instructor—we’re excited to have you!
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-info-card">
            <p className="contact-info-eyebrow">How it works</p>
            <h3>From application to live courses</h3>
            <p className="contact-info-description">
              We review every instructor to keep quality high. There is no fee to apply.
            </p>

            <div className="contact-benefits">
              <div className="contact-benefit-item">
                <span className="contact-benefit-icon" aria-hidden="true">
                  📝
                </span>
                <div>
                  <h4>1. Apply</h4>
                  <p>Submit this form with your background and the topics or course titles you plan to teach.</p>
                </div>
              </div>

              <div className="contact-benefit-item">
                <span className="contact-benefit-icon" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h4>2. Review</h4>
                  <p>Our team checks your experience and proposed curriculum. We will reply by email.</p>
                </div>
              </div>

              <div className="contact-benefit-item">
                <span className="contact-benefit-icon" aria-hidden="true">
                  🚀
                </span>
                <div>
                  <h4>3. Publish</h4>
                  <p>Once approved, you get access to submit or list your courses so learners can enroll.</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="contact-form-card">
            <form
              onSubmit={handleSubmit(onSubmit, () =>
                toast.error("Please fix the highlighted fields")
              )}
              noValidate
            >
              <div className="contact-field contact-field-wide">
                <label htmlFor="inst-name">Full name</label>
                <input
                  id="inst-name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  {...register("name")}
                />
                {errors.name && <p className="contact-error">{errors.name.message}</p>}
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="inst-email">Email</label>
                  <input
                    id="inst-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && <p className="contact-error">{errors.email.message}</p>}
                </div>
                <div className="contact-field">
                  <label htmlFor="inst-phone">Phone</label>
                  <input
                    id="inst-phone"
                    type="tel"
                    placeholder="+20 10 0000 0000"
                    autoComplete="tel"
                    {...register("phone")}
                  />
                  {errors.phone && <p className="contact-error">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="contact-field contact-field-wide">
                <label htmlFor="inst-expertise">What you teach (subjects, stack, or role)</label>
                <input
                  id="inst-expertise"
                  type="text"
                  placeholder="e.g. React & Node, data analysis with Python, UI/UX fundamentals"
                  {...register("expertise")}
                />
                {errors.expertise && <p className="contact-error">{errors.expertise.message}</p>}
              </div>

              <div className="contact-field contact-field-wide">
                <label htmlFor="inst-courses">Courses you want to offer</label>
                <textarea
                  id="inst-courses"
                  rows={6}
                  placeholder="List working titles, level (beginner/advanced), and a one-line outline for each course you plan to publish after approval."
                  {...register("coursesOffered")}
                />
                {errors.coursesOffered && (
                  <p className="contact-error">{errors.coursesOffered.message}</p>
                )}
              </div>

              <div className="contact-field contact-field-wide">
                <label htmlFor="inst-credentials">Background & credentials (optional)</label>
                <textarea
                  id="inst-credentials"
                  rows={4}
                  placeholder="Degrees, certifications, years of experience, notable projects…"
                  {...register("credentials")}
                />
              </div>

              <div className="contact-field contact-field-wide">
                <label htmlFor="inst-portfolio">Portfolio or LinkedIn (optional)</label>
                <input
                  id="inst-portfolio"
                  type="text"
                  placeholder="https://…"
                  {...register("portfolioUrl")}
                />
                {errors.portfolioUrl && (
                  <p className="contact-error">{errors.portfolioUrl.message}</p>
                )}
              </div>

              <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Submit instructor application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
