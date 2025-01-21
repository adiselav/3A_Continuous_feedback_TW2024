import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios-config';

const ProfessorDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        code: '',
        date: new Date().toISOString().split('T')[0],
    });

    const fetchActivities = async () => {
        try {
            const response = await axios.get('/activities/professor');
            console.log('Fetched Activities:', response.data);
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error.response?.data || error.message);
            setError('Failed to fetch activities. Please try again later.');
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newActivityPayload = {
                ...formData,
                code: Math.random().toString(36).substr(2, 8),
                date: new Date().toISOString(),
            };
            const response = await axios.post('/activities/professor', newActivityPayload);
            console.log('Activity Created:', response.data);
            setFormData({
                title: '',
                description: '',
                duration: '',
                code: '',
                date: new Date().toISOString().split('T')[0],
            });
            fetchActivities();
        } catch (error) {
            console.error('Error creating activity:', error.response?.data || error.message);
            setError('Failed to create activity. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Professor Dashboard</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Creare Activitate</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Creează o nouă activitate</h2>
    
    <div className="grid grid-cols-1 gap-4">
        <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titlu
        </label>
        <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        </div>

        <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descriere
        </label>
        <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        </div>

        <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Code
        </label>
        <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Data
            </label>
            <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Durată (minute)
            </label>
            <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        </div>
    </div>

    <div className="mt-4">
        <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
        Creează activitate
        </button>
    </div>
    </form>
      </div>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">{activity.description}</h2>
                <p className="text-gray-500">Durată: {activity.duration} minute</p>
                <button
                    onClick={() => console.log(`Vizualizare feedback pentru ${activity.id}`)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Vezi Feedback
                </button>
            </div>
        ))}
    </div>
    </div>
  );
};

export default ProfessorDashboard;