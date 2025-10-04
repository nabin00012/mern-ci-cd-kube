import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response.data;
    },
    (error) => {
        console.error('❌ API Response Error:', error.response?.data || error.message);

        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 404) {
                throw new Error(data.error || 'Resource not found');
            } else if (status === 400) {
                throw new Error(data.error || 'Invalid request');
            } else if (status >= 500) {
                throw new Error('Server error. Please try again later.');
            } else {
                throw new Error(data.error || 'An error occurred');
            }
        } else if (error.request) {
            // Network error
            throw new Error('Network error. Please check your connection.');
        } else {
            // Other error
            throw new Error('An unexpected error occurred');
        }
    }
);

// API functions
export const getMessages = async (params = {}) => {
    return api.get('/api/messages', { params });
};

export const getMessage = async (id) => {
    return api.get(`/api/messages/${id}`);
};

export const createMessage = async (messageData) => {
    return api.post('/api/messages', messageData);
};

export const updateMessage = async (id, messageData) => {
    return api.put(`/api/messages/${id}`, messageData);
};

export const deleteMessage = async (id) => {
    return api.delete(`/api/messages/${id}`);
};

export const getRecentMessages = async (count = 5) => {
    return api.get(`/api/messages/recent/${count}`);
};

export const checkHealth = async () => {
    return api.get('/api/health');
};

// Export the configured axios instance for custom requests
export default api;