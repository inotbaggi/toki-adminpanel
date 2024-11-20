import React, {useEffect, useState} from "react";
import api from "../api/axios";
import {TeacherDTO} from "../types";
import TeacherInfoModal from "../components/TeacherInfoModal";

export default function TeacherListPage() {
    const [faculties, setFaculties] = useState<TeacherDTO[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<TeacherDTO>();
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectedTime(undefined);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchFaculties = async () => {
            const response = await api.get('/staff/list');
            setFaculties(response.data);
        };
        fetchFaculties();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Преподаватели</h1>
            <ul>
                {faculties.map((faculty) => (
                    <li key={faculty.id} className={"pb-4"}>
                        <div onClick={() => {
                            setSelectedTime(faculty)
                            openModal()}
                        } className="bg-blue-500 rounded-xl text-white font-bold text-xl cursor-pointer hover:bg-blue-400">
                            <p className="p-4">
                                {faculty.lastName} {faculty.firstName} {faculty.patronymic}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <TeacherInfoModal selected={selectedTime as TeacherDTO} isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
}