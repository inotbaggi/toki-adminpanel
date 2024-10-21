import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from "../api/axios";
import Modal from 'react-modal';
import {FacultyDTO, GroupDTO} from "../types";
import AddLessonModal from "../components/LessonModal";
import {LessonTime} from "./TimeEditPage";

// Интерфейс для уроков
export interface Lesson {
    id: number;
    name: string;
    teachers: string[];
    cabinets: string[];
}

// Интерфейс для группы с уроками
export interface GroupPart {
    id: number;
    name: string;
    lessons: Lesson[];  // У каждой группы будет свой массив уроков
}

// Интерфейс для факультета с группами
export interface FacultyPart {
    id: number;
    name: string;
    groups: GroupPart[];  // У каждого факультета будет свой массив групп
}


export default function ScheduleCreatePage() {
    const [schedule, setSchedule] = useState<FacultyPart[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [faculties, setFaculties] = useState<FacultyPart[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null)
    const [timePeriods, setTimePeriods] = useState<LessonTime[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentGroupIndex, setCurrentGroupIndex] = useState<number | null>(null);

    const openModalForGroup = (groupIndex: number) => {
        setCurrentGroupIndex(groupIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentGroupIndex(null);
    };

    const handleAddLesson = (lesson: Lesson) => {
        if (currentGroupIndex !== null) {
            setSchedule((prevSchedule) => {
                const updatedSchedule = [...prevSchedule];
                const group = updatedSchedule.flatMap(faculty => faculty.groups)[currentGroupIndex];
                lesson.id = group.lessons.length + 1
                group.lessons.push(lesson);
                closeModal()
                return updatedSchedule;
            });
        }
    };

    // Fetch faculties when the page loads
    useEffect(() => {
        const fetchFaculties = async () => {
            const response = await api.get('/schedule/faculty/list');
            setFaculties(response.data);
        };

        fetchFaculties();
    }, []);

    useEffect(() => {
        const fetchPeriods = async () => {
            const response = await api.get('/schedule/times');
            setTimePeriods(response.data);
        };

        fetchPeriods();
    }, []);

    // Handle adding new faculty to schedule
    const addFacultyToSchedule = (facultyId: number) => {
        if (schedule.some(faculty => faculty.id === facultyId)) {
            alert('Этот факультет уже добавлен.');
            return;
        }

        // Загружаем группы по ID факультета
        api.get(`/schedule/faculty/${facultyId}/groups`).then(response => {
            const groupDTOs: GroupDTO[] = response.data || []; // Получаем группы как GroupDTO

            // Преобразуем GroupDTO в GroupPart с пустым списком уроков
            const groups: GroupPart[] = groupDTOs.map((group) => ({
                id: group.id,
                name: group.name,
                lessons: []  // Инициализируем пустой массив уроков
            }));

            const faculty = faculties.find(faculty => faculty.id === facultyId);  // Находим факультет по id
            if (!faculty) return;

            const newFaculty: FacultyPart = {
                id: faculty.id,
                name: faculty.name,
                groups: groups  // Добавляем группы к факультету
            };

            setSchedule(prev => [...prev, newFaculty]);  // Обновляем расписание
        }).catch((error) => {
            console.error('Ошибка при загрузке групп:', error);
        });
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Создание расписания</h1>

            {/* DatePicker для выбора даты */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Выберите дату:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Выбрать расписание звонков:</label>
                <select
                    className="p-2 border rounded w-full"
                    value={selectedTime ?? ''}
                    onChange={(e) => setSelectedTime(Number(e.target.value))}
                >
                    <option value="" disabled>Выберите расписание звонков</option>
                    {timePeriods.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                            [{faculty.id}] {faculty.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Добавление факультетов */}
            <div className="mb-8">
                <label className="block text-gray-700 mb-2">Добавить факультет:</label>
                <select
                    className="p-2 border rounded w-full"
                    value={selectedFaculty ?? ''}
                    onChange={(e) => setSelectedFaculty(Number(e.target.value))}
                >
                    <option value="" disabled>Выберите факультет</option>
                    {faculties.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                            {faculty.name}
                        </option>
                    ))}
                </select>
                <button
                    className="mt-2 bg-blue-500 text-white p-2 rounded"
                    onClick={() => selectedFaculty !== null && addFacultyToSchedule(selectedFaculty)}
                >
                    Добавить факультет
                </button>
            </div>

            {/* Список добавленных факультетов и групп */}
            {schedule.map((faculty, facultyIndex) => (
                <div key={faculty.id} className="border p-4 mb-4 bg-white shadow-md">
                    <h2 className="text-xl font-bold">{faculty.name}</h2>
                    {faculty.groups.length > 0 ? (
                        faculty.groups.map((group, groupIndex) => (
                            <div key={group.id} className="mb-4 bg-gray-200">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{group.name}</h3>
                                    <ul className="flex flex-col space-y-2">
                                        {group.lessons.map((lesson, index) => (
                                            <div className="bg-gray-300 p-4 rounded-xl flex flex-row space-x-4">
                                                <div>
                                                    №{lesson.id}
                                                </div>
                                                <div>
                                                    {lesson.name}
                                                </div>
                                                <div className="flex flex-col">
                                                    {lesson.teachers.map((tea, index1) => (
                                                        <div>
                                                            {tea} в {lesson.cabinets.at(index1)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                    <button className="text-blue-500 pt-4"
                                            onClick={() => openModalForGroup(groupIndex)}>
                                        Добавить пару
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Нет групп для этого факультета.</p>
                    )}
                </div>
            ))}
            <AddLessonModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddLesson={handleAddLesson}
            />
            <button onClick={async () => {
                const data = {
                    date: selectedDate,
                    intervalId: selectedTime,
                    faculties: schedule
                }
                console.log(data)
                try {
                    const response = await api.post(`/admin/schedule/create`, data)
                    if (response.status == 200) {
                        window.location.href = "/"
                    }
                } catch (e) {
                    console.log(e)
                }
            }} className="bg-blue-500 text-white p-2 rounded">
                Опубликовать расписание
            </button>
        </div>
    );
}
