import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SimpleBanner from "../components/SimpleBanner";
import TeachersSection from "../components/TeachersSection"
import SchoolsSection from "../components/SchoolsSection"
import RecruitersSection from "../components/RecruitersSection"
import OurMissionSection from "../components/OurMissionSection";
import QuickLinksSection from "../components/QuickLinksSection";
import TiredOfPostingSection from "../components/TiredOfPostingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Faqs from "../components/Faqs";
import ContactUsSection from "../components/ContactUsSection";
import CTASection from "../components/CTASection";
import JobCarousel from "../components/JobCarousel";

const Home = () => {
  return (
    <>
      <Header />
      <SimpleBanner />
      <HeroSection />
      <JobCarousel />
      <TeachersSection />
      <SchoolsSection />
      <RecruitersSection />
      <OurMissionSection />
      <QuickLinksSection />
      <TiredOfPostingSection />
      <TestimonialsSection />
      <Faqs />
      <ContactUsSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
