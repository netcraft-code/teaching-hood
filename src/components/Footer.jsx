import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/icons/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0B1828] text-gray-300">
      <div className="mx-auto px-6 md:px-20 pb-7 pt-12">
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

              <p className="font-sf font-normal text-[16px] leading-[26px] tracking-[0] text-gray-400 whitespace-nowrap">
                On a mission to simplify school hiring in India
              </p>

              <div className="font-sf font-normal text-[16px] leading-[26px] tracking-[0] text-gray-400">
                <p>contact@teachinghood.com</p>
                <p>+91-9923800424</p>
                <p>Gurgaon, India</p>
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3 pt-2">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                  (Icon, i) => (
                    <span
                      key={i}
                      className="w-9 h-9 rounded-md bg-[#132939] flex items-center justify-center hover:bg-[#1e3a52] transition cursor-pointer"
                    >
                      <Icon size={14} />
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-36">
            {/* CANDIDATES */}
            <div>
              <h4 className="text-white font-semibold mb-4 font-sf text-[18px] leading-[27px] tracking-[0]">Candidates</h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Find Jobs</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Create Profile</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Track Application</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Learning Resources</li>
              </ul>
            </div>

            {/* SCHOOLS */}
            <div>
              <h4 className="text-white font-semibold mb-4 font-sf text-[18px] leading-[27px] tracking-[0]">Schools</h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Post Jobs</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Search Candidates</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
                  Seek Hiring Support
                </li>
              </ul>
            </div>

            {/* RECRUITER */}
            <div>
              <h4 className="text-white font-semibold mb-4 font-sf text-[18px] leading-[27px] tracking-[0]">Recruiter</h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Post Jobs</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">Search Candidates</li>
                <li className="hover:text-white cursor-pointer font-sf font-normal text-[16px] leading-[24px] tracking-[0] text-[#D1D5DC]">
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
            <span className="font-sf font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer">
              About Us
            </span>
            <span className="font-sf font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer">
              Contact Us
            </span>
            <span className="font-sf font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-sf font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400 hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>

          <div className="mt-2 md:mt-0 font-sf font-normal text-[14px] leading-[100%] tracking-[0] text-gray-400">
            Developed by XYZ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
