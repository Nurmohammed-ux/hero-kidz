"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaComments,
  FaShieldAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const FAQS = [
  {
    q: "How fast is shipping for Hero Kidz orders?",
    a: "We deliver within 24–48 hours inside Dhaka city. For locations outside Dhaka, delivery typically takes 2–4 business days.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes! We offer a 7-day hassle-free return and exchange policy for undamaged items in their original packaging.",
  },
  {
    q: "Are all toys safe and certified for kids?",
    a: "100% yes. All Hero Kidz products undergo non-toxic safety checks and comply with international child safety standards.",
  },
  {
    q: "What payment methods do you support?",
    a: "We accept Cash on Delivery (COD), bKash, Nagad, Visa, and Mastercard.",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Order Inquiry",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill out all required fields before sending.",
        confirmButtonColor: "#F28C38",
      });
      return;
    }

    try {
      setSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        icon: "success",
        title: "Message Sent! 🚀",
        text: "Thank you for reaching out! Our Hero Kidz support team will reply within 24 hours.",
        confirmButtonColor: "#F28C38",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "Order Inquiry",
        message: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try contacting us directly via email or phone.",
        confirmButtonColor: "#F28C38",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen text-[#3C352D] font-sans pb-16">
      {/* HEADER SECTION */}
      <header className="border-b border-[#EAE3D2] pt-10 pb-14 px-8 text-center">
        <div className="">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-4 border border-[#F28C38]/20">
            <FaComments className="h-3.5 w-3.5" /> We&apos;re Here to Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3C352D]">
            Get in Touch with <span className="text-primary">Hero Kidz</span>
          </h1>
          <p className="mt-3 text-base text-[#776B5D] leading-relaxed">
            Have questions about an order, STEM toy recommendation, or partnership? Send us a message and our team will get back to you swiftly!
          </p>
        </div>
      </header>

      {/* QUICK CARDS */}
      <section className="px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EFE8DC] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaPhone />
            </div>
            <div>
              <p className="text-sm text-[#776B5D] font-bold uppercase">Customer Support</p>
              <p className="text-sm font-bold text-[#3C352D]">+880 1700 000 000</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EFE8DC] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-sm text-[#776B5D] font-bold uppercase">Email Support</p>
              <p className="text-sm font-bold text-[#3C352D]">support@herokidz.com</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EFE8DC] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-sm text-[#776B5D] font-bold uppercase">Main Hub</p>
              <p className="text-sm font-bold text-[#3C352D]">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EFE8DC] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-[#776B5D] font-bold uppercase">Working Hours</p>
              <p className="text-sm font-bold text-[#3C352D]">9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM & INFO SECTION */}
      <main className="px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CONTACT FORM */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#EFE8DC]">
            <h2 className="text-2xl font-bold text-[#3C352D] mb-2">Send Us a Message</h2>
            <p className="text-sm text-[#776B5D] mb-6">
              Fill out the form below and our customer service heroes will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Rahman"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="maya@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                    Topic
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm bg-white"
                  >
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Question">Product / Toy Question</option>
                    <option value="Return & Refund">Return & Refund</option>
                    <option value="Partnership">Partnership / Wholesale</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#776B5D] uppercase mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help your little hero today?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F28C38] text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-[#d97525] text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SIDEBAR: FAQ ACCORDION */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#EFE8DC]">
              <div className="flex items-center gap-2 text-primary font-bold text-lg mb-4">
                <FaQuestionCircle />
                <h3 className="text-[#3C352D]">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left font-bold text-sm sm:text-sm text-[#3C352D] bg-[#FAF8F5] hover:bg-[#F5EFE6] transition flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      {openFaq === index ? (
                        <FaChevronUp className="h-3 w-3 text-primary shrink-0" />
                      ) : (
                        <FaChevronDown className="h-3 w-3 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="p-4 bg-white text-sm text-[#776B5D] leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TRUST BADGE BOX */}
            <div className="bg-linear-to-r from-[#3C352D] to-[#2B251F] text-white p-6 rounded-3xl shadow-md flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Hero Guarantee</h4>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                  Every order is backed by our 100% genuine quality check and fast replacement policy for maximum parent peace of mind.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ContactPage;