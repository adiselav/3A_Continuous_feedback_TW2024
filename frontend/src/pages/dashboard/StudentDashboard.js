import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios-config';

const StudentDashboard = () => {
const [activities, setActivities] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchActivities = async () => {
    try {
        const response = await axios.get('/activities');
        setActivities(response.data);
        setLoading(false);
    } catch (err) {
        console.error('Error fetching activities:', err);
        setLoading(false);
    }
    };

    fetchActivities();
}, []);

const submitFeedback = async (activityId, reaction) => {
    try {
    await axios.post('/feedbacks', {
        activityId,
        reaction
    });
    // Actualizează lista de activități pentru a reflecta feedback-ul trimis
    const updatedActivities = activities.map(activity =>
        activity.id === activityId
        ? { ...activity, hasSubmittedFeedback: true }
        : activity
    );
    setActivities(updatedActivities);
    } catch (err) {
    console.error('Error submitting feedback:', err);
    }
};

if (loading) {
    return <div className="text-center mt-8">Se încarcă...</div>;
}

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Dashboard Student
    </h1>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
        <div
            key={activity.id}
            className="bg-white shadow rounded-lg p-6"
        >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activity.title}
            </h3>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            
            {!activity.hasSubmittedFeedback ? (
            <div className="flex justify-center space-x-4">
                <button
                onClick={() => submitFeedback(activity.id, 'smiley')}
                className="p-2 hover:bg-gray-100 rounded-full"
                >
                😊
                </button>
                <button
                onClick={() => submitFeedback(activity.id, 'frowny')}
                className="p-2 hover:bg-gray-100 rounded-full"
                >
                😞
                </button>
                <button
                onClick={() => submitFeedback(activity.id, 'confused')}
                className="p-2 hover:bg-gray-100 rounded-full"
                >
                😕
                </button>
                <button
                onClick={() => submitFeedback(activity.id, 'surprised')}
                className="p-2 hover:bg-gray-100 rounded-full"
                >
                😲
                </button>
            </div>
            ) : (
            <p className="text-center text-green-600">
                Feedback trimis
            </p>
            )}
        </div>
        ))}
    </div>
    
    {activities.length === 0 && (
        <p className="text-center text-gray-600">
        Nu există activități disponibile momentan.
        </p>
    )}
    </div>
);
};

export default StudentDashboard;

