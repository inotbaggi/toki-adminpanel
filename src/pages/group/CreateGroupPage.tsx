import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/axios';

interface CreateGroupInputs {
    groupName: string;
    facultyId: number;
}

interface Faculty {
    id: number;
    name: string;
}

const CreateGroupPage: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<CreateGroupInputs>();
    const [faculties, setFaculties] = useState<Faculty[]>([]);

    useEffect(() => {
        const fetchFaculties = async () => {
            const response = await api.get('/schedule/faculty/list');
            setFaculties(response.data);
        };
        fetchFaculties();
    }, []);

    const onSubmit = async (data: CreateGroupInputs) => {
        await api.post('/admin/group/create', data);
        reset();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Создание группы</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Название</label>
                    <input
                        {...register('groupName', { required: true })}
                        type="text"
                        className="border rounded w-full p-2"
                        placeholder="Например: КСК-21"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Факультет</label>
                    <select
                        {...register('facultyId', { required: true })}
                        className="border rounded w-full p-2"
                    >
                        {faculties.map((faculty) => (
                            <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Создать
                </button>
            </form>
        </div>
    );
};

export default CreateGroupPage;
