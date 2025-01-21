import React, { useState } from 'react';
import axios from '../../utils/axios-config';
import ActivityCard from '../../components/StudentActivityCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

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

    const handleVote = (activityId, reaction) => {
        setActivities((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === activityId
                    ? { ...activity, hasVoted: true }
                    : activity
            )
        );
        console.log(`Activity ID: ${activityId}, Reaction: ${reaction}`);
        toast.dismiss();
    };
    
    const handleFeedbackClick = (activity) => {
        toast(
            <ActivityCard
                activity={activity}
                onVote={handleVote}
                hasVoted={activity.hasVoted}
            />,
            { autoClose: false }
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ToastContainer />

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
                    <button onClick={addActivity} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Activity
                    </button>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{activity.title}</h2>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.description}</h3>
                        <p className="text-gray-500">Durată: {activity.duration} minute</p>
                        <button 
                            onClick={() => handleFeedbackClick(activity)} 
                            disabled={activity.hasVoted} 
                            tabIndex={activity.hasVoted ? -1 : 0} 
                            className={
                                `mt-4 py-2 px-4 rounded-lg transition duration-150 ease-in-out ${activity.hasVoted? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300'}`
                            }
                        >
                            Acorda Feedback
                        </button>
                    </div>
                    ))
                }
            </div>
        </div>
    );
};

export default StudentDashboard;
