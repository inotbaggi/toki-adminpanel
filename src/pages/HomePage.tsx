import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import api from "../api/axios";

export default function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Управление платформой расписаний</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-200 rounded-lg">
                    <h1 className="text-xl text-center font-bold mb-4">Факультеты</h1>
                    <div className="flex flex-col space-y-2">
                        <Link to="/faculty/list" className="bg-blue-500 text-white text-center px-4 py-2 rounded">Показать
                            все</Link>
                        <Link to="/faculty/create" className="bg-blue-500 text-white text-center px-4 py-2 rounded">Создать
                            факультет</Link>
                        <Link to="/group/create" className="bg-blue-500 text-white text-center px-4 py-2 rounded">Создать
                            группу</Link>
                    </div>
                </div>
                <div className="p-4 bg-gray-200 rounded-lg">
                    <h1 className="text-xl text-center font-bold mb-4">Расписание</h1>
                    <div className="flex flex-col space-y-2">
                        <Link to="/schedule/create" className="bg-blue-500 text-white text-center px-4 py-2 rounded">
                            Распланировать день
                        </Link>
                        <Link to="/time/edit" className="bg-blue-500 text-white text-center px-4 py-2 rounded">
                            Изменить расписание пар
                        </Link>
                    </div>
                </div>
                <div className="p-4 bg-gray-200 rounded-lg">
                    <h1 className="text-xl text-center font-bold mb-4">Преподаватели</h1>
                    <div className="flex flex-col space-y-2">
                        <Link to="/teacher/list" className="bg-blue-500 text-white text-center px-4 py-2 rounded">
                            Показать всех
                        </Link>
                        <Link to="/teacher/create" className="bg-blue-500 text-white text-center px-4 py-2 rounded">
                            Добавить преподавателя
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}