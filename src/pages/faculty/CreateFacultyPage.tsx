import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/axios';

interface CreateFacultyInputs {
    facultyName: string;
}

const CreateFacultyPage: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<CreateFacultyInputs>();

    const onSubmit = async (data: CreateFacultyInputs) => {
        await api.post('/admin/faculty/create', data);
        reset();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Создать факультет</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Название</label>
                    <input
                        {...register('facultyName', { required: true })}
                        type="text"
                        className="border rounded w-full p-2"
                        placeholder="Введите название факультета"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Создать
                </button>
            </form>
        </div>
    );
};

export default CreateFacultyPage;
