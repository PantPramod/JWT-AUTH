import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    // Add other configurations here if needed
});

// Add a request interceptor to include bearer token from localStorage
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(response => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Get the refreshToken from localStorage
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/refresh`, {
                headers: { Authorization: `Bearer ${refreshToken}` }
            })

            const newToken = data.token;
            localStorage.setItem('token', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);

        } catch (err) {
            console.log(err)
        }
    }
    return Promise.reject(error);
});

axiosInstance.defaults = axios.defaults;

export default axiosInstance;
