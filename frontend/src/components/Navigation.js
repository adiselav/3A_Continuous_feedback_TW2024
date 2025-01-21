import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
const { user, logout } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
    try {
        await logout();
        navigate('/auth/login');
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

return (
    <nav className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        <div className="flex">
            <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
                FeedbackApp
            </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {user?.role === 'profesor' && (
                <Link
                to="/dashboard"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                Dashboard
                </Link>
            )}
            {user?.role === 'student' && (
                <Link
                to="/activities"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                Activități
                </Link>
            )}
            </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <div className="mr-2">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500">
                            <span className="text-sm font-medium leading-none text-white">
                                {user?.email.charAt(0).toUpperCase()}
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                        <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <svg className="mr-2 -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Deconectare
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </nav>
);
};

export default Navigation;

