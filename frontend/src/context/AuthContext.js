import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios-config';

export const AuthContext = createContext({
user: null,
login: async () => {},
register: async () => {},
logout: () => {},
loading: false
});

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    axios.get('/auth/me')
        .then(response => {
        setUser(response.data);
        })
        .catch(() => {
        localStorage.removeItem('token');
        })
        .finally(() => {
        setLoading(false);
        });
    } else {
    setLoading(false);
    }
}, []);

const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
};

const register = async (email, password, role) => {
    const response = await axios.post('/auth/register', { email, password, role });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
};

const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
};

return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
    {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);

