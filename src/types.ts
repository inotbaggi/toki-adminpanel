export interface GroupDTO {
    id: number;
    name: string;
}

export interface FacultyDTO {
    id: number;
    name: string;
}

export interface LessonDTO {
    lessonName: string;
    teachers: string[];
    cabinets: string[];
}

export interface ScheduleDayDTO {
    id: string;
    time: string;
    intervalId: number;
    lessons: LessonDTO[];
}

export const teachersList = [
    "Мальцев Р.В.",
    "Слепцова Ю.Г.",
    "Бойко И.И.",
    "Тарадина Л.Р.",
    "Комашко М.В."
]

export const itemsList = [
    "Обществознание",
    "Информатика",
    "ОБЗР",
    "Физика",
    "Литература",
    "Химия",
    "Архитектура",
    "Электротехнические измерения",
    "История России",
    "БЖД",
    "Русский язык и культура речи",
    "Экономика организации",
    "Эксплуатация объектов",
    "Основы философии"
]

export const cabinetsList = [
    "1",
    "2",
    "Ц1",
    "Ц2",
    "Ц3"
]