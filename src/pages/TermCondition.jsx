import Footer from "../components/Footer";
import Header from "../components/Header";
import { HeroImages } from "../assets/images/HeroImages";

const AboutUs = () => {
  return (
    <>
        <Header />
      
        <section className="relative w-full">
            {/* Background Image Container */}
            <div 
                className="relative w-full bg-cover bg-center overflow-hidden h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
                style={{ backgroundImage: `url(${HeroImages.bg})` }}
            >
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20">
                    
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
                            Term & Conditions
                        </h1>
                    </div>
                </div>
            </div>
        </section>
        
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        By accessing, registering, or using Teachinghood in any manner, you confirm that you have read, understood, and agreed to these Terms & Conditions.  If you do not agree, you must not use the platform.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        2. About Teachinghood
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        Teachinghood is a digital platform designed to connect educational institutions, recruiters, and teaching professionals. We provide tools for job listings, candidate management, communication, and related educational services. Teachinghood does not guarantee employment, hiring, or placement outcomes.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        3. User Eligibility
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed mb-2">
                        To use Teachinghood, you must:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>Be at least 18 years old</li>
                        <li>Provide accurate and complete registration information</li>
                        <li>Use the platform for lawful purposes only</li>
                    </ul>
                    <p className="text-sm text-gray-800 leading-relaxed mt-2">
                        We reserve the right to suspend or terminate accounts that violate these conditions.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        4. Account Registration & Security
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
                        <li>You are fully responsible for all activities under your account.</li>
                        <li>Teachinghood is not liable for unauthorized access resulting from user negligence.</li>
                    </ul>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        5. User Responsibilities
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed mb-2">
                        You agree not to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>Provide false, misleading, or incomplete information</li>
                        <li>Upload harmful, offensive, or illegal content</li>
                        <li>Attempt to access unauthorized areas of the platform</li>
                        <li>Interfere with platform security or functionality</li>
                    </ul>
                    <p className="text-sm text-gray-800 leading-relaxed mt-2">
                        Violation may result in account suspension or permanent termination.
                    </p>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        6. Job Listings & Applications
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>Teachinghood acts only as a platform facilitator.</li>
                        <li>Institutions are responsible for the accuracy of job postings.</li>
                        <li>Candidates are responsible for the accuracy of their profiles and applications.</li>
                        <li>Teachinghood does not verify or guarantee the authenticity of users, institutions, or job listings.</li>
                    </ul>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        7. Payments, Subscriptions & Billing
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>Some features may require paid subscriptions.</li>
                        <li>All payments are non-refundable unless stated otherwise.</li>
                        <li>Subscription plans, pricing, and features may change with prior notice.</li>
                        <li>Failure to pay may result in restricted access or service suspension.</li>
                    </ul>
                </div>

                {/* Section 8 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        8. Intellectual Property
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        All content on Teachinghood, including logos, designs, text, graphics, and software, is the intellectual property of Teachinghood unless otherwise stated.
                    </p>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        You may not copy, reproduce, modify, or distribute any content without written permission.
                    </p>
                </div>

                {/* Section 9 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        9. Privacy & Data Usage
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        Your use of Teachinghood is also governed by our Privacy Policy. By using the platform, you consent to the collection, storage, and processing of your data in accordance with applicable laws.
                    </p>
                </div>

                {/* Section 10 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        10. Third-Party Services
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        Teachinghood may integrate with third-party tools or services. We are not responsible for the content, policies, or practices of any third-party services.
                    </p>
                </div>

                {/* Section 11 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        11. Limitation of Liability
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>Teachinghood shall not be liable for:</li>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                            <li>Any direct or indirect damages</li>
                            <li>Loss of data, revenue, or business</li>
                            <li>Employment or hiring decisions made through the platform</li>
                        </ul>
                        <li>Use of the platform is at your own risk.</li>
                    </ul>
                </div>

                {/* Section 12 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        12. Contact Information
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                        <li>For questions or concerns regarding these Terms & Conditions, please contact:</li>
                        <li>Email: contact@teachinghood.com</li>
                        Address: India
                    </ul>
                </div>
            </div>
        </div>

        <Footer />
    </>
  );
};

export default AboutUs;
