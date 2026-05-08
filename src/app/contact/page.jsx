"use client";
import React from 'react';
import "./contact.css";
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname == "/contact") {
      document.body.classList.add("contact-page");
    } else {
      document.body.classList.remove("contact-page");
    }

    return () => {
      document.body.classList.remove("contact-page");
    };
  }, [pathname]);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', msg: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.msg) newErrors.msg = 'Message is required';
    else if (formData.msg.length < 20) newErrors.msg = 'Could you please provide more details?';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email is invalid';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      toast.loading('Please wait, we are sending your message', {
        duration: 2000,
      });

      try {
        await emailjs.send('service_2nyjtqx', 'template_3vyedct', {
          to_name: "Ahmed Gawish",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.msg
        }, 'BCHWeb1hlnZu1FDFl');

        toast.success('Your message was sent successfully, we will contact you soon!', {
          className: "custom-class-toast",
          duration: 5000,
        });
        setFormData({ name: '', email: '', phone: '', msg: '' });
        setErrors({});
      } catch (error) {
        toast.error('Error sending email');
      }
    } else {
      setErrors(newErrors);
      toast.error('Please fill all required fields correctly');
    }
  };

  return (
    <section className="contact-page-wrapper">
      <div className="contact-shell">
        <div className="contact-header">
          <span className="text-[#263c8c] text-2xl font-bold">Contact Us </span>
          <p className="contact-subtitle text-xl">
            Share your questions — we’ll reply quickly.
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-info-card">
            <p className="contact-info-eyebrow">Support Team</p>
            <h3>Why contact us?</h3>
            <p className="contact-info-description">
              We make sure every learner gets clear answers and fast guidance.
            </p>

            <div className="contact-benefits">
              <div className="contact-benefit-item">
                <span className="contact-benefit-icon" aria-hidden="true">🎯</span>
                <div>
                  <h4>Smart Course Recommendations</h4>
                  <p>Get course suggestions based on your level and career goals.</p>
                </div>
              </div>

              <div className="contact-benefit-item">
                <span className="contact-benefit-icon" aria-hidden="true">💳</span>
                <div>
                  <h4>Pricing & Enrollment Help</h4>
                  <p>Ask about plans, payment options, and enrollment details.</p>
                </div>
              </div>

              <div className="contact-benefit-item">
                <span className="contact-benefit-icon" aria-hidden="true">⚡</span>
                <div>
                  <h4>Fast Technical Support</h4>
                  <p>Report issues quickly and get practical help from our team.</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="contact-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-field contact-field-wide">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
                {errors.name && <p className="contact-error">{errors.name}</p>}
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && <p className="contact-error">{errors.email}</p>}
                </div>

                <div className="contact-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 10 0000 0000"
                    required
                  />
                  {errors.phone && <p className="contact-error">{errors.phone}</p>}
                </div>
              </div>

              <div className="contact-field contact-field-wide">
                <label htmlFor="msg">Message</label>
                <textarea
                  id="msg"
                  name="msg"
                  rows="5"
                  value={formData.msg}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                />
                {errors.msg && <p className="contact-error">{errors.msg}</p>}
              </div>

              <button type="submit" className="contact-submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
