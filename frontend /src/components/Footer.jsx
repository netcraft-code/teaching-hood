import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold text-white">Teachinghood</span>
            </div>
            <p className="text-sm mb-4">On a mission to simplify school hiring in india</p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                contact@teachinghood.com
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2" />
                +91-9923800424
              </p>
              <p className="flex items-center">
                <MapPin size={16} className="mr-2" />
                Gurgaon, India
              </p>
            </div>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Candidates Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Candidates</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Find Jobs</a></li>
              <li><a href="#" className="hover:text-white transition">Create Profile</a></li>
              <li><a href="#" className="hover:text-white transition">Track Application</a></li>
              <li><a href="#" className="hover:text-white transition">Learning Resources</a></li>
            </ul>
          </div>

          {/* Schools Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Schools</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Post Jobs</a></li>
              <li><a href="#" className="hover:text-white transition">Search Candidates</a></li>
              <li><a href="#" className="hover:text-white transition">Seek Hiring Support</a></li>
            </ul>
          </div>

          {/* Recruiter Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Recruiter</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Post Jobs</a></li>
              <li><a href="#" className="hover:text-white transition">Search Candidates</a></li>
              <li><a href="#" className="hover:text-white transition">Seek Hiring Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition">About Us</a>
            <a href="#" className="hover:text-white transition">Contact Us</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
          <div className="text-gray-500">
            Developed by XYZ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;