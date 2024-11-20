import {LessonTime} from "../pages/TimeEditPage";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import {TeacherDTO} from "../types";

interface TeacherInfoModalProps {
    isOpen: boolean;
    selected: TeacherDTO;
    onClose: () => void;
}

export default function TeacherInfoModal({isOpen, selected, onClose}: TeacherInfoModalProps) {
    const [lessonName, setLessonName] = useState('');
    const [teacher, setTeacher] = useState<TeacherDTO>();
    const [lessons, setLessons] = useState<string[]>([]);

    useEffect(() => {
        setTeacher(selected);
        setLessons(selected.lessons)
    }, []);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-overlay">
            {teacher != undefined ? <div
                className="bg-white rounded-lg shadow-lg p-4 max-w-md sm:max-w-full mx-auto mt-20 relative"> {/* Выравнивание по центру */}
                <h2 className="text-xl font-bold mb-4">{teacher.lastName} {teacher.firstName} {teacher.patronymic}</h2>
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
                        <button onClick={() => setLessons([...teacher.lessons, ''])} className="text-blue-500">
                            <AddIcon/>
                        </button>
                    </div>
                    {teacher.lessons.map((teacher, index) => (
                        <div className="grid grid-cols-6 pb-4">
                            <input
                                placeholder="Интервал (00:00-00:00)..."
                                className="border rounded w-full mb-2 col-start-1 col-span-5"
                                required={true}
                                onChange={(event) => {
                                  //  const updatedTeachers = [...teacher.lessons];
                                  //  updatedTeachers[index] = event.target.value;
                                    //setLessons(updatedTeachers);
                                }}
                            />
                            <Button className="col-end-7" onClick={(event) => {
                               // setLessons(teacher.lessons.filter((value, index1) => index1 != index))
                            }}>
                                <RemoveIcon/>
                            </Button>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button onClick={() => {
                            if (lessonName == ''
                                || teacher.lessons.length == 0
                                || teacher.lessons.filter(value => value == '').length != 0
                            ) return
                            //  onAddLessonTime({id: Date.now(), name: lessonName, times: teachers})
                            setLessons([])
                            setLessonName('')
                        }} className="bg-green-500 text-white p-2 rounded mr-2">Добавить
                        </button>
                        <button onClick={() => {
                            onClose()
                            setLessons([])
                            setLessonName('')
                        }} className="bg-red-500 text-white p-2 rounded">Закрыть
                        </button>
                    </div>
                </div>
            </div> : <div></div>}
        </Modal>
    );
}
