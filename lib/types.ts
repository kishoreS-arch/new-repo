

export type Role = 'admin' | 'teacher' | 'student' | 'parent';
export type InstitutionType = 'school' | 'college';

export type TimetableSlot = {
  id: string;
  time: string;
  subject: string;
  teacher: string;
};

export type WeeklyTimetable = {
    [day: string]: (TimetableSlot | null)[];
}

export type Student = {
  id: string;
  name: string;
  class: string;
  section: string;
  phone: string;
};

export type Parent = {
    id: string;
    name: string;
    phone: string;
    childId: string;
}

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  phone: string;
  classes: string[];
  leavePercentage: number;
}

export type NewsUpdate = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type Syllabus = {
  id: string;
  subject: string;
  unit: string;
};

export type Progress = {
    subject: string;
    marks: number;
}

export type MockTestQuestion = {
    id:string,
    type: 'mcq' | 'subjective';
    question: string;
    options?: string[];
    answer: string;
    marks: number;
}

export type MockTestSubject = {
    id: string;
    name: string;
    questions: MockTestQuestion[];
}

export type CustomEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
};

export type SeatingPlan = {
  batchNumber: number;
  students: {
    rollNumber: string;
    name: string;
    seat: string;
  }[];
}[];

export type TeacherSubject = {
    name: string;
    classes: string[];
};

export type TodaysSchedule = {
    subject: string;
    time: string;
    location: string;
    type: 'Theory' | 'Lab';
};
