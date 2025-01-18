import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
    });
const [error, setError] = useState('');
const navigate = useNavigate();
const { register } = useAuth();
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Attempting registration with data:', {
        email: formData.email,
        role: formData.role,
        password: '****'
    });
    
    try {
        await register(formData.email, formData.password, formData.role);
        console.log('Registration successful, redirecting to login');
        navigate('/auth/login');
    } catch (err) {
        console.error('Registration error details:', {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status
        });
        
        const errorMessage = err.response?.data?.message || err.message || 'Eroare la înregistrare';
        setError(`Eroare: ${errorMessage}`);
    }
};

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Înregistrare cont nou
        </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
            <div className="text-red-500 text-center">{error}</div>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
            <div>
            <label htmlFor="email" className="sr-only">
                Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="password" className="sr-only">
                Parolă
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Parolă"
                value={formData.password}
                onChange={handleChange}
            />
            </div>
            <div>
            <select
                name="role"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="student">Student</option>
                <option value="professor">Profesor</option>
            </select>
            </div>
        </div>

        <div>
            <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Înregistrare
            </button>
        </div>
        </form>

        <div className="text-center">
        <Link to="auth/login" className="text-indigo-600 hover:text-indigo-500">
            Ai deja cont? Conectează-te
        </Link>
        </div>
    </div>
    </div>
);
};

export default Register;

