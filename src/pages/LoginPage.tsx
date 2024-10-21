import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext';
import api from "../api/axios";

interface LoginFormInputs {
    token: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {setToken } = useAuth();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await api.post('/auth/login', data.token, { headers: {'Content-Type': 'text/plain'} });
            if (response.data == true) {
                setToken(data.token);
            } else {
                setErrorMessage("Неизвестный ключ доступа...")
            }
        } catch (e) {
            setErrorMessage((e as Error).message)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">Введите ключ доступа</h2>
                <h2 className="mb-4">Без ключа нельзя вносить изменения в системе расписания</h2>
                {errorMessage == null ? <></> : <h2 className="mb-4 text-white bg-red-500 rounded">
                    <div className={"p-2"}>
                        Ошибка: {errorMessage}
                    </div>
                </h2>}
                <input
                    {...register('token', {required: true})}
                    type="text"
                    placeholder="Ключ доступа"
                    className="border rounded w-full p-2 mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Войти в систему
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
