import React, { useState } from 'react';
import { HeroImages } from "../assets/images/HeroImages";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); 

  const plans = [
    {
      id: 'growth',
      name: 'Growth',
      icon: '🌱',
      subtitle: 'Perfect for growing schools',
      monthlyPrice: 899,
      yearlyPrice: 7999,
      discount: 26,
      yearlyDiscount: 'Save ₹2,789',
      billingText: 'Billed annually ₹10,788',
      features: [
        '2 job posts/Job Posts',
        'Priority customer support',
        'Standard Brand on top of free posting',
        'Email support',
        'Basic Reports'
      ],
      buttonText: 'Get the Growth Plan',
      highlighted: false,
      gradient: 'from-green-500 to-emerald-600'
    }, {
      id: 'pro',
      name: 'Pro',
      icon: '⭐',
      subtitle: 'Made popular for all schools',
      monthlyPrice: 1299,
      yearlyPrice: 11999,
      discount: 23,
      yearlyDiscount: 'Save ₹3,589',
      billingText: 'Billed annually ₹15,588',
      recommended: true,
      features: [
        '5 job posts/Job Posts',
        'Priority customer support',
        'Priority Placement (Top of search)',
        'Profile Sync (4-10 search)',
        'Advanced Analytics',
        'Profile Boost'
      ],
      buttonText: 'Choose Pro',
      highlighted: true,
      gradient: 'from-blue-500 to-indigo-600'
    }, {
      id: 'enterprise',
      name: 'Enterprise',
      icon: '💼',
      subtitle: 'For experts in targeted Recruitment',
      monthlyPrice: 1599,
      yearlyPrice: 14999,
      discount: 22,
      yearlyDiscount: 'Save ₹4,189',
      billingText: 'Billed annually ₹19,188',
      features: [
        '10 job posts/Job Posts',
        'Priority customer support',
        'Priority Plus (all month)',
        'Profile Sync Account Manager',
        'Advanced Analytics',
        'Profile Boost'
      ],
      buttonText: 'Get the Enterprise Plan',
      highlighted: false,
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN');
  };

  return (
    <>
      <section
          className="py-16 md:py-24 min-h-[40vh] bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${HeroImages.bg})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600 font-regular">Join 500+ educators today</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Start hiring smarter or find your next teaching opportunity today.
            </h2>

            {/* Subheading */}
            <p className="font-sf font-normal text-[20px] leading-[28px] tracking-[0] text-black text-center mb-10 max-w-2xl mx-auto">
              Join the fastest-growing education hiring platform in India. It's time to make better connections.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-gray-50 transition font-sf font-normal text-[16px] leading-[100%] shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                  Find a Job
              </button>

              <button className="px-8 py-4 bg-white border-2 border-white rounded-full hover:bg-white/10 transition font-sf font-normal text-[16px] leading-[100%] backdrop-blur-sm">
                  Post A Job
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
              Select the perfect plan for your school's recruitment needs
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm sm:text-base font-semibold transition-all ${
              billingCycle === 'monthly' ? 'text-white' : 'text-white/70'
            }`}>
              Monthly
            </span>
            
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
              style={{ backgroundColor: billingCycle === 'yearly' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>

            <span className={`text-sm sm:text-base font-semibold transition-all flex items-center gap-2 ${
              billingCycle === 'yearly' ? 'text-white' : 'text-white/70'
            }`}>
              Yearly
              <span className="hidden sm:inline-block px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                Save up to 26%
              </span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.highlighted ? 'md:scale-105 border-4 border-blue-500' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold rounded-full shadow-lg">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-3xl sm:text-4xl`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-start justify-center mb-3">
                      <span className="text-2xl font-bold text-gray-900 mt-2">₹</span>
                      <span className="text-4xl sm:text-5xl font-black text-gray-900">
                        {formatPrice(getPrice(plan))}
                      </span>
                      <span className="text-lg text-gray-600 mt-2 ml-1">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>

                    {billingCycle === 'yearly' && (
                      <>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full mb-2">
                          <span className="text-base font-bold">{plan.discount}%</span>
                          <span className="text-xs font-bold">OFF</span>
                        </div>
                        <p className="text-sm font-semibold text-green-600">
                          {plan.yearlyDiscount}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Billing Info */}
                  <div className="border-t border-b border-gray-200 py-4 mb-6 text-center">
                    <p className="text-xs font-bold text-gray-500 tracking-wide mb-1">
                      {billingCycle === 'monthly' ? 'MONTHLY' : 'YEARLY'}
                    </p>
                    {billingCycle === 'yearly' && (
                      <p className="text-xs text-gray-400">
                        {plan.billingText}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-gradient-to-r ${plan.gradient} text-white`}
                  >
                    {plan.buttonText}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-white space-y-3">
            <p className="text-base sm:text-lg font-medium opacity-90">
              All plans include 24/7 customer support and regular updates
            </p>
            <p className="text-sm sm:text-base opacity-90">
              Need help choosing?{' '}
              <a href="#contact" className="font-semibold underline hover:opacity-80 transition-opacity">
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingSection;