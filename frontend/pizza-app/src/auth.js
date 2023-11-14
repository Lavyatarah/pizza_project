import axios from 'axios';
const API_URL = 'http://localhost:5000/api/v1/views';

const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },

};
export const getAuthenticatedEndpoint = async (endpoint) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`${API_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,

            },
        }, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// function to make authenticated POST request with JWT authentication
export const postAuthenticatedEndpoint = async (endpoint, data) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post(`${API_URL}/${endpoint}`, JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// function to make authenticated PUT request with JWT authentication
export const putAuthenticatedEndpoint = async (endpoint, data) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.put(`${API_URL}/${endpoint}`, JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
        }, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// function to make authenticated DELETE request with JWT authentication
export const deleteAuthenticatedEndpoint = async (endpoint) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.delete(`${API_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
        }, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// function to make unauthenticated GET request
export const getEndpoint = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`, {
              headers: {
        'Content-Type': 'application/json',
    },
        } ,config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// function to make unauthenticated POST request
export const postEndpoint = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, JSON.stringify(data), {
              headers: {
        'Content-Type': 'application/json',
    },
        }, config);
        localStorage.setItem('jwtToken', response.jwtToken);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
