import React, { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const routes = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  PROFILE: "/profile",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("auth_token");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate(routes.HOME)}
            className="cursor-pointer"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-11 w-auto w-max-71"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/about">About Us</a>
            <a className="nav-link" href="/jobs">Jobs</a>
            <a className="nav-link" href="/contact">Contact</a>
            <a className="nav-link" href="/plan">Plan</a>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">

            {/* Auth */}
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate(routes.SIGNIN)}
                  className="px-5 py-2 border rounded-full hover:text-blue-600"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate(routes.SIGNUP)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(routes.PROFILE)}
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <UserCircle size={28} />
              </button>
            )}

            {/* Call Us */}
            <div className="text-right">
              <p className="text-xs text-gray-500">Call Us</p>
              <p className="text-green-600 font-semibold">
                +1 (514) 312-5678
              </p>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 border-t pt-4">
            <a className="block nav-link" href="/">Home</a>
            <a className="block nav-link" href="/about">About Us</a>
            <a className="block nav-link" href="/jobs">Jobs</a>
            <a className="block nav-link" href="/contact">Contact</a>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate(routes.SIGNIN)}
                  className="w-full border py-2 rounded-full"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate(routes.SIGNUP)}
                  className="w-full bg-blue-600 text-white py-2 rounded-full"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(routes.PROFILE)}
                className="w-full flex justify-center items-center gap-2 py-2"
              >
                <UserCircle /> Profile
              </button>
            )}

            <div className="text-center">
              <p className="text-xs text-gray-500">Call Us</p>
              <p className="text-green-600 font-semibold">
                +1 (514) 312-5678
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
