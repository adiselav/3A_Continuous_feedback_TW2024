import React, { useState } from 'react';
import axios from '../utils/axios-config';

const CreateActivityForm = ({ onActivityCreated }) => {
const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    date: new Date().toISOString().split('T')[0]
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('/activities', formData);
    setFormData({
        title: '',
        description: '',
        duration: '',
        date: new Date().toISOString().split('T')[0]
    });
    onActivityCreated(response.data);
    } catch (error) {
    console.error('Eroare la crearea activității:', error);
    }
};

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

return (
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
);
};

export default CreateActivityForm;

