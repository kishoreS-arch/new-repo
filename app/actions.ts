
'use server';

import { z } from 'zod';
import { aiFAQChatbot } from '@/ai/flows/ai-faq-chatbot';
import { aiMockTestFeedback } from '@/ai/flows/ai-mock-test-feedback';
import { aiExamSeatingArrangement } from '@/ai/flows/ai-exam-seating';
import type { MockTestQuestion, Student } from '@/lib/types';
import { students as allStudents } from '@/lib/data';

const chatSchema = z.object({
  query: z.string(),
});

export async function getChatbotAnswer(prevState: any, formData: FormData) {
  const validatedFields = chatSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid query.',
      answer: '',
    };
  }

  try {
    const response = await aiFAQChatbot(validatedFields.data);
    return {
      answer: response.answer,
      message: 'success',
    };
  } catch (error) {
    return {
      message: 'Failed to get answer from AI. Please try again.',
      answer: '',
    };
  }
}


const testSchema = z.object({
  studentAnswers: z.string(),
  syllabus: z.string(),
  testName: z.string(),
});

export async function getMockTestFeedback(prevState: any, formData: FormData) {
  const questions: MockTestQuestion[] = JSON.parse(formData.get('questions') as string);
  
  const studentAnswers = questions.map((q: MockTestQuestion, index: number) => {
    const answer = q.type === 'mcq' 
      ? formData.get(`studentAnswer_${index}`)
      : formData.get(`subjectiveAnswer_${index}`);
    return {
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      studentAnswer: answer,
      type: q.type,
      marks: q.marks,
    };
  });

  const formattedAnswers = studentAnswers.map((item: any, index: number) => {
      let answerDetails = `Question ${index+1} (${item.marks} marks): ${item.question}\n`;
      if(item.type === 'mcq') {
        answerDetails += `Options: ${item.options.join(', ')}\nCorrect Answer: ${item.correctAnswer}\n`;
      } else {
        answerDetails += `Suggested Answer: ${item.answer}\n`;
      }
      answerDetails += `Student's Answer: ${item.studentAnswer}`;
      return answerDetails;
  }).join('\n\n');


  const validatedFields = testSchema.safeParse({
    studentAnswers: formattedAnswers,
    syllabus: formData.get('syllabus'),
    testName: formData.get('testName'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
      feedback: '',
      estimatedMarks: '',
    };
  }

  try {
    const response = await aiMockTestFeedback(validatedFields.data);
    return {
      ...response,
      message: 'success',
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to get feedback from AI. Please try again.',
      feedback: '',
      estimatedMarks: '',
    };
  }
}

const examSeatingSchema = z.object({
  classNames: z.array(z.string()),
  subject: z.string(),
  numBatches: z.number(),
  studentsPerBatch: z.number(),
});

export async function getExamSeatingPlan(prevState: any, formData: FormData) {
  
  const classNamesRaw = formData.get('classNames');
  let classNames: string[] = [];
  try {
      if (typeof classNamesRaw === 'string') {
          classNames = JSON.parse(classNamesRaw);
      }
  } catch(e) {
       return {
            message: 'Invalid class selection.',
            seatingPlan: null,
        };
  }

  const validatedFields = examSeatingSchema.safeParse({
    classNames: classNames,
    subject: formData.get('subject'),
    numBatches: Number(formData.get('numBatches')),
    studentsPerBatch: Number(formData.get('studentsPerBatch')),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input. Please check all fields.',
      seatingPlan: null,
    };
  }
  
  if (validatedFields.data.classNames.length === 0) {
      return {
          message: 'Please select at least one class.',
          seatingPlan: null
      }
  }

  const relevantStudents = allStudents.filter(s => validatedFields.data.classNames.includes(s.class));
  
  const studentList = relevantStudents.map(s => ({
    rollNumber: s.id,
    name: s.name,
    className: s.class, // Pass class name to AI
  }));

  if (studentList.length === 0) {
      return {
          message: 'No students found for the selected class(es).',
          seatingPlan: null
      }
  }


  try {
    const response = await aiExamSeatingArrangement({
      ...validatedFields.data,
      className: validatedFields.data.classNames.join(', '), // Pass as a string for the prompt
      students: studentList,
    });
    return {
      seatingPlan: response.seatingArrangement,
      message: 'success',
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to generate seating plan from AI. Please try again.',
      seatingPlan: null,
    };
  }
}
