import axios from "axios";

const API_BASE = "https://teaching-hood-backend.netcraftglobal.com";

export const registerUser = (data) => {
    return axios.post(`${API_BASE}/api/register`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const loginUser = (data) => {
    return axios.post(`${API_BASE}/api/login`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getProfile = () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
        return Promise.reject("No token found");
    }

    return axios.get(`${API_BASE}/api/profile`, {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};
