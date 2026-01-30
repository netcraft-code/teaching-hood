import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { homePageIcons } from "../assets/icons/HomePageIcons";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
        question: "What is Teachinghood?",
        answer: "Teachinghood is a dedicated teacher hiring and professional growth platform for schools and educators in India. It connects verified teachers with schools through structured profiles, targeted jobs, and a transparent hiring process.",
    }, {
        question: "Is Teachinghood free for teachers?",
        answer: "Yes. Creating a profile, applying to jobs, and exploring opportunities on Teachinghood is completely free for teachers. Our goal is to empower teachers, not charge them.",
    }, {
        question: "How is Teachinghood different from Facebook or WhatsApp job groups?",
        answer: "Unlike scattered social media posts, Teachinghood offers organized, filterable job listings and detailed teacher profiles. This saves time, reduces noise, and improves hiring quality for both schools and teachers.",
    }, {
        question: "What kind of schools can use Teachinghood?",
        answer: "Teachinghood is built for private, regional and international accredited schools and recruitment agencies across India. Any institution looking for qualified teachers can use the platform.",
    }, {
        question: "Are teacher profiles verified?",
        answer: "Yes. In the dedicated hiring support programme, teacher profiles go through basic screening and information checks to ensure authenticity. This helps schools engage with genuine candidates and reduces low-quality or irrelevant applications.",
    }, {
        question: "Can schools track and manage applications?",
        answer: "Yes. Schools can view, shortlist, and manage applications in one place. This brings structure and visibility to an otherwise informal hiring process.",
    }, {
        question: "What details are included in a teacher profile?",
        answer: "A teacher profile includes qualifications, subjects, grades, experience, location, preferences, and a personal bio. Teachers can also highlight achievements, certifications, and career goals.",
    }, {
        question: "Can teachers specify preferred locations and roles?",
        answer: "Absolutely. Teachers can set preferred cities, grades, subjects, and job types, helping schools reach the most relevant candidates and improving match quality.",
    }, {
        question: "Does Teachinghood support fresher teachers?",
        answer: "Yes. Teachinghood supports both experienced educators and freshers. Schools can clearly mention experience requirements, and freshers get visibility beyond closed networks.",
    }, {
        question: "How does Teachinghood improve hiring quality for schools?",
        answer: "By combining structured profiles, initial screening, and targeted visibility, Teachinghood reduces random applications. Schools get fewer but more relevant candidates.",
    }, {
        question: "Does Teachinghood help teachers grow professionally?",
        answer: "Yes. Teachinghood goes beyond jobs by promoting skill development, training, best practices, and tech adoption. Our mission is long-term teacher growth, not just placement.",
    }, {
        question: "Is Teachinghood only for metro cities?",
        answer: "No. Teachinghood is designed for India-wide reach, including Tier 2 and Tier 3 cities. Schools and teachers from any location can benefit.",
    }, {
        question: "How quickly can schools expect responses?",
        answer: "As our data engine grows, schools often receive relevant applications within days, not weeks. The platform is designed to reduce long notice cycles and hiring delays.",
    }, {
        question: "How do I get started with Teachinghood?",
        answer: "Simply sign up, create your profile (teacher or school), and start exploring opportunities. No long forms, no middlemen—just a clear, structured hiring journey.",
    } 
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <img src={homePageIcons.faqIcon} className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold">FAQ</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Teachinghood
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-gray-50"
              >
                <span className="font-semibold text-[18px] text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border-2 border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the answers you need.
            </p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-semibold">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
