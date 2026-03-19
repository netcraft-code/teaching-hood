import React, { useState } from "react";
import { Star } from "lucide-react";
import { homePageIcons } from "../assets/icons/HomePageIcons";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Teachinghood helped me find the perfect role in less than two weeks.",
      name: "Lavanya Srivastava",
      role: "TGT English Teacher",
      avatar: "L",
      color: "bg-blue",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-400",
      reviewQuote: homePageIcons.reviewBlue,
      rating: 5,
    },
    {
      quote: "We filled most of our vacancies sooner with the free plan",
      name: "Sandeep Modhak",
      role: "Principal",
      avatar: "S",
      color: "bg-green",
      bgColor: "bg-green-500",
      borderColor: "border-green-400",
      reviewQuote: homePageIcons.reviewGreen,
      rating: 4.5,
    },
    {
      quote:
        "I applied for jobs relevant to me and landed in to the school my choice finally. Thank you Teachinghood",
      name: "Anjali Patel",
      role: "PRT Teacher",
      avatar: "A",
      color: "bg-yellow",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-400",
      reviewQuote: homePageIcons.reviewYellow,
      rating: 5,
    },
    {
      quote:
        "Uploading jobs is actually simplified and i am happy with the quality of applications we receive.",
      name: "Rajesh Tokekar",
      role: "HR Manager",
      avatar: "R",
      color: "bg-red",
      bgColor: "bg-red-500",
      borderColor: "border-red-400",
      reviewQuote: homePageIcons.reviewRed,
      rating: 4,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-blue-50 from-gray-50 to-white">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-yellow-400 font-semibold">
              Testimonials
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by teachers and schools alike
          </h2>
          <p className="text-lg text-gray-600">
            See what our community has to say
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 ${testimonial.borderColor} flex flex-col`}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <div
                  className={`w-10 h-10 ${testimonial.color}-100 rounded-xl flex items-center justify-center`}
                >
                  <img
                    src={testimonial.reviewQuote}
                    alt=""
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => {
                  const rating = testimonial.rating;
                  const isFull = rating >= i + 1;
                  const isHalf = rating >= i + 0.5 && rating < i + 1;

                  return (
                    <div key={i} className="relative w-4 h-4">
                      {/* Empty star */}
                      <Star className="w-4 h-4 text-gray-300" />

                      {/* Full star */}
                      {isFull && (
                        <Star className="absolute top-0 left-0 w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}

                      {/* Half star */}
                      {isHalf && (
                        <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
