export const FEEDBACK_TYPES = {
SMILEY: 'smiley',
FROWNY: 'frowny',
SURPRISED: 'surprised',
CONFUSED: 'confused'
};

export const USER_ROLES = {
STUDENT: 'student',
PROFESSOR: 'professor'
};

export const API_ENDPOINTS = {
LOGIN: '/auth/login',
REGISTER: '/auth/register',
ACTIVITIES: '/activities',
FEEDBACKS: '/feedbacks'
};

export const ACTIVITY_STATUS = {
ACTIVE: 'active',
COMPLETED: 'completed',
UPCOMING: 'upcoming'
};

export const FEEDBACK_LABELS = {
[FEEDBACK_TYPES.SMILEY]: 'Am înțeles foarte bine',
[FEEDBACK_TYPES.FROWNY]: 'Nu am înțeles',
[FEEDBACK_TYPES.SURPRISED]: 'Sunt surprins',
[FEEDBACK_TYPES.CONFUSED]: 'Sunt confuz'
};

