

import type { TimetableSlot, Student, Teacher, NewsUpdate, Syllabus, Progress, WeeklyTimetable, MockTestSubject, Parent, TeacherSubject, TodaysSchedule } from './types';

export let timetable: TimetableSlot[] = [
  { id: '1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Mr. Sharma' },
  { id: '2', time: '09:50 - 10:40', subject: 'Science', teacher: 'Mrs. Verma' },
  { id: '3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
  { id: '4', time: '11:00 - 11:50', subject: 'English', teacher: 'Ms. Das' },
  { id: '5', time: '11:50 - 12:40', subject: 'History', teacher: 'Mr. Singh' },
  { id: '6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
  { id: '7', time: '01:30 - 02:20', subject: 'Geography', teacher: 'Mrs. Rao' },
  { id: '8', time: '02:20 - 03:10', subject: 'Break Time', teacher: 'Evening Break' },
];

export let weeklyTimetable: WeeklyTimetable = {
  monday: [
    { id: 'm1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Mr. Sharma' },
    { id: 'm2', time: '09:50 - 10:40', subject: 'Physics', teacher: 'Mrs. Verma' },
    { id: 'm3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'm4', time: '11:00 - 11:50', subject: 'English', teacher: 'Ms. Das' },
    { id: 'm5', time: '11:50 - 12:40', subject: 'History', teacher: 'Mr. Singh' },
    { id: 'm6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'm7', time: '01:30 - 02:20', subject: 'Chemistry', teacher: 'Mr. Kumar' },
    { id: 'm8', time: '02:20 - 03:10', subject: 'Break Time', teacher: 'Evening Break' },
  ],
  tuesday: [
    { id: 'tu1', time: '09:00 - 09:50', subject: 'English', teacher: 'Ms. Das' },
    { id: 'tu2', time: '09:50 - 10:40', subject: 'Math', teacher: 'Mr. Sharma' },
    { id: 'tu3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'tu4', time: '11:00 - 11:50', subject: 'History', teacher: 'Mr. Singh' },
    { id: 'tu5', time: '11:50 - 12:40', subject: 'Physics', teacher: 'Mrs. Verma' },
    { id: 'tu6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'tu7', time: '01:30 - 02:20', subject: 'Computer Science', teacher: 'Mr. Iyer' },
    { id: 'tu8', time: '02:20 - 03:10', subject: 'Break Time', teacher: 'Evening Break' },
  ],
  wednesday: [
    { id: 'w1', time: '09:00 - 09:50', subject: 'History', teacher: 'Mr. Singh' },
    { id: 'w2', time: '09:50 - 10:40', subject: 'English', teacher: 'Ms. Das' },
    { id: 'w3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'w4', time: '11:00 - 11:50', subject: 'Math', teacher: 'Mr. Sharma' },
    { id: 'w5', time: '11:50 - 12:40', subject: 'Chemistry', teacher: 'Mr. Kumar' },
    { id: 'w6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'w7', time: '01:30 - 02:20', subject: 'Physics', teacher: 'Mrs. Verma' },
    { id: 'w8', time: '02:20 - 03:10', subject: 'Break Time', teacher: 'Evening Break' },
  ],
  thursday: [
    { id: 'th1', time: '09:00 - 09:50', subject: 'Physics', teacher: 'Mrs. Verma' },
    { id: 'th2', time: '09:50 - 10:40', subject: 'History', teacher: 'Mr. Singh' },
    { id: 'th3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'th4', time: '11:00 - 11:50', subject: 'Chemistry', teacher: 'Mr. Kumar' },
    { id: 'th5', time: '11:50 - 12:40', subject: 'English', teacher: 'Ms. Das' },
    { id: 'th6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'th7', time: '01:30 - 02:20', subject: 'Math', teacher: 'Mr. Sharma' },
    { id: 'th8', time: '02:20 - 03:10', subject: 'Break Time', teacher: 'Evening Break' },
  ],
  friday: [
    { id: 'f1', time: '09:00 - 09:50', subject: 'Chemistry', teacher: 'Mr. Kumar' },
    { id: 'f2', time: '09:50 - 10:40', subject: 'Computer Science', teacher: 'Mr. Iyer' },
    { id: 'f3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'f4', time: '11:00 - 11:50', subject: 'Geography', teacher: 'Mrs. Rao' },
    { id: 'f5', time: '11:50 - 12:40', subject: 'Math', teacher: 'Mr. Sharma' },
    { id: 'f6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'f7', time: '01:30 - 02:20', subject: 'English', teacher: 'Ms. Das' },
    { id: 'f8', time: '02:20 - 03:10', subject: 'Break Time', teacher: 'Evening Break' },
  ],
  saturday: [],
  sunday: [],
};


const studentNames = [
  "Aarav Gupta", "Aanya Sharma", "Advik Patel", "Aisha Singh", "Akshay Kumar", "Anika Reddy", 
  "Arjun Verma", "Arya Joshi", "Aryan Khan", "Avani Desai", "Ayaan Ali", "Diya Mehta", 
  "Ishaan Shah", "Ishika Rao", "Kabir Yadav", "Kavya Murthy", "Krish Nair", "Myra Saxena",
  "Neel Iyer", "Priya Anand", "Rohan Pillai", "Saanvi Bhatt", "Samarth Malhotra", "Sara Agarwal", 
  "Shaurya Choudhary", "Siya Khanna", "Soham Das", "Tara Menon", "Veer Sundaram", "Zara Begum",
  "Aayush Gupta", "Ananya Sharma", "Arnav Patel", "Diya Singh", "Eshan Kumar", "Fatima Reddy",
  "Gaurav Verma", "Hiya Joshi", "Imran Khan", "Jiya Desai", "Kabir Ali", "Lavanya Mehta",
  "Madhav Shah", "Navya Rao", "Omar Yadav", "Piya Murthy", "Raj Nair", "Rhea Saxena",
  "Siddharth Iyer", "Suhana Anand", "Tanish Pillai", "Urvi Bhatt", "Varun Malhotra", "Vanya Agarwal",
  "Yash Choudhary", "Zoya Khanna", "Aditya Das", "Anvi Menon", "Vivaan Sundaram", "Shanaya Begum",
  "Aarav Kumar", "Aanya Singh", "Advik Reddy", "Aisha Patel", "Akshay Verma", "Anika Joshi",
  "Arjun Khan", "Arya Desai", "Aryan Ali", "Avani Mehta", "Ayaan Shah", "Diya Rao",
  "Ishaan Murthy", "Ishika Nair", "Kabir Saxena", "Kavya Pillai", "Krish Bhatt", "Myra Malhotra",
  "Neel Agarwal", "Priya Choudhary", "Riya Singh", "Vihaan Sharma", "Zoya Khan", "Yash Gupta",
  "Anvi Patel", "Reyansh Kumar", "Samaira Reddy", "Arnav Verma", "Kiara Joshi", "Sai Khan",
  "Aditi Desai", "Vivaan Ali", "Anaya Mehta", "Rudra Shah", "Pari Rao", "Arush Murthy",
  "Aadhya Nair", "Ayaan Saxena", "Navya Pillai", "Arin Bhatt", "Ananya Malhotra", "Dev Agarwal",
  "Ira Choudhary", "Shaan Khanna", "Suhana Das", "Atharv Menon", "Anika Sundaram", "Arjun Begum",
  "Abhay Rana", "Adah Sharma", "Bhavin Shah", "Charvi Gupta", "Darsh Singh", "Eira Patel",
  "Firoz Khan", "Gauri Verma", "Harsh Joshi", "Inaya Reddy", "Jay Desai", "Kaira Mehta",
  "Laksh Ali", "Mira Rao", "Nirav Yadav", "Oviya Murthy", "Parth Nair", "Qureshi Begum",
  "Rudra Saxena", "Sanya Iyer", "Tejas Anand", "Uma Pillai", "Vihan Bhatt", "Wafa Malhotra",
...Array.from({ length: 500 }, (_, i) => `Student Name ${i + 1}`)
].filter((v, i, a) => a.indexOf(v) === i); // Ensure unique names


const generateStudents = (count: number, className: string, section: string, nameStartIndex: number): Student[] => {
    const students: Student[] = [];
    for (let i = 0; i < count; i++) {
        const studentIndex = nameStartIndex + i;
        const name = studentNames[studentIndex] || `Student ${className}-${section}-${i + 1}`;
        students.push({
            id: `s${className.replace(/ /g,'')}${section}${i + 1}`,
            name: name,
            class: className,
            section: section,
            phone: `9876543${(100 + studentIndex).toString().slice(-4)}`
        });
    }
    return students;
}

let nameCounter = 0;
const getStudentsForClass = (count: number, className: string, section: string): Student[] => {
    const students = generateStudents(count, className, section, nameCounter);
    nameCounter += count;
    return students;
}

const allSchoolClasses: Student[] = [];
for (let i = 1; i <= 12; i++) {
    allSchoolClasses.push(...getStudentsForClass(25, `Grade ${i}`, 'A'));
    allSchoolClasses.push(...getStudentsForClass(25, `Grade ${i}`, 'B'));
}


export const students: Student[] = allSchoolClasses;

export const parents: Parent[] = students.map(student => {
    const parentName = `Mr. & Mrs. ${student.name.split(' ')[1]}`;
    return {
        id: `p${student.id}`,
        name: parentName,
        phone: `8765432${(100 + parseInt(student.id.replace(/[^0-9]/g, '')) % 100).toString()}`,
        childId: student.id,
    }
});

export const teachers: Teacher[] = [
    { id: 't1', name: 'Mr. Sharma', subject: 'Math', phone: '9876543210', classes: ['Grade 10', 'Grade 11', 'Grade 12'], leavePercentage: 2 },
    { id: 't2', name: 'Mrs. Verma', subject: 'Physics', phone: '9876543211', classes: ['Grade 11', 'Grade 12'], leavePercentage: 1 },
    { id: 't3', name: 'Ms. Das', subject: 'English', phone: '9876543212', classes: ['Grade 8', 'Grade 9', 'Grade 10'], leavePercentage: 5 },
    { id: 't4', name: 'Mr. Singh', subject: 'History', phone: '9876543213', classes: ['Grade 6', 'Grade 7', 'Grade 8'], leavePercentage: 3 },
    { id: 't5', name: 'HOD Kumar', subject: 'Chemistry', phone: '9876543214', classes: ['Grade 11', 'Grade 12'], leavePercentage: 0 },
    { id: 't6', name: 'Mrs. Rao', subject: 'Geography', phone: '9876543215', classes: ['Grade 6', 'Grade 7'], leavePercentage: 4 },
    { id: 't7', name: 'AP Iyer', subject: 'Computer Science', phone: '9876543216', classes: ['Grade 9', 'Grade 10'], leavePercentage: 1 },
    { id: 't8', name: 'AP Reddy', subject: 'Data Science', phone: '9876543217', classes: ['College'], leavePercentage: 2 },
]

export const newsUpdates: NewsUpdate[] = [
  {
    id: 'n1',
    title: 'Results for Mid-term Exams Announced',
    content: 'The results for the mid-term exams are now available on the student portal.',
    date: '2024-07-20',
  },
  {
    id: 'n2',
    title: 'Institution Holiday on August 15th',
    content: 'The institution will remain closed on August 15th for Independence Day.',
    date: '2024-07-19',
  },
];

export const syllabus: Syllabus[] = [
  { id: 'sy1', subject: 'Math', unit: 'Unit 5: Algebra II' },
  { id: 'sy2', subject: 'Science', unit: 'Unit 4: Chemical Reactions' },
  { id: 'sy3', subject: 'English', unit: 'Unit 6: Shakespeare\'s Sonnets' },
  { id: 'sy4', subject: 'Data Science', unit: 'Unit 1: Introduction to Python' },
  { id: 'sy5', subject: 'AI & ML', unit: 'Unit 2: Supervised Learning' },
  { id: 'sy6', subject: 'Social Science', unit: 'Unit 3: Modern History' },
  { id: 'sy7', subject: 'Computer Science', unit: 'Unit 2: Data Structures' },
  { id: 'sy8', subject: 'General Knowledge', unit: 'Unit 1: World Capitals' },
  { id: 'sy9', subject: 'Physics', unit: 'Unit 3: Laws of Motion' },
  { id: 'sy10', subject: 'Chemistry', unit: 'Unit 2: Periodic Table' },
  { id: 'sy11', subject: 'Biology', unit: 'Unit 4: Human Anatomy' },
];

export const progressData: Progress[] = [
    { subject: 'Math', marks: 85 },
    { subject: 'Science', marks: 92 },
    { subject: 'English', marks: 78 },
    { subject: 'History', marks: 88 },
    { subject: 'Hindi', marks: 95 },
    { subject: 'Data Science', marks: 89 },
    { subject: 'AI & ML', marks: 91 },
]

export const mockTestSubjects: MockTestSubject[] = [
    {
        id: 'math',
        name: 'Mathematics',
        questions: [
            { id: 'm1', type: 'mcq', question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4', marks: 2 },
            { id: 'm2', type: 'mcq', question: 'What is 10 * 5?', options: ['45', '50', '55'], answer: '50', marks: 2 },
            { id: 'm3', type: 'mcq', question: 'What is 9 / 3?', options: ['3', '4', '2'], answer: '3', marks: 2 },
            { id: 'm4', type: 'mcq', question: 'What is 7 - 3?', options: ['4', '5', '6'], answer: '4', marks: 2 },
            { id: 'm5', type: 'mcq', question: 'What is 8 * 2?', options: ['14', '16', '18'], answer: '16', marks: 2 },
            { id: 'm6', type: 'subjective', question: 'Explain the Pythagorean theorem.', answer: 'In a right-angled triangle, the square of the hypotenuse side is equal to the sum of squares of the other two sides.', marks: 5 },
            { id: 'm7', type: 'subjective', question: 'What is a prime number?', answer: 'A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.', marks: 5 },
        ]
    },
    {
        id: 'science',
        name: 'Science',
        questions: [
            { id: 's1', type: 'mcq', question: 'What is H2O?', options: ['Salt', 'Water', 'Oxygen'], answer: 'Water', marks: 2 },
            { id: 's2', type: 'mcq', question: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C'], answer: '100°C', marks: 2 },
            { id: 's3', type: 'mcq', question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter'], answer: 'Mars', marks: 2 },
            { id: 's4', type: 'mcq', question: 'What do plants use for photosynthesis?', options: ['Sunlight', 'Moonlight', 'Starlight'], answer: 'Sunlight', marks: 2 },
            { id: 's5', type: 'mcq', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond'], answer: 'Diamond', marks: 2 },
            { id: 's6', type: 'subjective', question: 'Explain the process of photosynthesis.', answer: 'Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight into chemical energy.', marks: 5 },
            { id: 's7', type: 'subjective', question: 'What are the three states of matter?', answer: 'The three states of matter are solid, liquid, and gas.', marks: 5 },
        ]
    },
     {
        id: 'social',
        name: 'Social Science',
        questions: [
            { id: 'ss1', type: 'mcq', question: 'Who was the first President of the United States?', options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson'], answer: 'George Washington', marks: 2 },
            { id: 'ss2', type: 'mcq', question: 'Which country is home to the kangaroos?', options: ['Australia', 'Austria', 'Africa'], answer: 'Australia', marks: 2 },
            { id: 'ss3', type: 'mcq', question: 'What is the capital of France?', options: ['London', 'Paris', 'Rome'], answer: 'Paris', marks: 2 },
            { id: 'ss4', type: 'mcq', question: 'How many continents are there?', options: ['5', '6', '7'], answer: '7', marks: 2 },
            { id: 'ss5', type: 'mcq', question: 'What ancient civilization built the pyramids?', options: ['Greek', 'Roman', 'Egyptian'], answer: 'Egyptian', marks: 2 },
            { id: 'ss6', type: 'subjective', question: 'What is democracy?', answer: 'Democracy is a system of government where the citizens exercise power by voting.', marks: 5 },
            { id: 'ss7', type: 'subjective', question: 'Name one major river in India.', answer: 'The Ganges (Ganga) is a major river in India.', marks: 5 },
        ]
    },
    {
        id: 'cs',
        name: 'Computer Science',
        questions: [
            { id: 'cs1', type: 'mcq', question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit'], answer: 'Central Processing Unit', marks: 2 },
            { id: 'cs2', type: 'mcq', question: 'What is the main function of RAM?', options: ['Long-term storage', 'Temporary storage', 'Processing data'], answer: 'Temporary storage', marks: 2 },
            { id: 'cs3', type: 'mcq', question: 'Which of these is an input device?', options: ['Monitor', 'Printer', 'Mouse'], answer: 'Mouse', marks: 2 },
            { id: 'cs4', type: 'mcq', question: 'What is a folder used for?', options: ['To store files', 'To run programs', 'To connect to the internet'], answer: 'To store files', marks: 2 },
            { id: 'cs5', type: 'mcq', question: 'Which software is used for browsing the internet?', options: ['Photoshop', 'Chrome', 'Word'], answer: 'Chrome', marks: 2 },
            { id: 'cs6', type: 'subjective', question: 'What is an operating system?', answer: 'An operating system is software that manages all of the hardware resources associated with your desktop or laptop.', marks: 5 },
            { id: 'cs7', type: 'subjective', question: 'What is the difference between hardware and software?', answer: 'Hardware refers to the physical components of a computer, while software is the set of instructions that tells the hardware what to do.', marks: 5 },
        ]
    },
    {
        id: 'gk',
        name: 'General Knowledge',
        questions: [
            { id: 'gk1', type: 'mcq', question: 'What is the capital of Japan?', options: ['Beijing', 'Seoul', 'Tokyo'], answer: 'Tokyo', marks: 2 },
            { id: 'gk2', type: 'mcq', question: 'Which is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Saturn'], answer: 'Jupiter', marks: 2 },
            { id: 'gk3', type: 'mcq', question: 'How many colors are in a rainbow?', options: ['6', '7', '8'], answer: '7', marks: 2 },
            { id: 'gk4', type: 'mcq', question: 'What is the currency of the United Kingdom?', options: ['Euro', 'Dollar', 'Pound Sterling'], answer: 'Pound Sterling', marks: 2 },
            { id: 'gk5', type: 'mcq', question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen'], answer: 'William Shakespeare', marks: 2 },
            { id: 'gk6', type: 'subjective', question: 'What is the largest ocean on Earth?', answer: 'The Pacific Ocean is the largest ocean on Earth.', marks: 5 },
            { id: 'gk7', type: 'subjective', question: 'Name a primary color.', answer: 'Red, blue, and yellow are primary colors.', marks: 5 },
        ]
    },
    {
        id: 'physics',
        name: 'Physics',
        questions: [
            { id: 'p1', type: 'mcq', question: 'What is the unit of force?', options: ['Watt', 'Joule', 'Newton'], answer: 'Newton', marks: 2 },
            { id: 'p2', type: 'mcq', question: 'What is the formula for work?', options: ['Force x Distance', 'Force / Distance', 'Force + Distance'], answer: 'Force x Distance', marks: 2 },
            { id: 'p3', type: 'mcq', question: 'What type of energy is stored in a battery?', options: ['Kinetic', 'Potential', 'Chemical'], answer: 'Chemical', marks: 2 },
            { id: 'p4', type: 'mcq', question: 'Sound travels fastest in?', options: ['Solids', 'Liquids', 'Gases'], answer: 'Solids', marks: 2 },
            { id: 'p5', type: 'mcq', question: 'What color has the longest wavelength?', options: ['Blue', 'Green', 'Red'], answer: 'Red', marks: 2 },
            { id: 'p6', type: 'subjective', question: "Explain Newton's First Law of Motion.", answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.", marks: 5 },
            { id: 'p7', type: 'subjective', question: 'What is gravity?', answer: 'Gravity is the force by which a planet or other body draws objects toward its center.', marks: 5 },
        ]
    },
    {
        id: 'chemistry',
        name: 'Chemistry',
        questions: [
            { id: 'c1', type: 'mcq', question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'O2'], answer: 'H2O', marks: 2 },
            { id: 'c2', type: 'mcq', question: 'What is the most abundant gas in the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'], answer: 'Nitrogen', marks: 2 },
            { id: 'c3', type: 'mcq', question: 'What is the atomic number of Carbon?', options: ['6', '8', '12'], answer: '6', marks: 2 },
            { id: 'c4', type: 'mcq', question: 'Which element is known as the "king of chemicals"?', options: ['Sulphuric Acid', 'Hydrochloric Acid', 'Nitric Acid'], answer: 'Sulphuric Acid', marks: 2 },
            { id: 'c5', type: 'mcq', question: 'What is a substance with a pH of 7 called?', options: ['Acid', 'Base', 'Neutral'], answer: 'Neutral', marks: 2 },
            { id: 'c6', type: 'subjective', question: 'What is the difference between an atom and a molecule?', answer: 'An atom is the smallest unit of a chemical element. A molecule is a group of two or more atoms held together by chemical bonds.', marks: 5 },
            { id: 'c7', type: 'subjective', question: 'What is a chemical reaction?', answer: 'A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another.', marks: 5 },
        ]
    },
    {
        id: 'biology',
        name: 'Biology',
        questions: [
            { id: 'b1', type: 'mcq', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome'], answer: 'Mitochondria', marks: 2 },
            { id: 'b2', type: 'mcq', question: 'Which part of the plant absorbs water?', options: ['Leaf', 'Stem', 'Root'], answer: 'Root', marks: 2 },
            { id: 'b3', type: 'mcq', question: 'How many chambers are in the human heart?', options: ['2', '3', '4'], answer: '4', marks: 2 },
            { id: 'b4', type: 'mcq', question: 'What is the process by which plants make their own food?', options: ['Respiration', 'Photosynthesis', 'Transpiration'], answer: 'Photosynthesis', marks: 2 },
            { id: 'b5', type: 'mcq', question: 'Which of these is a mammal?', options: ['Fish', 'Lizard', 'Whale'], answer: 'Whale', marks: 2 },
            { id: 'b6', type: 'subjective', question: 'What is DNA?', answer: 'DNA, or deoxyribonucleic acid, is a molecule that carries the genetic instructions for the development, functioning, growth and reproduction of all known organisms and many viruses.', marks: 5 },
            { id: 'b7', type: 'subjective', question: 'What is the function of the lungs?', answer: 'The primary function of the lungs is to facilitate gas exchange, allowing oxygen from the air to enter the blood and carbon dioxide to be removed.', marks: 5 },
        ]
    }
]

export const allSubjects = [...new Set(syllabus.map(s => s.subject))];

const timeSlots = [
  '09:00 - 09:50', '09:50 - 10:40', '10:40 - 11:00',
  '11:00 - 11:50', '11:50 - 12:40', '12:40 - 01:30',
  '01:30 - 02:20', '02:20 - 03:10'
];

const breakSlots = [
  { subject: 'Break Time', teacher: 'Morning Break' },
  { subject: 'Break Time', teacher: 'Lunch Break' },
  { subject: 'Break Time', teacher: 'Evening Break' }
];

const generateRandomTimetable = (seed: number): TimetableSlot[] => {
  const subjectsForDay = [...allSubjects].sort(() => 0.5 - (seed % 2)).slice(0, 5);
  const teachersForDay = [...teachers].sort(() => 0.5 - (seed % 3)).slice(0, 5);

  let period = 0;
  return timeSlots.map((time, index) => {
    let subject, teacher;
    if (index === 2) {
      subject = breakSlots[0].subject;
      teacher = breakSlots[0].teacher;
    } else if (index === 5) {
      subject = breakSlots[1].subject;
      teacher = breakSlots[1].teacher;
    } else if (index === 7) {
      subject = breakSlots[2].subject;
      teacher = breakSlots[2].teacher;
    } else {
      subject = subjectsForDay[period % subjectsForDay.length];
      teacher = teachers.find(t => t.subject === subject)?.name || teachersForDay[period % teachersForDay.length].name;
      period++;
    }
    return {
      id: `${index + 1}`,
      time,
      subject,
      teacher,
    };
  });
};


export let classTimetables: Record<string, TimetableSlot[]> = {};

for (let i = 1; i <= 12; i++) {
    classTimetables[`Grade ${i}-A`] = generateRandomTimetable(i + 10);
    classTimetables[`Grade ${i}-B`] = generateRandomTimetable(i + 20);
}

// Data for Analytics

export const studentPerformanceData = [
  { grade: 'Grade 1', averageMarks: 82 },
  { grade: 'Grade 2', averageMarks: 85 },
  { grade: 'Grade 3', averageMarks: 88 },
  { grade: 'Grade 4', averageMarks: 90 },
  { grade: 'Grade 5', averageMarks: 86 },
  { grade: 'Grade 6', averageMarks: 89 },
  { grade: 'Grade 7', averageMarks: 91 },
  { grade: 'Grade 8', averageMarks: 87 },
  { grade: 'Grade 9', averageMarks: 92 },
  { grade: 'Grade 10', averageMarks: 94 },
  { grade: 'Grade 11', averageMarks: 88 },
  { grade: 'Grade 12', averageMarks: 93 },
];

export const subjectPopularityData = [
  { subject: 'Math', students: 1200 },
  { subject: 'Science', students: 1100 },
  { subject: 'English', students: 1500 },
  { subject: 'History', students: 950 },
  { subject: 'Computer Science', students: 1300 },
];

export const enrollmentData = [
    { month: 'Jan', enrollments: 25 },
    { month: 'Feb', enrollments: 32 },
    { month: 'Mar', enrollments: 28 },
    { month: 'Apr', enrollments: 45 },
    { month: 'May', enrollments: 42 },
    { month: 'Jun', enrollments: 55 },
];

export const teacherAttendanceData = [
    { teacher: 'Mr. Sharma', attendance: 98 },
    { teacher: 'Mrs. Verma', attendance: 99 },
    { teacher: 'Ms. Das', attendance: 95 },
    { teacher: 'Mr. Singh', attendance: 97 },
    { teacher: 'HOD Kumar', attendance: 100 },
    { teacher: 'Mrs. Rao', attendance: 96 },
    { teacher: 'AP Iyer', attendance: 99 },
];

export const teacherSubjects: TeacherSubject[] = [
    { name: 'Data Structures', classes: ['CSE-3A', 'CSE-3B'] },
    { name: 'Algorithms', classes: ['CSE-3A', 'CSE-3B'] },
    { name: 'Programming Fundamentals', classes: ['CSE-3A', 'CSE-3B'] },
];

export const todaysSchedule: TodaysSchedule[] = [
    { subject: 'Data Structures', time: '09:00 - 10:00', location: 'CSE-3A - CS-101', type: 'Theory' },
    { subject: 'Algorithms', time: '14:00 - 15:00', location: 'CSE-3A - CS-102', type: 'Theory' },
    { subject: 'Programming Lab', time: '15:00 - 17:00', location: 'CSE-3A - CS-Lab-1', type: 'Lab' },
];

export let teacherWeeklyTimetable: WeeklyTimetable = {
  monday: [
    { id: 'm1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Grade 10' },
    { id: 'm2', time: '09:50 - 10:40', subject: 'Math', teacher: 'Grade 11' },
    { id: 'm3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Free Period' },
    { id: 'm4', time: '11:00 - 11:50', subject: 'Math', teacher: 'Grade 12' },
    { id: 'm5', time: '11:50 - 12:40', subject: 'Math', teacher: 'Grade 10' },
    { id: 'm6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'm7', time: '01:30 - 02:20', subject: 'Math', teacher: 'Grade 11' },
    { id: 'm8', time: '02:20 - 03:10', subject: 'Math', teacher: 'Grade 12' },
  ],
  tuesday: [
    { id: 'tu1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Grade 11' },
    { id: 'tu2', time: '09:50 - 10:40', subject: 'Math', teacher: 'Grade 12' },
    { id: 'tu3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'tu4', time: '11:00 - 11:50', subject: 'Math', teacher: 'Grade 10' },
    { id: 'tu5', time: '11:50 - 12:40', subject: 'Break Time', teacher: 'Free Period' },
    { id: 'tu6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'tu7', time: '01:30 - 02:20', subject: 'Math', teacher: 'Grade 11' },
    { id: 'tu8', time: '02:20 - 03:10', subject: 'Math', teacher: 'Grade 12' },
  ],
  wednesday: [
    { id: 'w1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Grade 12' },
    { id: 'w2', time: '09:50 - 10:40', subject: 'Math', teacher: 'Grade 10' },
    { id: 'w3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'w4', time: '11:00 - 11:50', subject: 'Break Time', teacher: 'Free Period' },
    { id: 'w5', time: '11:50 - 12:40', subject: 'Math', teacher: 'Grade 11' },
    { id: 'w6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'w7', time: '01:30 - 02:20', subject: 'Math', teacher: 'Grade 10' },
    { id: 'w8', time: '02:20 - 03:10', subject: 'Math', teacher: 'Grade 12' },
  ],
  thursday: [
    { id: 'th1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Grade 10' },
    { id: 'th2', time: '09:50 - 10:40', subject: 'Math', teacher: 'Grade 11' },
    { id: 'th3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'th4', time: '11:00 - 11:50', subject: 'Math', teacher: 'Grade 12' },
    { id: 'th5', time: '11:50 - 12:40', subject: 'Break Time', teacher: 'Free Period' },
    { id: 'th6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'th7', time: '01:30 - 02:20', subject: 'Math', teacher: 'Grade 11' },
    { id: 'th8', time: '02:20 - 03:10', subject: 'Math', teacher: 'Grade 10' },
  ],
  friday: [
    { id: 'f1', time: '09:00 - 09:50', subject: 'Math', teacher: 'Grade 11' },
    { id: 'f2', time: '09:50 - 10:40', subject: 'Math', teacher: 'Grade 12' },
    { id: 'f3', time: '10:40 - 11:00', subject: 'Break Time', teacher: 'Morning Break' },
    { id: 'f4', time: '11:00 - 11:50', subject: 'Math', teacher: 'Grade 10' },
    { id: 'f5', time: '11:50 - 12:40', subject: 'Math', teacher: 'Grade 11' },
    { id: 'f6', time: '12:40 - 01:30', subject: 'Break Time', teacher: 'Lunch Break' },
    { id: 'f7', time: '01:30 - 02:20', subject: 'Break Time', teacher: 'Free Period' },
    { id: 'f8', time: '02:20 - 03:10', subject: 'Math', teacher: 'Grade 12' },
  ],
  saturday: [],
  sunday: [],
};
