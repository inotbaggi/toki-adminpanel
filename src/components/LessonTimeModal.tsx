import React, {useState} from "react";
import Modal from "react-modal";
import {Lesson} from "../pages/ScheduleCreatePage";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {cabinetsList, itemsList, teachersList} from "../types";
import {LessonTime} from "../pages/TimeEditPage";

interface AddLessonTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddLessonTime: (lesson: LessonTime) => void;
}

export default function AddLessonTimeModal({isOpen, onClose, onAddLessonTime}: AddLessonTimeModalProps) {
    const [lessonName, setLessonName] = useState('');
    const [teachers, setTeachers] = useState<string[]>(['']);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-overlay">
            <div
                className="bg-white rounded-lg shadow-lg p-4 max-w-md sm:max-w-full mx-auto mt-20 relative"> {/* Выравнивание по центру */}
                <h2 className="text-xl font-bold mb-4">Добавление интервала пар</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Название интервала:</label>
                    <input
                        placeholder="..."
                        className="border rounded w-full mb-2 col-start-1 col-span-5"
                        onChange={(event) => {
                            setLessonName(event.target.value)
                        }}
                    />
                </div>
                <div className="mb-4">
                    <div className="flex flex-row space-x-1 mb-2">
                        <label className="block text-gray-700">Интервалы:</label>
                        <button onClick={() => setTeachers([...teachers, ''])} className="text-blue-500">
                            <AddIcon/>
                        </button>
                    </div>
                    {teachers.map((teacher, index) => (
                        <div className="grid grid-cols-6 pb-4">
                            <input
                                placeholder="Интервал (00:00-00:00)..."
                                className="border rounded w-full mb-2 col-start-1 col-span-5"
                                required={true}
                                onChange={(event) => {
                                    const updatedTeachers = [...teachers];
                                    updatedTeachers[index] = event.target.value;
                                    setTeachers(updatedTeachers);
                                }}
                            />
                            <Button className="col-end-7" onClick={(event) => {
                                setTeachers(teachers.filter((value, index1) => index1 != index))
                            }}>
                                <RemoveIcon/>
                            </Button>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button onClick={() => {
                            if (lessonName == ''
                                || teachers.length == 0
                                || teachers.filter(value => value == '').length != 0
                            ) return
                            onAddLessonTime({id: Date.now(), name: lessonName, times: teachers})
                            setTeachers([])
                            setLessonName('')
                        }} className="bg-green-500 text-white p-2 rounded mr-2">Добавить
                        </button>
                        <button onClick={() => {
                            onClose()
                            setTeachers([])
                            setLessonName('')
                        }} className="bg-red-500 text-white p-2 rounded">Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
