import React, { useState } from "react";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser, sendOTP, verifyOTP } from "../api/auth"; // ✅ Import from auth.js
import logo from "../assets/images/tp-logo.png";
import authPageBG from "../assets/images/auth-page-bg.png";

const routes = {
  HOME: "/",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  HELP: "/help",
};

const SignInPage = () => {
  const OTP_VALIDITY = 600; // 10 minutes in seconds
  const RESEND_DELAY = 120; // 2 minutes in seconds

  const navigate = useNavigate();

  // Step management
  const [step, setStep] = useState("choice"); // 'choice', 'password', 'otp-input', 'otp-verify'

  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [otpTimer, setOtpTimer] = useState(OTP_VALIDITY);
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Password Login - using auth.js
  const handlePasswordLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const payload = { email, password, remember_me: rememberMe };
      const res = await loginUser(payload); // ✅ Using auth.js

      if (res.data.status) {
        localStorage.setItem("auth_token", res.data.data.token);
        navigate(routes.PROFILE);
      } else {
        setError(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Send OTP - using auth.js
  const handleSendOTP = async () => {
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await sendOTP(email); // ✅ Using auth.js

      if (res.data.status) {
        setStep("otp-verify");

        // reset timers
        setOtpTimer(OTP_VALIDITY);
        setResendTimer(RESEND_DELAY);
      } else {
        setError(res.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (step !== "otp-verify") return;

    const interval = setInterval(() => {
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResendOTP = async () => {
    setOtp(["", "", "", ""]);
    setOtpTimer(OTP_VALIDITY);
    setResendTimer(RESEND_DELAY);

    await handleSendOTP();
  };

  // ✅ Verify OTP - using auth.js
  const handleVerifyOTP = async () => {
    setError("");

    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOTP(email, otpCode); // ✅ Using auth.js

      if (res.data.status) {
        localStorage.setItem("auth_token", res.data.data.token);
        navigate(routes.PROFILE);
      } else {
        setError(res.data?.message || "Invalid OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
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
              Log In
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
          {/* Step 1: Choose Login Method */}
          {step === "choice" && (
            <>
              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (!email) {
                      setError("Please enter your email");
                      return;
                    }
                    setError("");
                    setStep("password");
                  }}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition flex items-center justify-center space-x-2"
                >
                  <Lock size={20} />
                  <span>Continue with Password</span>
                </button>

                <button
                  onClick={() => {
                    if (!email) {
                      setError("Please enter your email");
                      return;
                    }
                    setError("");
                    setStep("otp-input");
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Continue with OTP</span>
                </button>
              </div>
            </>
          )}

          {/* Step 2: Password Login */}
          {step === "password" && (
            <>
              <button
                onClick={() => setStep("choice")}
                className="text-sm text-blue-600 hover:underline mb-4 flex items-center"
              >
                ← Back
              </button>

              {/* Email (Read-only) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !loading) {
                        handlePasswordLogin();
                      }
                    }}
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
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* Sign In Button */}
              <button
                onClick={handlePasswordLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </>
          )}

          {/* Step 3: Enter Email for OTP */}
          {step === "otp-input" && (
            <>
              <button
                onClick={() => setStep("choice")}
                className="text-sm text-blue-600 hover:underline mb-4 flex items-center"
              >
                ← Back
              </button>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  We'll send you a 4-digit verification code via email
                </p>
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* Send OTP Button */}
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {/* Step 4: Verify OTP */}
          {step === "otp-verify" && (
            <>
              <button
                onClick={() => {
                  setStep("otp-input");
                  setOtp(["", "", "", ""]);
                }}
                className="text-sm text-blue-600 hover:underline mb-4 flex items-center"
              >
                ← Change email
              </button>

              {/* OTP Input Boxes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter 4-digit code:-
                  <label className="text-center text-xs text-gray-500 mt-1 mb-3">
                    Expires in{" "}
                    <span className="font-semibold">
                      {formatTime(otpTimer)}
                    </span>
                  </label>
                </label>

                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="text-center w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't receive the code?
                  </p>

                  <button
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || loading}
                    className={`text-sm font-semibold ${
                      resendTimer > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:underline"
                    }`}
                  >
                    {resendTimer > 0
                      ? `Resend OTP in ${formatTime(resendTimer)}`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* Verify Button */}
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
            </>
          )}
        </div>

        {/* Security Notice */}
        {(step === "otp-verify" || step === "otp-input") && (
          <>
            <div className=" mt-6 w-full max-w-[448px] min-h-[54px] bg-[#F1F4FF] border border-t border-t-[#DBEAFE] border-x-transparent border-b-transparent rounded-[14px] px-[17px] py-[12px] flex items-center justify-center opacity-100">
              <p className=" text-[14px] leading-[20px] font-normal font-[Arimo] text-[#364153] text-center">
                🔒 Secure Login: Your OTP is valid for 10 minutes
              </p>
            </div>
          </>
        )}

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate(routes.SIGNUP)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-12 text-sm text-gray-600">
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
  );
};

export default SignInPage;
