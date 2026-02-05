import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/tp-logo.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import authPageBG from "../assets/images/auth-page-bg.png";
import Header from "../components/Header";

// Router State Management
const routes = {
  HOME: "/",
  SIGNIN: "/signin",
  PROFILE: "/profile",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  HELP: "/help",
};

// Sign Up Component
const SignUpPage = () => {
  const [userType, setUserType] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const USER_FORM_CONFIG = {
    1: {
      // Teacher
      firstNameLabel: "First Name",
      firstNamePlaceholder: "Enter your first name",
      lastNameLabel: "Last Name",
      lastNamePlaceholder: "Enter your last name",
      mobileLabel: "Mobile Number",
      mobilePlaceholder: "9876543210",
      emailLabel: "Email Address",
      emailPlaceholder: "teacher@example.com",
      showCity: false,
      tabColor: "#FF5E57",
      title: "Join Teachinghood to take your career to the next level",
    },

    2: {
      // School
      firstNameLabel: "School Name",
      firstNamePlaceholder: "Enter school name",
      mobileLabel: "Office Mobile Number",
      mobilePlaceholder: "9876543210",
      emailLabel: "School Email",
      emailPlaceholder: "school@example.com",
      cityLabel: "City",
      cityPlaceholder: "Enter city name",
      showCity: true,
      tabColor: "#28C76F",
      title: "Join Teachinghood to take your career to the next level school",
    },

    3: {
      // Recruiter
      firstNameLabel: "Company Name",
      firstNamePlaceholder: "Enter company name",
      mobileLabel: "Company Mobile Number",
      mobilePlaceholder: "9876543210",
      emailLabel: "Email Address",
      emailPlaceholder: "company@example.com",
      cityLabel: "City",
      cityPlaceholder: "Enter city name",
      showCity: true,
      tabColor: "#FFC107",
      title:
        "Join Teachinghood to take your career to the next level recruiter",
    },
  };

  const currentConfig = USER_FORM_CONFIG[userType];

  const getTabStyle = (type) => {
    const isActive = userType === type;
    const color = USER_FORM_CONFIG[type].tabColor;

    return {
      borderColor: isActive ? color : "#E5E7EB",
      color: isActive ? color : "#6B7280",
      backgroundColor: isActive ? `${color}0D` : "#FFFFFF", // 5% opacity
    };
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Basic validation
    if (!firstName || !email || !phoneNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (userType == 2 && !city) {
      setError("All fields are required");
      return;
    }

    if (userType == 3 && !city) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept terms and conditions to continue");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phoneNumber,
        city: city,
        password: password,
        position: position,
        password_confirmation: confirmPassword,
        user_type: userType, // teacher / school / recruiter
      };

      const res = await registerUser(payload);

      if (res.data.status) {
        setSuccess(
          "Account created & Login successfully 🎉 Redirecting to Profile...",
        );

        setTimeout(() => {
          if (res.data?.data?.token) {
            localStorage.setItem("auth_token", res.data.data.token);
          }

          navigate(routes.PROFILE);
        }, 1500);
      } else {
        const errorMessages = Object.entries(res.data.errors)
          .map(([key, values]) => `${key}: ${values.join(", ")}`)
          .join("\n");

        setError(errorMessages || "An error occurred");
      }
    } catch (err) {
      let errorMessages = "An error occurred";

      if (err.response?.data?.errors) {
        errorMessages = Object.entries(err.response.data.errors)
          .map(([key, values]) => `${key}: ${values.join(", ")}`)
          .join("<br />");
      }

      setError(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen w-full flex items-center justify-center bg-no-repeat bg-center py-8 mx-auto bg-cover"
        style={{
          backgroundImage: `url(${authPageBG})`,
          backgroundSize: "180% 100%",
        }}
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col text-center justify-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                onClick={() => navigate(routes.HOME)}
                className="flex items-center justify-center space-x-2 mb-1"
              >
                <img
                  src={logo}
                  alt="Teachinghood Logo"
                  className="w-[250px]"
                />
              </button>
            </div>

            <div className="flex items-center justify-center mx-auto">
              <p className="text-lg sm:text-xl font-semibold text-center leading-[33px] text-white">
                {currentConfig.title}
              </p>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            {/* User Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUserType(1)}
                  style={getTabStyle(1)}
                  className="flex-1 py-2 px-2 sm:px-4 rounded-lg border-2 transition font-semibold"
                >
                  Teacher
                </button>

                <button
                  onClick={() => setUserType(2)}
                  style={getTabStyle(2)}
                  className="flex-1 py-2 px-2 sm:px-4 rounded-lg border-2 transition font-semibold"
                >
                  School
                </button>

                <button
                  onClick={() => setUserType(3)}
                  style={getTabStyle(3)}
                  className="flex-1 py-2 px-2 sm:px-4 rounded-lg border-2 transition font-semibold"
                >
                  Recruiter
                </button>
              </div>
            </div>

            {/* First Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentConfig.firstNameLabel}
              </label>
              <input
                type="text"
                placeholder={currentConfig.firstNamePlaceholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {userType == 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentConfig.lastNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={currentConfig.lastNamePlaceholder}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {/* Position Radio */}
            {userType == 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>

                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="position"
                      value="Teacher"
                      checked={position === "Teacher"}
                      onChange={(e) => setPosition(e.target.value)}
                      className="text-blue-600"
                    />
                    Teacher
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="position"
                      value="Principal"
                      checked={position === "Principal"}
                      onChange={(e) => setPosition(e.target.value)}
                      className="text-blue-600"
                    />
                    Principal
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="position"
                      value="Vice Principal / Coordinator"
                      checked={position === "Vice Principal / Coordinator"}
                      onChange={(e) => setPosition(e.target.value)}
                      className="text-blue-600"
                    />
                    Vice Principal / Coordinator
                  </label>
                </div>
              </div>
            )}

            {/* Mobile Number Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentConfig.mobileLabel}
              </label>
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="text"
                  value="+91"
                  readOnly
                  className="input col-span-1 bg-gray-100 cursor-not-allowed text-center w-full px-4 py-3 border border-gray-300 rounded-lg"
                />

                <input
                  type="tel"
                  name="phone"
                  className="input col-span-4 w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder={currentConfig.mobilePlaceholder}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentConfig.emailLabel}
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder={currentConfig.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* City Input */}
            {currentConfig.showCity && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentConfig.cityLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={currentConfig.cityPlaceholder}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            )}

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {error && (
              <p
                className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded"
                dangerouslySetInnerHTML={{ __html: error }}
              ></p>
            )}

            {success && (
              <p className="mb-3 text-sm text-green-600 bg-green-50 p-2 rounded">
                {success}
              </p>
            )}

            {/* Create Account Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate(routes.SIGNIN)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-600">
            <button
              onClick={() => navigate(routes.TERMS)}
              className="hover:text-blue-600"
            >
              Terms
            </button>
            <span>•</span>
            <button
              onClick={() => navigate(routes.PRIVACY)}
              className="hover:text-blue-600"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => navigate(routes.HELP)}
              className="hover:text-blue-600"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
