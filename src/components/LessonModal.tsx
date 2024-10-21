import React, {useState} from "react";
import Modal from "react-modal";
import {Lesson} from "../pages/ScheduleCreatePage";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {cabinetsList, itemsList, teachersList} from "../types";

interface AddLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddLesson: (lesson: Lesson) => void;
}

export default function AddLessonModal({isOpen, onClose, onAddLesson}: AddLessonModalProps) {
    const [lessonName, setLessonName] = useState('');
    const [teachers, setTeachers] = useState<string[]>(['']);
    const [cabinets, setCabinets] = useState<string[]>(['']);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-overlay">
            <div
                className="bg-white rounded-lg shadow-lg p-4 max-w-md sm:max-w-full mx-auto mt-20 relative"> {/* Выравнивание по центру */}
                <h2 className="text-xl font-bold mb-4">Добавление пары</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Название предмета:</label>
                    <Autocomplete
                        renderInput={(params) => <TextField  {...params} label="Предмет..."/>}
                        options={itemsList}
                        freeSolo
                        disableClearable
                        onChange={(event: any, newValue: string | null) => {
                            setLessonName(newValue!!)
                        }}></Autocomplete>
                </div>
                <div className="mb-4">
                    <div className="flex flex-row space-x-1 mb-2">
                        <label className="block text-gray-700">Преподаватели:</label>
                        <button onClick={() => setTeachers([...teachers, ''])} className="text-blue-500">
                            <AddIcon/>
                        </button>
                    </div>
                    {teachers.map((teacher, index) => (
                        <div className="grid grid-cols-6">
                            <Autocomplete
                                renderInput={(params) => <TextField  {...params} label="Преподаватель..."/>}
                                options={teachersList}
                                freeSolo
                                disableClearable
                                className="mb-2 col-start-1 col-span-5"
                                onChange={(event: any, newValue: string | null) => {
                                    const updatedTeachers = [...teachers];
                                    updatedTeachers[index] = newValue!!;
                                    setTeachers(updatedTeachers);
                                }}></Autocomplete>
                            <Button className="col-end-7" onClick={(event) => {
                                setTeachers(teachers.filter((value, index1) => index1 != index))
                            }}>
                                <RemoveIcon/>
                            </Button>
                        </div>
                    ))}
                    <div className="mb-4">
                        <div className="flex flex-row space-x-1 mb-2">
                            <label className="block text-gray-700">Кабинеты:</label>
                            <button onClick={() => setCabinets([...cabinets, ''])} className="text-blue-500">
                                <AddIcon/>
                            </button>
                        </div>
                        {cabinets.map((cabinet, index) => (
                            <div className="grid grid-cols-6">
                                <Autocomplete
                                    renderInput={(params) => <TextField  {...params} label="Кабинет..."/>}
                                    options={cabinetsList}
                                    freeSolo
                                    disableClearable
                                    className="mb-2 col-start-1 col-span-5"
                                    onChange={(event: any, newValue: string | null) => {
                                        const updatedCabinets = [...cabinets];
                                        updatedCabinets[index] = newValue!!;
                                        setCabinets(updatedCabinets);
                                    }}></Autocomplete>
                                <Button className="col-end-7" onClick={(event) => {
                                    setCabinets(cabinets.filter((value, index1) => index1 != index))
                                }}>
                                    <RemoveIcon/>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={() => {
                            if (lessonName == ''
                            || teachers.length == 0
                            || cabinets.length == 0
                            || teachers.filter(value => value == '').length != 0
                            ) return
                            onAddLesson({id: Date.now(), name: lessonName, teachers: teachers, cabinets: cabinets})
                            setTeachers([])
                            setLessonName('')
                            setCabinets([])
                        }} className="bg-green-500 text-white p-2 rounded mr-2">Добавить
                        </button>
                        <button onClick={() => {
                            onClose()
                            setTeachers([])
                            setLessonName('')
                            setCabinets([])
                        }} className="bg-red-500 text-white p-2 rounded">Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
);
}
