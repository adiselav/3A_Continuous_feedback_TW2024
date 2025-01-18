import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfessorDashboard = () => {
const [activities, setActivities] = useState([]);
const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    duration: 60
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
    fetchActivities();
}, []);

const fetchActivities = async () => {
    try {
    const response = await axios.get('/activities');
    setActivities(response.data);
    setLoading(false);
    } catch (err) {
    setError('Eroare la încărcarea activităților');
    setLoading(false);
    }
};

const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('/activities', newActivity);
    setActivities([...activities, response.data]);
    setNewActivity({
        title: '',
        description: '',
        duration: 60
    });
    } catch (err) {
    setError('Eroare la crearea activității');
    }
};

const handleDeleteActivity = async (id) => {
    try {
    await axios.delete(`/activities/${id}`);
    setActivities(activities.filter(activity => activity.id !== id));
    } catch (err) {
    setError('Eroare la ștergerea activității');
    }
};

if (loading) {
    return <div className="text-center mt-8">Se încarcă...</div>;
}

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Dashboard Profesor
    </h1>

    {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
        </div>
    )}

    <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
        Creare Activitate Nouă
        </h2>
        <form onSubmit={handleCreateActivity} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Titlu
            </label>
            <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newActivity.title}
            onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">
            Descriere
        </label>
        <textarea
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newActivity.description}
            onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">
            Durată (minute)
        </label>
        <input
            type="number"
            required
            min={15}
            max={180}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newActivity.duration}
            onChange={(e) => setNewActivity({ ...newActivity, duration: parseInt(e.target.value) })}
        />
        </div>
        <div>
        <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            Creează Activitate
        </button>
        </div>
    </form>
    </div>

    <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">
        Activitățile Mele
    </h2>
    <div className="space-y-4">
        {activities.length === 0 ? (
        <p className="text-gray-500">Nu există activități create încă.</p>
        ) : (
        activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
                <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                <p className="text-sm text-gray-500 mt-1">Durată: {activity.duration} minute</p>
            </div>
            <button
                onClick={() => handleDeleteActivity(activity.id)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Șterge
            </button>
            </div>
        ))
        )}
    </div>
</div>
</div>
);
};

export default ProfessorDashboard;
