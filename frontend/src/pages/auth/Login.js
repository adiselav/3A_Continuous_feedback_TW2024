import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const { login } = useAuth();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await login(email, password);
    navigate('/dashboard');
    } catch (err) {
    setError('Email sau parolă incorecte');
    }
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Autentificare
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Parolă"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
        </div>

        <div>
            <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Conectare
            </button>
        </div>
        </form>

        <div className="text-center">
        <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">
            Nu ai cont? Înregistrează-te
        </Link>
        </div>
    </div>
    </div>
);
};

export default Login;

