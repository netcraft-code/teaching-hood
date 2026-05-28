import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/tp-logo.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import authPageBG from "../assets/images/auth-page-bg.png";
import Header from "../components/Header";

const routes = {
  HOME: "/",
  SIGNIN: "/signin",
  PROFILE: "/profile",
  TERMS: "/term-condition",
  PRIVACY: "/privacy",
  HELP: "/contact-us",
};

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

  // --- OTP State ---
  const [otpSent, setOtpSent] = useState(false); // OTP bheja gaya ya nahi
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);

  const USER_FORM_CONFIG = {
    1: {
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
      title:
        "Register today to post free jobs and receive quality applications",
    },
    3: {
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
        "Register today to post free jobs and receive quality applications",
    },
  };

  const currentConfig = USER_FORM_CONFIG[userType];

  const getTabStyle = (type) => {
    const isActive = userType === type;
    const color = USER_FORM_CONFIG[type].tabColor;
    return {
      borderColor: isActive ? color : "#E5E7EB",
      color: isActive ? color : "#6B7280",
      backgroundColor: isActive ? `${color}0D` : "#FFFFFF",
    };
  };

  // Validation helper
  const validateForm = () => {
    if (!firstName || !email || !phoneNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if ((userType === 2 || userType === 3) && !city) {
      setError("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreeTerms) {
      setError("Please accept terms and conditions to continue");
      return false;
    }
    return true;
  };

  // Step 1: "Create account" click → OTP bhejo
  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setOtpLoading(true);

    try {
      const res = await fetch(
        "https://teaching-hood-backend.netcraftglobal.com/api/send-otp-register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone: phoneNumber }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        setSuccess("OTP sent! Please check your email/phone.");

        // Timer Start
        setCanResendOtp(false);
        setResendTimer(30);

        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setCanResendOtp(true);
              return 0;
            }

            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Step 2: OTP verify + Register
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 4) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phoneNumber,
        city,
        password,
        position,
        password_confirmation: confirmPassword,
        user_type: userType,
        otp, // OTP bhi saath mein
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
          .map(([, values]) => values.join(", "))
          .join("\n");
        setError(errorMessages || "An error occurred");
      }
    } catch (err) {
      let errorMessages = "An error occurred";
      if (err.response?.data?.errors) {
        errorMessages = Object.entries(err.response.data.errors)
          .map(([, values]) => values.join(", "))
          .join("<br />");
      }
      setError(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  // Jab OTP gaya ho to saare fields disable
  const isFormDisabled = otpSent;

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
                {/* <img src={logo} alt="Teachinghood Logo" className="w-[250px]" /> */}
              </button>
            </div>
            <div className="flex items-center justify-center mx-auto">
              <p
                className="text-2xl font-semibold text-center leading-[33px] text-white"
                style={{
                  textShadow: `
                                0px 0px 0px rgba(0, 0, 0, 0.10),
                                3px 3px 3px rgba(0, 0, 0, 0.10),
                                3px 4px 4px rgba(0, 0, 0, 0.10),
                                3px 4px 4px rgba(0, 0, 0, 0.10)
                            `,
                }}
              >
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
                {[1, 2, 3].map((type) => (
                  <button
                    key={type}
                    onClick={() => !isFormDisabled && setUserType(type)}
                    style={getTabStyle(type)}
                    disabled={isFormDisabled}
                    className="flex-1 py-2 px-2 sm:px-4 rounded-lg border-2 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {type === 1
                      ? "Teacher"
                      : type === 2
                        ? "School"
                        : "Recruiter"}
                  </button>
                ))}
              </div>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentConfig.firstNameLabel}
              </label>
              <input
                type="text"
                placeholder={currentConfig.firstNamePlaceholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isFormDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Last Name (Teacher only) */}
            {userType === 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentConfig.lastNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={currentConfig.lastNamePlaceholder}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isFormDisabled}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            )}

            {/* Position Radio (Teacher only) */}
            {userType === 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <div className="flex gap-3">
                  {["Teacher", "Principal", "Vice Principal / Coordinator"].map(
                    (pos) => (
                      <label key={pos} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="position"
                          value={pos}
                          checked={position === pos}
                          onChange={(e) => setPosition(e.target.value)}
                          disabled={isFormDisabled}
                          className="text-blue-600 disabled:cursor-not-allowed"
                        />
                        {pos}
                      </label>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentConfig.mobileLabel}
              </label>
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="text"
                  value="+91"
                  readOnly
                  className="col-span-1 bg-gray-100 cursor-not-allowed text-center w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={currentConfig.mobilePlaceholder}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isFormDisabled}
                  maxLength={10}
                  className="col-span-4 w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email */}
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
                  disabled={isFormDisabled}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* City (School / Recruiter) */}
            {currentConfig.showCity && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentConfig.cityLabel}
                </label>
                <input
                  type="text"
                  placeholder={currentConfig.cityPlaceholder}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isFormDisabled}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            )}

            {/* Password */}
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
                  disabled={isFormDisabled}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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

            {/* Confirm Password */}
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
                  disabled={isFormDisabled}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
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
                disabled={isFormDisabled}
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a
                  onClick={() => navigate(routes.TERMS)}
                  href="#"
                  className="text-blue-500 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                {/* and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a> */}
              </label>
            </div>

            {/* ── OTP Field (OTP bhejne ke baad dikhega) ── */}
            {otpSent && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="_ _ _ _"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg text-center text-2xl tracking-[1rem] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  OTP sent to your email/phone.{" "}
                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                      setSuccess("");
                      setError("");
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Edit details?
                  </button>
                </p>

                <div className="flex items-center justify-center mt-3">
                  {!canResendOtp ? (
                    <p className="text-sm text-gray-500">
                      Resend OTP in{" "}
                      <span className="font-semibold text-blue-600">
                        {resendTimer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="text-sm font-semibold text-blue-600 hover:underline disabled:opacity-50"
                    >
                      {otpLoading ? "Resending..." : "Resend OTP"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Error / Success Messages */}
            {error && (
              <p
                className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded"
                dangerouslySetInnerHTML={{ __html: error }}
              />
            )}
            {success && (
              <p className="mb-3 text-sm text-green-600 bg-green-50 p-2 rounded">
                {success}
              </p>
            )}

            {/* Button: OTP nahi gaya → "Create account", gaya → "Verify & Sign Up" */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={otpLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 disabled:opacity-50"
              >
                {otpLoading ? "Sending OTP..." : "Create account"}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || otp.length !== 4}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Verify & Sign Up"}
              </button>
            )}
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
            {/* <button
              onClick={() => navigate(routes.PRIVACY)}
              className="hover:text-blue-600"
            >
              Privacy
            </button>
            <span>•</span> */}
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
