import React, { useState } from "react";
import { HeroImages } from "../assets/images/HeroImages";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    // <section className="py-16 md:py-24 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 relative overflow-hidden">
    <section
      className="py-16 md:py-24 min-h-[40vh] bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${HeroImages.bg})` }}
    >
      <div className="mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600 font-regular">
              Join 500+ educators today
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start hiring smarter or find your next teaching opportunity today.
          </h2>

          {/* Subheading */}
          <p className="font-sf font-normal text-[20px] leading-[28px] tracking-[0] text-black text-center mb-10 max-w-2xl mx-auto">
            Join the fastest-growing education hiring platform in India. It's
            time to make better connections.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to='/find-job'>
              <button className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-gray-50 hover:text-black transition font-sf font-normal text-[16px] leading-[100%] shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                Find A Job
              </button>
            </Link>

            <Link to='/post-job'>
              <button className="px-8 py-4 bg-white border-[1px] border-black rounded-full hover:bg-white/10 transition font-sf font-normal text-[16px] leading-[100%] backdrop-blur-sm">
                Post A Job
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
