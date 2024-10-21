import React, {useEffect, useState} from 'react';
import {useParams, Link, useSearchParams} from 'react-router-dom';
import api from '../../api/axios';

interface Group {
    id: number;
    name: string;
}

const FacultyPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const pageName = searchParams.get("fn")
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await api.get(`/schedule/faculty/${id}/groups`);
            setGroups(response.data);
        };
        fetchGroups();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{pageName}</h1>
            <ul>
                {groups.map((group) => (
                    <li key={group.id} className={"pb-4"}>
                        <div
                            className="bg-green-500 rounded-xl text-white font-bold text-xl cursor-pointer hover:bg-green-400"
                            onClick={() => {
                                window.location.href = `/group/${group.id}/schedule?gn=${group.name}`
                            }}>
                            <p className="p-4">
                                {group.name}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex flex-row space-x-4">
                <div className="text-red-500 hover:text-red-400 cursor-pointer" onClick={async () => {
                    try {
                        const response = await api.delete(`/admin/faculty/delete/${id}`)
                        if (response.status == 200) {
                            window.location.href = "/"
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }}>Удалить факультет
                </div>
            </div>
        </div>
    );
};

export default FacultyPage;
