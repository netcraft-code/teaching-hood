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
          className="relative w-full bg-cover bg-center overflow-hidden h-[160px]"
          style={{ backgroundImage: `url(${HeroImages.bg})` }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-12">
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
                                `,
                }}
              >
                Terms & Conditions
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <span>
            <strong>Last Updated: </strong>20th Jan, 2026
          </span>
          <br />
          <br />
          <span>
            Welcome to <strong>Teachinghood</strong> ("Platform", "we", "us",
            "our"). Teachinghood is an online hiring and career platform
            designed to connect <strong>teachers</strong>,{" "}
            <strong>schools</strong>, and <strong>recruitment agencies</strong>{" "}
            on a single, organized ecosystem for teacher recruitment,
            professional growth, and opportunity discovery.
            <br />
            <br /> By accessing or using Teachinghood (including our website,
            mobile experiences, WhatsApp-based interactions, APIs, and related
            services), you agree to be bound by these Terms of Service
            ("Terms").
          </span>
          <br />
          <br />

          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Eligibility
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>You must be at least 18 years old to use Teachinghood.</li>
              <li>
                By using the Platform, you represent that you are legally
                capable of entering into a binding agreement.
              </li>
              <li>
                Schools and recruiters confirm they are authorized to post jobs
                and engage candidates on behalf of their institution or clients.
              </li>
            </ul>
            {/* <p className="text-sm text-gray-800 leading-relaxed">
                  By accessing, registering, or using Teachinghood in any manner, you confirm that you have read, understood, and agreed to these Terms & Conditions.  If you do not agree, you must not use the platform.
              </p> */}
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Scope of Services
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              Teachinghood provides:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                A plaƞorm for teachers to create profiles, explore opportunities,
                and apply for teaching-related roles.
              </li>
              <li>
                A plaƞorm for schools and recruiters to post teaching jobs and
                receive applications
              </li>
              <li>
                Communication tools (including email, WhatsApp, or plaƞorm
                messaging) to facilitate hiring conversations.
              </li>
            </ul>
            <p className="text-sm text-gray-800 leading-relaxed">
              Teachinghood does not guarantee job placement, hiring outcomes,
              interview calls, or employment offers
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3.Account Registration & Accuracy
            </h2>
            {/* <p className="text-sm text-gray-800 leading-relaxed mb-2">
              To use Teachinghood, you must:
            </p> */}
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Users may be required to create an account to access certain
                features
              </li>
              <li>
                You agree to provide accurate, complete, and up-to-date
                information
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
              <li>
                Teachinghood is not responsible for unauthorized access caused
                by user negligence.
              </li>
            </ul>
            {/* <p className="text-sm text-gray-800 leading-relaxed mt-2">
              We reserve the right to suspend or terminate accounts that violate
              these conditions.
            </p> */}
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. User Responsibilites
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed mb-2">
              You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>Provide false, misleading, or fraudulent information.</li>
              <li>
                Post discriminatory, abusive, misleading, or unlawful job
                listings or profiles
              </li>
              <li>
                Attempt to scrape, copy, reverse engineer, or misuse platform
                data.
              </li>
              <li>
                Circumvent platform processes, opt-in flows, or communication
                safeguards
              </li>
              <li>
                Use Teachinghood for purposes unrelated to teacher recruitment
                or professional development.
              </li>
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
              Violation may result in account suspension or permanent
              termination.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Teacher Profiles & Applications
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Teachers are responsible for the accuracy of their profiles,
                qualifications, experience, and preferences.
              </li>
              <li>
                Profile visibility may be limited or enhanced based on platform
                features.
              </li>
              <li>
                Applying to a job does not guarantee a response from schools or
                recruiters
              </li>
              <li>
                Teachinghood does not verify every credential unless explicitly
                stated.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Job Postings by Schools & Recruiters
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Schools and recruiters are solely responsible for job accuracy,
                role legitimacy, salary disclosures, and compliance with labor
                laws
              </li>
              <li>All payments are non-refundable unless stated otherwise.</li>
              <li>
                Teachinghood reserves the right to review, modify, or remove job
                postings that violate these Terms or applicable laws.
              </li>
              <li>
                Teachinghood is not a party to any employment contract between
                teachers and employers
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Communication & Consent
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                By using Teachinghood, you consent to receive communications via
                email, phone, WhatsApp, or in-platform messaging, strictly
                related to hiring, onboarding, and platform updates
              </li>
              <li>
                Users may opt out of non-essential communications at any time.
              </li>
              <li>
                Teachinghood does not sell personal contact data to third
                parties.
              </li>
            </ul>
            {/* <p className="text-sm text-gray-800 leading-relaxed">
              All content on Teachinghood, including logos, designs, text,
              graphics, and software, is the intellectual property of
              Teachinghood unless otherwise stated.
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              You may not copy, reproduce, modify, or distribute any content
              without written permission.
            </p> */}
          </div>

          {/* Section 9 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              9. Fees & Monetization
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Certain features may be free during pilot or early phases.
              </li>
              <li>
                Teachinghood reserves the right to introduce paid plans,
                subscriptions, or success-based fees with prior notice.
              </li>
              <li>
                All fees, if applicable, will be transparently communicated
                before charging.
              </li>
            </ul>
            {/* <p className="text-sm text-gray-800 leading-relaxed">
              Your use of Teachinghood is also governed by our Privacy Policy.
              By using the platform, you consent to the collection, storage, and
              processing of your data in accordance with applicable laws.
            </p> */}
          </div>

          {/* Section 10 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Intellectual Property
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                All platform content, branding, workflows, and software are the
                intellectual property of Teachinghood.
              </li>
              <li>
                Users retain ownership of their content but grant Teachinghood a
                non-exclusive, royalty-free license to use it for platform
                operations and improvements.
              </li>
            </ul>
            {/* <p className="text-sm text-gray-800 leading-relaxed">
              Teachinghood may integrate with third-party tools or services. We
              are not responsible for the content, policies, or practices of any
              third-party services.
            </p> */}
          </div>

          {/* Section 11 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              11. Data Privacy
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Teachinghood handles personal data in accordance with its
                Privacy Policy
              </li>
              <li>
                We implement reasonable security measures but cannot guarantee
                absolute security
              </li>
              <li>
                Users are encouraged to avoid sharing sensitive personal
                information outside platform-recommended fields.
              </li>
            </ul>
            {/* <li>Use of the platform is at your own risk.</li> */}
          </div>

          {/* Section 12 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              12. Platform Availability
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Teachinghood strives for reliable uptime but does not guarantee
                uninterrupted access.
              </li>
              <li>
                We may temporarily suspend services for maintenance, upgrades,
                or security reasons
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              12. Limitation of Liability
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Teachinghood shall not be liable for indirect, incidental, or
                consequential damages
              </li>
              <li>
                Teachinghood is not responsible for hiring decisions, employment
                disputes, or interactions between users.
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              13. Indemnification
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed mt-2">
              You agree to indemnify and hold Teachinghood harmless from any
              claims, losses, or damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Content or information you submit</li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              14. Suspension & Termination
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                Teachinghood may suspend or terminate access for violations of
                these Terms.
              </li>
              <li>
                Users may delete their account subject to data retention
                requirements.
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              15. Modifications to Terms
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>Teachinghood may update these Terms from time to time</li>
              <li>
                Continued use of the Platform after updates constitutes
                acceptance of revised Terms
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              16. Governing Law & Jurisdiction
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>These Terms are governed by the laws of India.</li>
              <li>
                Courts located in India shall have exclusive jurisdiction.
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              17. Contact Information
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed mb-2">
              For questions or concerns, contact:
            </p>
            <strong>Teachinghood</strong>
            <br />
            Email: <a href="mailto:contact@teachinghood.com" className="underline">contact@teachinghood.com</a> <br />
            Website: <span className="underline"><a href="https://www.teachinghood.com" target="_blank" rel="noopener noreferrer">www.teachinghood.com</a></span>
          </div>
          <strong>
            By using Teachinghood, you acknowledge that you have read,
            understood, and agreed to these Terms of Service.
          </strong>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
