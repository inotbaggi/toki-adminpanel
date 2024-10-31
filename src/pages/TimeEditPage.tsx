import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import AddLessonTimeModal from "../components/LessonTimeModal";
import AddLessonModal from "../components/LessonModal";

export interface LessonTime {
    id: number;
    name: string;
    times: string[];
}

export default function TimeEditPage() {
    const [lessonTimes, setLessonTimes] = useState<LessonTime[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchLessonTimes = async () => {
            try {
                const response = await api.get('/schedule/times');
                setLessonTimes(response.data);
            } catch (error) {
                setErrorMessage('Не удалось загрузить временные интервалы.');
            }
        };
        fetchLessonTimes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Редактирование интервалов</h1>

            <div className="mb-6">
                <button className="text-blue-500 pt-4"
                        onClick={() => openModal()}>
                    Добавить интервал
                </button>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>

            <div>
                <h2 className="text-xl mb-2">Существующие интервалы:</h2>
                <ul className="list-disc pl-5">
                    {lessonTimes.map((lessonTime) => (
                        <li key={lessonTime.id} className="mb-2">
                            <div>
                                #{lessonTime.id} {lessonTime.name}
                                {lessonTime.times.map((value, index) =>
                                    <div>- {index + 1} пара: {value}</div>
                                )}
                            </div>
                            <div
                                className="text-red-500 cursor-pointer hover:text-red-400"
                                onClick={async () => {
                                    try {
                                        const response = await api.delete(`/admin/times/delete/${lessonTime.id}`)
                                        if (response.status == 200) {
                                            window.location.reload()
                                        } else {
                                            setErrorMessage(`Ошибка при удалении интервала: ${response.status} (${response.statusText})`)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }}
                            >
                                Удалить интервал
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <AddLessonTimeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddLessonTime={(data) => {
                    console.log(data)
                    api.post('/admin/times/create', {
                        name: (data as LessonTime).name,
                        times: (data as LessonTime).times
                    }).then(value => {
                        alert(value.status)
                        window.location.reload()
                    })
                }}
            />
        </div>
    );
}
