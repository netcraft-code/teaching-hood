import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0B1828] text-gray-300">
      <div className="mx-auto px-6 md:px-24 pb-7 pt-12">
        {/* MAIN FOOTER */}
        <div className="mx-auto flex flex-col md:flex-row gap-10 md:gap-28 mb-6">
          <div className="flex flex-row items-center justify-start">
            {/* BRAND */}
            <div className="space-y-4">
              <div className='flex flex-col items-start justify-start'>
                <div className="flex flex-col items-center justify-center">
                  <button onClick={() => navigate(routes.HOME)} className="flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Teachinghood Logo"
                      className="w-9 h-9 object-contain"
                    />
                  </button>
                  
                  <div className="text-2xl md:text-3xl text-white text-center mt-2 md:mt-0">Teachinghood</div>
                </div>
              </div>

              <p className="text-sm text-gray-400 max-w-xs" >
                On a mission to simplify school hiring in India
              </p>

              <div className="text-sm space-y-1 text-gray-400">
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
              <h4 className="text-white font-semibold mb-4">Candidates</h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer">Find Jobs</li>
                <li className="hover:text-white cursor-pointer">Create Profile</li>
                <li className="hover:text-white cursor-pointer">Track Application</li>
                <li className="hover:text-white cursor-pointer">Learning Resources</li>
              </ul>
            </div>

            {/* SCHOOLS */}
            <div>
              <h4 className="text-white font-semibold mb-4">Schools</h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer">Post Jobs</li>
                <li className="hover:text-white cursor-pointer">Search Candidates</li>
                <li className="hover:text-white cursor-pointer">
                  Seek Hiring Support
                </li>
              </ul>
            </div>

            {/* RECRUITER */}
            <div>
              <h4 className="text-white font-semibold mb-4">Recruiter</h4>
              <ul className="space-y-3 text-xs">
                <li className="hover:text-white cursor-pointer">Post Jobs</li>
                <li className="hover:text-white cursor-pointer">Search Candidates</li>
                <li className="hover:text-white cursor-pointer">
                  Seek Hiring Support
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
            <span className="hover:text-white cursor-pointer">About Us</span>
            <span className="hover:text-white cursor-pointer">Contact Us</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>

          <div className="mt-2 md:mt-0">
            Developed by XYZ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
