import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
const { user, logout } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
    try {
    await logout();
    navigate('/login');
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
                <span className="text-sm text-gray-700">{user?.email}</span>
                <button
                onClick={handleLogout}
                className="bg-white px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
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

