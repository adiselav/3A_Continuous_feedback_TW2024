import React from 'react';
import {
    FaceSmileIcon,
    FaceFrownIcon,
    ExclamationCircleIcon,
    QuestionMarkCircleIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

const ActivityCard = ({ activity, onDelete }) => {
  const { id, title, description, code, date, duration, feedbacks = [] } = activity;

  const feedbackCounts = feedbacks.reduce(
    (counts, feedback) => {
      counts[feedback.reaction] = (counts[feedback.reaction] || 0) + 1;
      return counts;
    },
    { smiley: 0, frowny: 0, surprised: 0, confused: 0 }
  );

  const ReactionIcon = ({ icon: Icon, count }) => (
    <div className="flex items-center space-x-1">
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-800">{count}</span>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
              {code}
            </span>
            <span className="ml-2 text-sm text-gray-400">{date}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Duration: {duration} mins</p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-800"
          aria-label="Delete activity"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <ReactionIcon icon={FaceSmileIcon} count={feedbackCounts.smiley} />
        <ReactionIcon icon={FaceFrownIcon} count={feedbackCounts.frowny} />
        <ReactionIcon icon={ExclamationCircleIcon} count={feedbackCounts.surprised} />
        <ReactionIcon icon={QuestionMarkCircleIcon} count={feedbackCounts.confused} />
      </div>
    </div>
  );
};

export default ActivityCard;
