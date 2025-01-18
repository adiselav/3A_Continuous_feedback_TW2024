import React from 'react';
import { 
FaceSmileIcon, 
FaceFrownIcon,
FaceSupriseIcon,
QuestionMarkCircleIcon,
TrashIcon
} from '@heroicons/react/24/outline';

const ActivityCard = ({ activity, onDelete }) => {
const { id, title, description, code, date, duration, feedbacks = [] } = activity;

const feedbackCounts = {
    smiley: feedbacks.filter(f => f.reaction === 'smiley').length,
    frowny: feedbacks.filter(f => f.reaction === 'frowny').length,
    surprised: feedbacks.filter(f => f.reaction === 'surprised').length,
    confused: feedbacks.filter(f => f.reaction === 'confused').length
};

return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
    <div className="flex justify-between items-start">
        <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
            Cod: {code}
            </span>
            <span className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()} • {duration} minute
            </span>
        </div>
        </div>
        
        <button
        onClick={() => onDelete(id)}
        className="text-red-600 hover:text-red-800"
        >
        <TrashIcon className="h-5 w-5" />
        </button>
    </div>

    <div className="mt-4 flex space-x-6">
        <div className="flex items-center">
        <FaceSmileIcon className="h-5 w-5 text-green-500 mr-1" />
        <span>{feedbackCounts.smiley}</span>
        </div>
        <div className="flex items-center">
        <FaceFrownIcon className="h-5 w-5 text-red-500 mr-1" />
        <span>{feedbackCounts.frowny}</span>
        </div>
        <div className="flex items-center">
        <FaceSupriseIcon className="h-5 w-5 text-yellow-500 mr-1" />
        <span>{feedbackCounts.surprised}</span>
        </div>
        <div className="flex items-center">
        <QuestionMarkCircleIcon className="h-5 w-5 text-purple-500 mr-1" />
        <span>{feedbackCounts.confused}</span>
        </div>
    </div>
    </div>
);
};

export default ActivityCard;

