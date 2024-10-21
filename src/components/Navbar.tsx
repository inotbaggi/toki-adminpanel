import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../AuthContext';

const Navbar: React.FC = () => {
    const {logout, token} = useAuth();
    return (
        <nav className="bg-gray-800 p-4 text-white">
            {
                token == null ? <></> : <div className="container mx-auto flex justify-between items-center">
                    <div className={"flex flex-row space-x-4"}>
                        <Link to="/">Факультеты</Link>
                        <Link to="/faculty/create">Создать факультет</Link>
                        <Link to="/group/create">Создать группу</Link>
                        <Link to="/schedule/create">Создать расписание</Link>
                        <Link to="/time/edit">Управление длительностью пар</Link>
                    </div>
                    <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Выйти из системы</button>
                </div>
            }
        </nav>
    );
};

export default Navbar;
