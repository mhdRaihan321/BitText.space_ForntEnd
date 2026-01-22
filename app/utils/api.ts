import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007'}/auth/refresh-token`, {
                        refreshToken: localStorage.getItem('refreshToken'),
                    });

                    const { accessToken } = rs.data;
                    localStorage.setItem('accessToken', accessToken);

                    return api(originalConfig);
                } catch (_error) {
                    // Refresh failed, logout
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default api;
