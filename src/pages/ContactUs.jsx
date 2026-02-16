import React, { useState } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { HeroImages } from "../assets/images/HeroImages";
import { contactUsIcons } from "../assets/icons/contact-us/ContactUs";
import { Mail, Phone, Send } from 'lucide-react';
import { sendMessage } from "../api/auth";

const ContactUs = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const stats = [
        {
          icon: <Mail className="w-4 h-4 text-blue-600" />,
          value: 'Email Us',
          label: 'conatct@teachinghood.com',
          text: 'Send us an email anytime',
          bgColor: 'bg-blue-50'
        },
        {
          icon: <Phone className="w-4 h-4 text-green-600" />,
          value: 'Call Us',
          label: '+91-9928038204',
          text: 'Mon-Fri from 9am to 6pm',
          bgColor: 'bg-green-50'
        },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        inquiry_type: '',
        subject: '',
        message: '',
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const payload = new FormData();
          payload.append("name", formData.name);
          payload.append("email", formData.email);
          payload.append("phone_number", formData.phone_number);
          payload.append("inquiry_type", formData.inquiry_type);
          payload.append("subject", formData.subject);
          payload.append("message", formData.message);
    
          await sendMessage(payload);
    
          
          setPopupMessage("Message sent successfully!");
          setShowPopup(true);
    
          setFormData({
            name: '',
            email: '',
            phone_number: '',
            inquiry_type: '',
            subject: '',
            message: '',
          });
        } catch (error) {
          console.error("Contact form error:", error);

          setPopupMessage("Something went wrong. Please try again.");
          setShowPopup(true);
        }
    };

  return (
    <>
      <Header />

      <section className="relative w-full bg-transparent overflow-visible h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px]">
        {/* Background Image Container */}
        <div 
            className="relative w-full bg-cover bg-center overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px]"
            style={{ backgroundImage: `url(${HeroImages.bg})` }}
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20">
                {/* Badge */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                        <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                        <span className="text-sm font-regular text-gray-700">We're here to help</span>
                    </div>
                </div>
                
                {/* Heading */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 sm:mb-4 tracking-tight px-4"
                        style={{ 
                            textShadow: `
                                0px 0px 0px rgba(0, 0, 0, 0.10),
                                3px 3px 3px rgba(0, 0, 0, 0.10),
                                3px 4px 4px rgba(0, 0, 0, 0.10),
                                3px 4px 4px rgba(0, 0, 0, 0.10)
                            `
                        }}
                    >
                        Get in Touch
                    </h1>
                    <h2
                        className="text-sm sm:text-base md:text-lg font-semibold tracking-tight px-4"
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </h2>
                </div>
            </div>
        </div>

        {/* Stats Cards - Half overlap with background image */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-8 md:mx-20 lg:mx-56">
                    {stats.map((stat, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-4 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`${stat.bgColor} w-8 h-8 rounded-xl flex items-center justify-center mb-3`}>
                                    {stat.icon}
                                </div>
                                <div className="text-lg sm:text-xl font-regular text-gray-900 my-3 justify-center">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-blue-500 font-medium justify-center break-all">
                                    {stat.label}
                                </div>
                                <div className="text-sm font-regular text-gray-900 my-4 justify-center">
                                    {stat.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-16 sm:mt-24 md:mt-36 mx-4 sm:mx-8 md:mx-12 lg:mx-20">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100 lg:col-span-2 col-span-1">
            <div className="space-y-4 sm:space-y-6">
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                </div>
                
                <div>
                    {/* Email */}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                </div>
                
                <div>
                    {/* Inquiry Type */}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Inquiry Type
                    </label>
                    
                    <input
                        type="text"
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                </div>
              </div>

              <div>
                {/* Subject */}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                </label>
                
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Response Box */}
            <div className="flex rounded-2xl p-4 sm:p-6 shadow-md bg-blue-50">
              <div>
                {/* Icon + Heading */}
                <div className="flex items-center space-x-2 mb-1">
                    <div className='w-8 h-8 rounded-xl bg-white flex items-center justify-center'>
                        <img src={contactUsIcons.quickResponse} alt="" />
                    </div>

                    <img src={contactUsIcons.quickResponse1} className='w-4 h-4' />

                    <h4 className="font-semibold text-sm">Quick Response</h4>
                </div>

                {/* Paragraph */}
                <p className="text-xs text-gray-600 ml-0 sm:ml-12 mt-2 sm:mt-0">
                    We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>

            {/* Working Box */}
            <div className="flex rounded-2xl p-4 sm:p-6 shadow-md w-full">
              <div className='w-full'>
                <div className="flex items-center space-x-2 mb-1">
                    <div className='w-8 h-8 rounded-xl bg-white flex items-center justify-center'>
                        <img src={contactUsIcons.workingHours} alt="" />
                    </div>

                    <h4 className="font-semibold text-sm">Working Hours</h4>
                </div>

                {/* Paragraph */}
                <p className="text-xs text-gray-600 w-full leading-6 mb-4 mt-3">
                    <span className="flex justify-between">
                        <span>Monday–Friday</span>
                        <span>9:00 AM – 6:00 PM</span>
                    </span>

                    <span className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                    </span>

                    <span className="flex justify-between">
                        <span>Sunday</span>
                        <span className='text-red-500'>Closed</span>
                    </span>
                </p>

                <hr />
                
                <p className="flex items-center gap-2 text-xs text-gray-600 w-full leading-6 mt-4">
                    <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
                    Currently Open
                </p>
              </div>
            </div>

            {/* Connect */}
            <div className="flex rounded-2xl p-4 sm:p-6 shadow-md w-full">
              <div className='w-full'>
                <div className="flex items-center mb-1">
                    <h4 className="font-semibold text-sm">Connect With Us</h4>
                </div>

                {/* Paragraph */}
                <div className="flex justify-evenly items-center w-full mt-4">
                    {[
                        {
                        Icon: contactUsIcons.fb,
                        url: "https://www.facebook.com/profile.php?id=61570978044911",
                        },
                        {
                        Icon: contactUsIcons.twitter,
                        url: "",
                        },
                        {
                        Icon: contactUsIcons.insta,
                        url: "https://www.instagram.com/teachinghood/",
                        },
                    ].map(({ Icon, url }, i) => (
                        <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center hover:bg-[#1e3a52] transition"
                        >
                        <img src={Icon} className="w-4 h-4" alt="" />
                        </a>
                    ))}
                </div>
              </div>
            </div>

            {/*  */}
            <div className="flex rounded-2xl p-4 sm:p-6 shadow-md w-full">
              <div className='w-full'>
                <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-sm">Need Quick Answers?</h4>
                </div>

                {/* Paragraph */}
                <p className="text-xs text-gray-600 w-full leading-6 my-4">
                    Check out our frequently asked questions for instant help.

                </p>
                <button className='text-yellow-500 bg-[#FEFCE8] hover:bg-red-100 w-full p-2 rounded'>
                    View All FAQs
                </button>
              </div>
            </div>
          </div>
      </div>

      <div className="my-16 sm:my-20 md:my-28 px-4">
        <div className="h-8 w-16 bg-blue-100 flex mx-auto items-center text-center justify-center rounded-full gap-1">
            <img src={contactUsIcons.faqIcon} alt="" />
            <span className="text-sm">FAQ</span>
        </div>

        <div className="my-4 items-center text-center px-4">
            <p className="font-semibold text-2xl sm:text-3xl">
                Frequently Asked Questions
            </p>

            <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Find answers to common questions about our platform and services
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-8 md:mx-16 lg:mx-28">
            <div className="shadow-lg p-6 sm:p-8 rounded-xl">
                <span className="font-semibold text-sm mb-2 flex items-center">
                    <span className="text-blue-500 mr-3"> Q. </span> What are your support hours?
                </span>
                <p className="text-gray-500 text-xs leading-6 flex items-center mt-2">
                    Our support team is available Monday to Friday, 9:00 AM to 6:00 PM IST. We typically respond to all queries within 24 hours during business days.
                </p>
            </div>

            <div className="shadow-lg p-6 sm:p-8 rounded-xl">
                <span className="font-semibold text-sm mb-2 flex items-center">
                    <span className="text-blue-500 mr-3"> Q. </span> How quickly will I receive a response?
                </span>
                <p className="text-gray-500 text-xs leading-6 flex items-center mt-2">
                    We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
            </div>

            <div className="shadow-lg p-6 sm:p-8 rounded-xl">
                <span className="font-semibold text-sm mb-2 flex items-center">
                    <span className="text-blue-500 mr-3"> Q. </span> Do you offer phone support?
                </span>
                
                <p className="text-gray-500 text-xs leading-6 flex items-center mt-2">
                    Yes! You can reach us at +91-9928038204 during business hours for immediate assistance.
                </p>
            </div>

            <div className="shadow-lg p-6 sm:p-8 rounded-xl">
                <span className="font-semibold text-sm mb-2 flex items-center">
                    <span className="text-blue-500 mr-3"> Q. </span> Can I schedule a demo or consultation?
                </span>

                <p className="text-gray-500 text-xs leading-6 flex items-center mt-2">
                    Absolutely! Please fill out the contact form selecting "Schedule a Demo" and our team will reach out to arrange a convenient time.
                </p>
            </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
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

            <p className="text-gray-800 text-sm mb-6">
              {popupMessage}
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ContactUs;