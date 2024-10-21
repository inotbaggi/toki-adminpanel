import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Не забудьте добавить стили
import api from '../../api/axios';

interface ScheduleDay {
    id: number;
    time: string;
}

const GroupManagePage: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [searchParams] = useSearchParams();
    const pageName = searchParams.get("gn");
    const [scheduleDays, setScheduleDays] = useState<ScheduleDay[]>([]);
    const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScheduleDays = async () => {
            const response = await api.get(`/schedule/group/${groupId}`);
            setScheduleDays(response.data);
        };
        fetchScheduleDays();
    }, [groupId]);

    useEffect(() => {
        // Преобразуем расписание в формат дат
        const dates = scheduleDays.map(day => new Date(day.time));
        setHighlightedDates(dates);
    }, [scheduleDays]);

    const onDateChange = (date: Date) => {
        const selectedDay = scheduleDays.find(day => new Date(day.time).toDateString() === date.toDateString());
        if (selectedDay) {
            navigate(`/group/${groupId}/schedule/${selectedDay.id}`);
        }
    };

    const tileClassName = ({ date }: { date: Date }) => {
        return highlightedDates.some(d => d.toDateString() === date.toDateString()) ? 'highlighted' : '';
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Управление группой {pageName}</h1>
            <Calendar
                onClickDay={onDateChange}
                tileClassName={tileClassName}
                className="bg-white rounded shadow"
            />
        </div>
    );
};

export default GroupManagePage;
