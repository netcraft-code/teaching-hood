import api from "../services/api";

/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/

// Register
export const registerUser = (data) => {
  return api.post("/api/register", data);
};

// Login
export const loginUser = (data) => {
  return api.post("/api/login", data);
};

// Logout
export const logoutUser = () => {
  return api.post("/api/logout");
};

/*
|--------------------------------------------------------------------------
| USER PROFILE
|--------------------------------------------------------------------------
*/

// Get logged-in user profile
export const getProfile = () => {
  return api.get("/api/profile");
};

// Update profile
export const updateProfile = (data) => {
  return api.post("/api/profile/update", data);
};

export const updateAvatarBanner = (data) => {
  return api.post("/api/image/update", data);
};

/*
|--------------------------------------------------------------------------
| OTP
|--------------------------------------------------------------------------
*/

// Send OTP
export const sendOTP = (email) => {
  return api.post("/api/send-otp", { email });
};

// Verify OTP
export const verifyOTP = (email, otp) => {
  return api.post("/api/verify-otp", { email, otp });
};

/*
|--------------------------------------------------------------------------
| MASTER DATA
|--------------------------------------------------------------------------
*/

// Subjects
export const getSubjects = () => {
  return api.get("/api/subjects");
};

// Grade Levels
export const getGradeLevels = () => {
  return api.get("/api/gradelevels");
};

// States
export const getStates = () => {
  return api.get("/api/states");
};

// Cities
export const getCities = () => {
  return api.get("/api/city");
};

// View profile by ID
export const viewProfile = (id) => {
  return api.get(`/view-profile/${id}`);
};
