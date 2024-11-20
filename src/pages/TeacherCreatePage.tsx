import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import {TeacherDTO} from "../types";
import {Button} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface TeacherCreatePageInputs {
    firstName: string;
    lastName: string;
    patronymic: string;
    lessons: string[];
}

interface Faculty {
    id: number;
    name: string;
}

const TeacherCreatePage: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<TeacherCreatePageInputs>();
    const [lessons, setLessons] = useState<string[]>(['']);

    const onSubmit = async (data: TeacherCreatePageInputs) => {
        await api.post('/admin/teacher/add', {
            id: -1,
            firstName: data.firstName,
            lastName: data.lastName,
            patronymic: data.patronymic,
            lessons: data.lessons,
        });
        reset();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Добавить преподавателя</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Имя</label>
                    <input
                        {...register('firstName', {required: true})}
                        type="text"
                        className="border rounded w-full p-2"
                    />
                    <label className="block text-gray-700">Фамилия</label>
                    <input
                        {...register('lastName', {required: true})}
                        type="text"
                        className="border rounded w-full p-2"
                    />
                    <label className="block text-gray-700">Отчество</label>
                    <input
                        {...register('patronymic', {required: true})}
                        type="text"
                        className="border rounded w-full p-2"
                    />
                    <div className="flex flex-row space-x-1 mb-2">
                        <label className="block text-gray-700">Преподает</label>
                        <button onClick={() => setLessons([...lessons, ''])} className="text-blue-500">
                            <AddIcon/>
                        </button>
                    </div>
                    {lessons.map((lesson, index) => (
                        <div className="grid grid-cols-6 pb-4">
                            <input
                                className="border rounded w-full mb-2 col-start-1 col-span-5"
                                required={true}
                                onChange={(event) => {
                                    console.log(lessons)
                                    const updatedTeachers = [...lessons];
                                    updatedTeachers[index] = event.target.value;
                                    setLessons(updatedTeachers);
                                }}
                            />
                            <Button className="col-end-7" onClick={(event) => {
                                setLessons(lessons.filter((value, index1) => index1 != index))
                            }}>
                                <RemoveIcon/>
                            </Button>
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default TeacherCreatePage;
