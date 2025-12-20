import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

// Router State Management
const routes = {
  HOME: '/',
  SIGNIN: '/signin',
};

// Sign Up Component
const SignUpPage = () => {
  const [userType, setUserType] = useState(1);
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const USER_FORM_CONFIG = {
    1: { // Teacher
      nameLabel: "Name",
      namePlaceholder: "Enter your full name",
      mobileLabel: "Mobile Number",
      mobilePlaceholder: "+91 9876543210",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      showCity: false,
      showSchool: false,
      tabColor: "#28C76F",
    },

    2: { // School
      schoolLabel: "School Name",
      schoolPlaceholder: "Enter school name",
      nameLabel: "HR Name",
      namePlaceholder: "Enter HR name",
      mobileLabel: "Office Mobile Number",
      mobilePlaceholder: "+91 9876543210",
      emailLabel: "HR Email",
      emailPlaceholder: "hr@school.com",
      cityLabel: "City",
      cityPlaceholder: "Enter city name",
      showCity: true,
      showSchool: true,
      tabColor: "#FF5E57",
    },

    3: { // Recruiter
      nameLabel: "Company Name",
      namePlaceholder: "Enter company name",
      mobileLabel: "Company Mobile Number",
      mobilePlaceholder: "+91 9876543210",
      emailLabel: "Email Address",
      emailPlaceholder: "you@company.com",
      cityLabel: "City",
      cityPlaceholder: "Enter city name",
      showCity: true,
      showSchool: false,
      tabColor: "#FFC107",
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
    if (
      (!fullName || !email || !phoneNumber || !password || !confirmPassword)
      && (userType == 2 || !schoolName || !city)
      && (userType == 3 || !city)
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept terms & conditions");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: fullName,
        email: email,
        phone_number: phoneNumber,
        city: city,
        school_name: schoolName,
        password: password,
        password_confirmation: confirmPassword,
        user_type: userType, // teacher / school / recruiter
      };

      const res = await registerUser(payload);

      if (res.data?.errors) {
        const errorMessages = Object.entries(res.data.errors)
          .map(([key, values]) => `${key}: ${values.join(", ")}`)
          .join("\n");

        setError(errorMessages || "An error occurred");
      }

      if (! res.data?.errors) {
        setSuccess("Account created & Login successfully 🎉 Redirecting to Profile...");

        setTimeout(() => {
          if (res.data?.token) {
            localStorage.setItem("auth_token", res.data.token);
          }

          navigate(routes.SIGNIN);
        }, 1500);
      }
    } catch (err) {
      let errorMessages = "An error occurred";

      if (err.response?.data?.errors) {
        errorMessages = Object.entries(err.response.data.errors)
          .map(([key, values]) => `${key}: ${values.join(", ")}`)
          .join("\n");
      }

      setError(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <button onClick={() => navigate(routes.HOME)} className="flex items-center justify-center space-x-2 mb-4">
              <img
                src={logo}
                alt="Teachinghood Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl md:text-2xl font-bold text-blue-600">Teachinghood</span>
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Join Teachinghood</h1>
          <p className="text-gray-600">Connect with schools across India</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
            <div className="flex gap-2">
              <button
                onClick={() => setUserType(1)}
                style={getTabStyle(1)}
                className="flex-1 py-2 px-4 rounded-lg border-2 transition font-semibold"
              >
                Teacher
              </button>

              <button
                onClick={() => setUserType(2)}
                style={getTabStyle(2)}
                className="flex-1 py-2 px-4 rounded-lg border-2 transition font-semibold"
              >
                School
              </button>

              <button
                onClick={() => setUserType(3)}
                style={getTabStyle(3)}
                className="flex-1 py-2 px-4 rounded-lg border-2 transition font-semibold"
              >
                Recruiter
              </button>
            </div>
          </div>

          {/* School Name Input */}
          {currentConfig.showSchool && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentConfig.schoolLabel}
                </label>
                <input
                  type="text"
                  placeholder={currentConfig.schoolPlaceholder}
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </>
          )}

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentConfig.nameLabel}
            </label>
            <input
              type="text"
              placeholder={currentConfig.namePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
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

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentConfig.mobileLabel}
            </label>
            <input
              type="text"
              placeholder={currentConfig.mobilePlaceholder}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentConfig.emailLabel}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder={currentConfig.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
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
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {error && (
            <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>


          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate(routes.SIGNIN)} className="text-blue-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center space-x-4 mt-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-700">Help</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;