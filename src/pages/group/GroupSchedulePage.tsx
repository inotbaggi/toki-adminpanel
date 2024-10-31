import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import {ScheduleDayDTO} from "../../types";

const GroupSchedulePage: React.FC = () => {
    const { groupId, dayId } = useParams<{ groupId: string, dayId: string }>();
    const [scheduleDay, setScheduleDay] = useState<ScheduleDayDTO | null>(null);

    useEffect(() => {
        const fetchScheduleForDay = async () => {
            const response = await api.get(`/schedule/day/${dayId}`);
            setScheduleDay(response.data);
        };
        fetchScheduleForDay();
    }, [groupId, dayId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Расписание</h1>
            {scheduleDay ? (
                <div className="bg-white shadow p-4 rounded">
                    {scheduleDay.lessons.map((lesson) => (
                        <div className="mb-4 p-2 border-b">
                            <h2 className="text-lg font-bold">{lesson.lessonName}</h2>
                            <p>Преподаватели: {lesson.teachers.join(', ')}</p>
                            <p>Кабинеты: {lesson.cabinets.join(', ')}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default GroupSchedulePage;
