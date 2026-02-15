import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../assets/images/tp-logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const routes = {
    HOME: "/",
    ABOUT_US: "/about-us",
    TERM_CONDITION: "/term-condition",
    CONTACT_US: "/contact-us"
  };

  return (
    <footer className="bg-[#0B1828] text-gray-300 mx-auto w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-7 pt-12">
        {/* MAIN FOOTER */}
        <div className="mx-auto flex flex-col md:flex-row gap-10 md:gap-36 mb-6">
          <div className="flex flex-row items-center justify-start">
            {/* BRAND */}
            <div className="space-y-4">
              <div className="flex items-start">
                <button
                  onClick={() => navigate(routes.HOME)}
                  className="w-[208px] h-[67px] flex items-center justify-start focus:outline-none"
                >
                  <img
                    src={logo}
                    alt="Teachinghood Logo"
                    className="h-full object-contain"
                  />
                </button>
              </div>

              <p className="font-normal text-[16px] leading-[26px] tracking-[0] text-gray-400 whitespace-nowrap">
                On a mission to simplify school hiring in India
              </p>

              <div className="font-normal text-[16px] leading-[26px] tracking-[0] text-gray-400">
                <p>contact@teachinghood.com</p>
                <p>+91-9923800424</p>
                <p>Gurgaon, India</p>
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3 pt-2">
                {[
                  {
                    Icon: FaFacebookF,
                    url: "https://www.facebook.com/profile.php?id=61570978044911",
                  },
                  {
                    Icon: FaLinkedinIn,
                    url: "https://www.linkedin.com/company/teachinghood/?viewAsMember=true",
                  },
                  {
                    Icon: FaInstagram,
                    url: "https://www.instagram.com/teachinghood/",
                  },
                ].map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-md bg-[#132939] flex items-center justify-center hover:bg-[#1e3a52] transition cursor-pointer"
                  >
                    <Icon size={14} className="text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-36">
            {/* CANDIDATES */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-[18px] leading-[27px] tracking-[0]">
                Candidates
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  <a href="/find-job">Find Jobs</a>
                </li>
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  <a href="/signup">Create Profile</a>
                </li>
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  <a href="/profile">Track Application</a>
                </li>
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  Learning Resources
                </li>
              </ul>
            </div>

            {/* SCHOOLS */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-[18px] leading-[27px] tracking-[0]">
                Schools
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  <a href="/post-job">Post Jobs</a>
                </li>
                {/* <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  Search Candidates
                </li> */}
                <li
                  onClick={() => {
                    if (
                      window.confirm(
                        "Please call our representative for inquiring about dedicated hiring support: +91-9226224831",
                      )
                    ) {
                      window.location.href = "tel:9226224831";
                    }
                  }}
                  className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]"
                >
                  Seek Hiring Support
                </li>
              </ul>
            </div>

            {/* RECRUITER */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-[18px] leading-[27px] tracking-[0]">
                Recruiter
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  <a href="/post-job">Post Jobs</a>
                </li>
                {/* <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  Search Candidates
                </li> */}
                <li className="hover:text-white cursor-pointer font-normal whitespace-nowrap text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  Seek Dedicated Hiring Support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mx-auto border-t border-[#1E293B]" />

        {/* BOTTOM BAR */}
        <div className="mx-auto pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2 md:gap-0">
          <div className="flex gap-6">
            <button
              onClick={() => navigate(routes.ABOUT_US)}
              className="font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer"
            >
              About Us
            </button>

            <button
              onClick={() => navigate(routes.CONTACT_US)}
              className="font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer"
            >
              Contact Us
            </button>
            {/* <span className="font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer">
              Privacy Policy
            </span> */}
            <button
              onClick={() => navigate(routes.TERM_CONDITION)}
              className="font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <div className="mt-2 md:mt-0 font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400">
            Crafted By{" "}
            <a href="https://netcraftglobal.com" target="_blank">
              NetCraft Global
            </a>
            {"  "}
            ❤️
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
