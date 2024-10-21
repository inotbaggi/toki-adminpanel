import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

interface Faculty {
    id: number;
    name: string;
}

const FacultyListPage: React.FC = () => {
    const [faculties, setFaculties] = useState<Faculty[]>([]);

    useEffect(() => {
        const fetchFaculties = async () => {
            const response = await api.get('/schedule/faculty/list');
            setFaculties(response.data);
        };
        fetchFaculties();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Факультеты</h1>
            <ul>
                {faculties.map((faculty) => (
                    <li key={faculty.id} className={"pb-4"}>
                        <div className="bg-blue-500 rounded-xl text-white font-bold text-xl cursor-pointer hover:bg-blue-400" onClick={() => {
                            window.location.href = `/faculty/${faculty.id}/groups?fn=${faculty.name}`
                        }}>
                            <p className="p-4">
                                {faculty.name}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FacultyListPage;
