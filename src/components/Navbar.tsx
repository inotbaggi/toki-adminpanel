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
                        <Link to="/">Главная страница</Link>
                        <div className={"text-gray-800"} onClick={() => {
                            window.location.href = "/dev/null/panel/kek";
                        }}>
                            dev
                        </div>
                    </div>
                    <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Выйти из системы</button>
                </div>
            }
        </nav>
    );
};

export default Navbar;
