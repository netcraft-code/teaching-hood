import axios from "axios";

const API_BASE_URL = "https://teaching-hood-backend.netcraftglobal.com/api";

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("auth_token");

  return !!token;
};

// Register User
export const registerUser = (data) => {
    const token = localStorage.getItem("auth_token");

    // If already logged in, fetch profile instead
    if (token) {
        return getProfile();
    }

    return axios.post(`${API_BASE_URL}/register`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Login User
export const loginUser = async (payload) => {
    const token = localStorage.getItem("auth_token");

    // If already logged in, fetch profile instead
    if (token) {
        return getProfile();
    }
        
    return await axios.post(`${API_BASE_URL}/login`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Send OTP to email
export const sendOTP = async (email) => {
  return await axios.post(`${API_BASE_URL}/send-otp`, { email }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  return await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Get User Profile
export const getProfile = () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
        return Promise.reject("No token found");
    }

    return axios.get(`${API_BASE_URL}/me`, {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

// Logout User
export const logout = () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
        return Promise.reject("No token found");
    }

    return axios.post(`${API_BASE_URL}/logout`, {}, {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};