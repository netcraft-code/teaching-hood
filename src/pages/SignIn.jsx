import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

// Router State Management
const routes = {
  HOME: '/',
  SIGNUP: '/signup'
};

// Sign In Component
const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

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
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your Teachinghood account</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember Me</label>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4">
            Sign in
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}

            <button onClick={() => navigate(routes.SIGNUP)} className="text-blue-600 font-semibold hover:underline">
              Sign up
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

export default SignInPage;