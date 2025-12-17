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
  const [userType, setUserType] = useState('1');
  const [fullName, setFullName] = useState('');
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

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
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
        password: password,
        password_confirmation: confirmPassword,
        user_type: userType, // teacher / school / recruiter
      };

      const res = await registerUser(payload);

      setSuccess("Account created & Login successfully 🎉 Redirecting to Profile...");

      setTimeout(() => {
        if (res.data?.token) {
          localStorage.setItem("auth_token", res.data.token);
        }

        navigate(routes.SIGNIN);
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Try again."
      );
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
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition ${
                  userType === 1 
                    ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => setUserType(2)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition ${
                  userType === 2 
                    ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                School
              </button>
              <button
                onClick={() => setUserType(3)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition ${
                  userType === 3 
                    ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                Recruiter
              </button>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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