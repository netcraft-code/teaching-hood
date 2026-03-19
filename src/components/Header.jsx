import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getProfile } from "../api/auth";

const routes = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  PROFILE: "/profile",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState(0);

  const isLoggedIn = !!localStorage.getItem("auth_token");

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUserType(Number(res.data.data.user_type));
      } catch (err) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_type");
        navigate("/signin");
      }
    };

    fetchProfile();
  }, [isLoggedIn, navigate]);

  // Active menu class
  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  const goTo = (path) => {
    if (!isLoggedIn && path === "/post-job") {
      navigate("/signin");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  let menuItems = [
    { name: "Home", path: "/" },
    { name: "Find a Job", path: "/find-job" },
    { name: "Post a Job", path: "/post-job" },
    { name: "About Us", path: "/about-us" },
    { name: "Newsletter", path: "/newsletter" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => goTo(routes.HOME)}
            className="cursor-pointer w-[170px]"
          >
            <img src={logo} alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-8">
            {menuItems.map((item) => {
              if (item.path === "/post-job" && userType === 1) {
                return null;
              }

              if (
                item.path === "/find-job" &&
                (userType === 2 || userType === 3)
              ) {
                return null;
              }

              return (
                <a
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className={`text-[16px] font-normal leading-[24px] tracking-[0] align-middle cursor-pointer ${isActive(item.path)}`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden xl:flex items-center gap-6">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => goTo(routes.SIGNIN)}
                  className="text-[16px] font-normal leading-none tracking-[0] px-7 py-3 border rounded-full hover:text-blue-600"
                >
                  Sign In
                </button>
                <button
                  onClick={() => goTo(routes.SIGNUP)}
                  className="text-[16px] font-normal leading-none tracking-[0] px-7 py-3 bg-blue-600 text-white rounded-full"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => goTo(routes.PROFILE)}
                className="hover:text-blue-600"
              >
                <UserCircle size={28} />
              </button>
            )}

            {/* Call Us */}
            <div className="text-right">
              <p className="text-[16px] font-normal leading-[24px] align-middle">
                Call Us
              </p>
              <p className="text-[19px] font-normal leading-[28.5px] text-green-600 align-middle">
                +91-9960750424
              </p>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen
              ? "max-h-screen mt-4 p-4 bg-white-900 rounded-lg"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => {
              if (item.path === "/post-job" && userType === 1) {
                return null;
              }

              return (
                <a
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className={`text-[16px] font-normal leading-[24px] tracking-[0] align-middle cursor-pointer flex justify-center items-center ${isActive(item.path)}`}
                >
                  {item.name}
                </a>
              );
            })}

            {!isLoggedIn ? (
              <>
                <button className="text-[16px] font-normal leading-none tracking-[0] w-full border py-2 rounded-full">
                  Sign In
                </button>
                <button className="text-[16px] font-normal leading-none tracking-[0] w-full bg-blue-600 text-white py-2 rounded-full">
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="text-[16px] font-normal leading-none tracking-[0] w-full flex justify-center items-center gap-2 py-2"
                onClick={() => goTo(routes.PROFILE)}
              >
                <UserCircle /> Profile
              </button>
            )}

            {/* Mobile Call Us */}
            <div className="text-center">
              <p className="text-[16px] font-normal leading-[24px] align-middle">
                Call Us
              </p>
              <p className="text-[19px] font-normal leading-[28.5px] text-green-600 align-middle">
                +91-9960750424
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
