import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import contactUsEmailIcon from "./../assets/icons/contact-us-email.svg";
import { sendMessage } from "../api/auth";
import schoolFindRightIcon from "./../assets/icons/school-find-right.svg";

const ContactUsSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    attachment: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    // Attachment validation
    if (formData.attachment) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ];

      if (!allowedTypes.includes(formData.attachment.type)) {
        newErrors.attachment =
          "Only PDF, DOC, DOCX, JPG and PNG files are allowed";
      }

      // Max 5MB
      if (formData.attachment.size > 5 * 1024 * 1024) {
        newErrors.attachment = "File size must be less than 5MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0],
    });

    setErrors({
      ...errors,
      attachment: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("message", formData.message);

      if (formData.attachment) {
        payload.append("attachment", formData.attachment);
      }

      await sendMessage(payload);

      setPopupMessage("Message sent successfully!");
      setShowPopup(true);

      setFormData({
        name: "",
        email: "",
        message: "",
        attachment: null,
      });

      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);

      setPopupMessage("Something went wrong. Please try again.");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full mb-6">
            <img src={contactUsEmailIcon} className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-semibold">
              Get in Touch
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>

          <p className="text-lg text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Main Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                ></textarea>

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attachment (optional)
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className={`w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-pointer ${
                    errors.attachment
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {formData.attachment && (
                  <p className="text-xs text-gray-600 mt-1">
                    Selected: {formData.attachment.name}
                  </p>
                )}

                {errors.attachment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.attachment}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />

                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>

                    <div className="font-normal text-gray-900">
                      contact@teachinghood.com
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>

                    <div className="font-normal text-gray-900">
                      +91-9960750424
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>

                    <div className="font-normal text-gray-900">
                      Gurgaon, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="flex rounded-2xl p-6 border-l-4 border-blue-400 shadow-md bg-white">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={schoolFindRightIcon}
                    className="w-5 h-5"
                    alt="icon"
                  />

                  <h4 className="font-semibold text-blue-500">
                    Quick Response:
                  </h4>
                </div>

                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-gray-800 text-sm mb-6">{popupMessage}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUsSection;