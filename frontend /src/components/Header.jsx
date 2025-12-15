import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

// Router State Management
const routes = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup'
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate(routes.HOME)} className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Teachinghood Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-blue-600">Teachinghood</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#find-job" className="text-gray-700 hover:text-blue-600 transition">Find a Job</a>
            <a href="#post-job" className="text-gray-700 hover:text-blue-600 transition">Post a Job</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About Us</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {!localStorage.getItem("auth_token") ? (
              <>
                <button 
                  onClick={() => navigate(routes.SIGNIN)}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate(routes.SIGNUP)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              </>
            ) : null}
            
            <div className="text-right">
              <div className="text-xs text-gray-500">Call Us</div>
              <div className="text-green-500 font-semibold">+1 (514) 312-5678</div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#find-job" className="text-gray-700 hover:text-blue-600 transition">Find a Job</a>
              <a href="#post-job" className="text-gray-700 hover:text-blue-600 transition">Post a Job</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About Us</a>
              <div className="pt-3 border-t space-y-2">
                <button 
                  onClick={() => navigate(routes.SIGNIN)}
                  className="w-full px-6 py-2 border border-gray-300 rounded-full text-gray-700"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate(routes.SIGNUP)}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-full"
                >
                  Get Started
                </button>
                <div className="text-center pt-2">
                  <div className="text-xs text-gray-500">Call Us</div>
                  <div className="text-green-500 font-semibold">+1 (514) 312-5678</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;