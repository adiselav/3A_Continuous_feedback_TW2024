import React, {} from 'react';
import {
  FaceSmileIcon,
  FaceFrownIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const StudentActivityCard = ({ activity, onVote, hasVoted }) => {
    const { id, title, description, code, date, duration } = activity;
  
    const handleVote = (reaction) => {
      if (!hasVoted) {
        onVote(id, reaction);
      }
    };
  
    const ReactionButton = ({ icon: Icon, reaction }) => (
      <button
        onClick={() => handleVote(reaction)}
        disabled={hasVoted}
        className={`flex items-center space-x-1 px-2 py-1 border rounded-lg shadow-sm transition duration-150 ease-in-out ${
          hasVoted ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-100 hover:bg-blue-200'
        }`}
      >
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-800 capitalize">{reaction}</span>
      </button>
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
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <ReactionButton icon={FaceSmileIcon} reaction="smiley" />
          <ReactionButton icon={FaceFrownIcon} reaction="frowny" />
          <ReactionButton icon={ExclamationCircleIcon} reaction="surprised" />
          <ReactionButton icon={QuestionMarkCircleIcon} reaction="confused" />
        </div>
        {hasVoted && (
          <p className="mt-4 text-green-600 text-sm font-medium">Thank you for your feedback!</p>
        )}
      </div>
    );
  };
  
  export default StudentActivityCard;