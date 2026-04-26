import React, { useState } from "react";
import { HeroImages } from "../assets/images/HeroImages";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createPayment } from "../api/auth";
import graph from "./../assets/images/graph.png";
import starter from "./../assets/images/starter.png";
import enterprise from "./../assets/images/enterprise.png";

const PricingSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const [loadingPlanId, setLoadingPlanId] = useState(null);

  const handlePlanPurchase = async (plan) => {
    try {
      setLoadingPlanId(plan.id);

      const { data } = await createPayment({
        plan_id: plan.id,
        name: plan.name,
        amount: plan.yearlyPrice,
        full_plan: plan,
      });

      if (data?.payment_link) {
        window.open(data.payment_link, "_blank", "noopener,noreferrer");
      } else {
        console.error("Payment link not found");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoadingPlanId(null);
    }
  };

  const plans = [
    {
      id: "growth",
      name: "Starter",
      icon: starter,
      subtitle: "Perfect for growing schools",
      monthlyPrice: 899,
      yearlyPrice: 7999,
      monthlyBilled: 943,
      discount: 26,
      borderColor: "border-green-400",
      iconBg: "bg-green-500",
      badgeBg: "bg-green-500",
      discountBg: "bg-green-400",
      yearlyTextColor: "text-green-600",
      buttonClass: "bg-green-500 hover:bg-green-600",
      bestForColor: "text-green-600",
      bestFor: "Occasional Hiring",
      features: [
        {
          text: "2 Per Month",
          sub: "Job Posts",
        },
        { text: "30 Days", sub: "Job Post Visibility" },
        {
          text: "Standard",
          sub: "Listing Style",
        },
        {
          text: "Upto 10 Applications",
          sub: "Application Visibility Per Job Post",
        },
        { text: "No Alerts", sub: "Job Alerts For Teachers" },
        // { text: "Basic Analytics", sub: null },
      ],
      buttonText: "Get Starter",
      highlighted: false,
    },
    {
      id: "pro",
      name: "Growth",
      icon: graph,
      subtitle: "Most popular for active hiring",
      monthlyPrice: 1299,
      yearlyPrice: 11999,
      monthlyBilled: 1166,
      discount: 23,
      borderColor: "border-blue-500",
      iconBg: "bg-blue-500",
      badgeBg: "bg-blue-500",
      discountBg: "bg-blue-400",
      yearlyTextColor: "text-blue-600",
      buttonClass: "bg-blue-500 hover:bg-blue-600",
      bestForColor: "text-blue-600",
      bestFor: "Regular Hiring",
      recommended: true,
      features: [
        {
          text: "5 Per Month",
          sub: "Job Posts",
        },
        { text: "45 Days", sub: "Job Post Visibility" },
        { text: "Priority", sub: "Listing Style" },
        {
          text: "Upto 20 Applications",
          sub: "Application Visibility Per Job Post",
        },
        { text: "Whatsapp Alerts", sub: "Job Alerts For Teachers" },
        // { text: "Advanced Analytics", sub: null },
        // { text: "Profile Boost", sub: null },
      ],
      buttonText: "Get Growth",
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: enterprise,
      subtitle: "For recruiters & large institutions",
      monthlyPrice: 1599,
      yearlyPrice: 14999,
      monthlyBilled: 1416,
      discount: 22,
      borderColor: "border-yellow-400",
      iconBg: "bg-yellow-500",
      badgeBg: "bg-yellow-500",
      discountBg: "bg-yellow-400",
      yearlyTextColor: "text-yellow-600",
      buttonClass: "bg-yellow-500 hover:bg-yellow-600",
      bestForColor: "text-yellow-600",
      bestFor: "Recruiters & High Volume Hiring",
      features: [
        {
          text: "10 Per Month ",
          sub: "Job Posts",
        },
        { text: "60 Days", sub: "Job Post Visibility" },
        { text: "Top Priority", sub: "Listing Style" },
        {
          text: "Unlimited Applications",
          sub: "Application Visibility Per Job Post",
        },
        {
          text: "Whatsapp Alerts & Call Outreach",
          sub: "Job Alerts For Teachers",
        },
        // { text: "Custom Analytics Dashboard", sub: null },
        // { text: "Profile Boost", sub: null },
        // { text: "Dedicated Account Manager", sub: null },
      ],
      buttonText: "Get Enterprise",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "What happens when I exceed my job post limit?",
      answer:
        "You can purchase additional job posts à la carte or upgrade to a higher tier plan.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all annual plans. Contact us for details.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 7-day free trial on all plans. No credit card required to start.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatPrice = (price) => price.toLocaleString("en-IN");

  return (
    <>
      {/* Hero CTA Section */}
      <section
        className="py-6 md:py-6 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${HeroImages.bg})` }}
      >
        <div className="mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600 font-medium">
                Simple, Transparent Pricing
              </span>
            </div> */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 sm:mb-4 tracking-tight px-4"
              style={{ textShadow: "2px 2px 6px rgba(161, 141, 141, 0.7)" }}
            >
              <span className="font-light">Select the perfect plan</span> <br />{" "}
              <span>that meets your hiring needs</span>
            </h2>

            {/* <p
              className="text-4xl md:text-5xl lg:text-6xl leading-tight text-white text-center mb-10 max-w-2xl mx-auto"
              style={{ textShadow: "2px 2px 6px rgba(124, 112, 112, 0.7)" }}
            >
              for Your School
            </p> */}
            <div className="flex flex-col gap-4 justify-center items-center">
              {/* <p className="text-[14px] text-gray-600 leading-relaxed max-w-2xl">
                Find the right teachers, without the wait
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border-2 ${plan.borderColor} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-block px-5 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg tracking-wide uppercase">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + Name */}
                  <div className="flex flex-col items-center text-center mb-5">
                    <div
                      className={`w-14 h-14 ${plan.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-md`}
                    >
                      <img src={plan.icon} alt={plan.name} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      {plan.name}
                    </h3>
                    {/* <p className="text-sm text-gray-400 mt-1">
                      {plan.subtitle}
                    </p> */}
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-100 mb-5" />

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-[15px] font-semibold text-gray-800">
                            {feature.text}
                          </p>
                          {feature.sub && (
                            <p className="text-[13px] text-gray-400">
                              {feature.sub}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Yearly Price Box — BEST VALUE */}
                  <div
                    className={`rounded-xl border ${plan.borderColor} bg-gray-50 p-4 mb-3`}
                  >
                    <div className="flex items-center justify-end">
                      {/* <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${plan.badgeBg} text-white rounded-full`}
                      >
                        Best Value
                      </span> */}
                      <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-widest">
                        Annually
                      </span>
                    </div>
                    <div className="flex items-end gap-2 flex-wrap">
                      <div
                        className="flex items-start gap-3"
                        style={{ flexDirection: "column" }}
                      >
                        <div>
                          <span className="text-base font-bold text-gray-800 mt-1">
                            ₹
                          </span>
                          <span className="text-3xl font-black text-gray-900">
                            {formatPrice(plan.yearlyPrice)}
                          </span>
                        </div>
                        <p className={`text-sm font-bold ${plan.bestForColor}`}>
                          Best For {plan.bestFor}
                        </p>
                        {/* <span className="text-sm text-gray-400 ml-1 mt-2">
                          /month
                        </span> */}
                      </div>
                      {/* <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 ${plan.discountBg} text-white text-xs font-bold rounded-full`}>
                        {plan.discount}% SAVE
                      </span> */}
                    </div>
                  </div>

                  {/* Best For */}
                  {/* <div
                    className={`rounded-xl bg-gray-50 border ${plan.borderColor} px-4 py-3 mb-5`}
                  >
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
                      Best For
                    </p>
                    <p className={`text-sm font-bold ${plan.bestForColor}`}>
                      {plan.bestFor}
                    </p>
                  </div> */}

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanPurchase(plan)}
                    disabled={loadingPlanId === plan.id}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 ${plan.buttonClass} ${loadingPlanId === plan.id ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {loadingPlanId === plan.id
                      ? "Processing..."
                      : plan.buttonText}

                    {loadingPlanId !== plan.id && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Header */}
          {/* <div className="text-center py-16"> */}
          {/* Badge */}
          {/* <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-blue-600 font-semibold">FAQ</span>
            </div> */}

          {/* Heading */}
          {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our platform and services
            </p> */}
        </div>

        {/* FAQ List */}
        {/* <div className="max-w-3xl mx-auto space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-gray-50"
                >
                  <span className="font-semibold text-[18px] text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default PricingSection;
