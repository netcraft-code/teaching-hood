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
export const getCities = (params = {}) => {
  return api.get("/api/city",  { params });
};

// View profile by ID
export const viewProfile = (id) => {
  return api.get(`/api/view-profile/${id}`);
};

export const getMaxCitiesJobs = () => {
  return api.get("/api/city/jobs");
};

export const getMaxSubjectsJobs = () => {
  return api.get("/api/subjects/jobs");
};

export const getMaxGradeJobs = () => {
  return api.get("/api/grade/jobs");
};

export const sendMessage = (data) => {
  return api.post("/api/send-message", data);
}

export const postJob = (data) => {
  return api.post("/api/job-posts", data);
}

export const getJobs = (params = {}) => {
  return api.get("/api/job-posts",  { params });
}

export const likeUnlikeJobApi = (data) => {
  return api.post("/api/like", data);
}

export const applyJobApi = (jobId) => {
  return api.post(`api/job-post/apply/${jobId}`);
};

export const getVacanies = (page = 1) => {
  return api.get(`api/job-post/current/vacanies?page=${page}`);
}

export const getAppliedJobs = (params = {}) => {
  return api.get("api/job-post/applied", { params });
}

export const closeJob = (jobId) => {
  return api.post(`api/job-post/close/${jobId}`);
};

export const updateJob = (jobId, payload) => {
  return api.put(`/api/job-posts/${jobId}`, payload);
};

export const viewJob = (id) => {
  return api.get(`/api/job-posts/${id}`);
};