import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios-config';

const StudentDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const fetchActivities = async () => {
        try {
            const response = await axios.get('/activities/student');
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error.response?.data || error.message);
            setError('Failed to fetch activities. Please try again later.');
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const addActivity = async () => {
        try {
            const activityResponse = await axios.get(`/activities/code/${code}`);
            const activity = activityResponse.data;

            setActivities([...activities, activity]);
        } catch (error) {
            console.error('Error adding activity:', error.response?.data || error.message);
            setError('Invalid activity code or failed to add activity.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Student Dashboard</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Add Activity</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter Activity Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <button
                        onClick={addActivity}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Activity
                    </button>
                </div>
            </div>

            <ul>
                {activities.map((activity) => (
                    <li key={activity.id} className="mb-4">
                        <h3 className="text-lg font-bold">{activity.title}</h3>
                        <p>{activity.description}</p>
                        <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
