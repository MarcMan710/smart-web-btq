import React, { useState } from 'react';
import hafalanService from '../services/hafalanService';

const AddHafalanPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        levelRequired: '',
        description: ''
    });

    const { addHafalan } = hafalanService();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addHafalan(formData);
            alert('Hafalan added successfully!');
            setFormData({ title: '', content: '', levelRequired: '', description: '' }); // Reset form
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Add New Hafalan</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Content"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        name="levelRequired"
                        value={formData.levelRequired}
                        onChange={handleChange}
                        placeholder="Level Required"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Add Hafalan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddHafalanPage;