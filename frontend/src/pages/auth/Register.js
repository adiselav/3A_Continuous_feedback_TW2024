import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log('Attempting registration with:', formData);

        try {
            await register(formData.email, formData.password, formData.role);
            navigate('/auth/login');
        } catch (err) {
            console.error('Registration error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold">Register</h2>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded"
                        >
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-blue-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;