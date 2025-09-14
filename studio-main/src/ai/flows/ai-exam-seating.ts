
'use server';

/**
 * @fileOverview An AI flow for generating an exam seating arrangement.
 *
 * - aiExamSeatingArrangement - A function that creates a seating plan for an exam.
 * - AIExamSeatingInput - The input type for the function.
 * - AIExamSeatingOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StudentSchema = z.object({
  rollNumber: z.string().describe('The unique roll number of the student.'),
  name: z.string().describe('The name of the student.'),
  className: z.string().describe('The class of the student.'),
});

const AIExamSeatingInputSchema = z.object({
  className: z.string().describe('The class or classes for which the exam is being scheduled (e.g., "Grade 10" or "Grade 10, Grade 11").'),
  subject: z.string().describe('The subject of the exam.'),
  numBatches: z.number().describe('The total number of batches or rooms for the exam.'),
  studentsPerBatch: z.number().describe('The number of students allowed in each batch/room.'),
  students: z.array(StudentSchema).describe('The list of all students eligible for the exam.'),
});
export type AIExamSeatingInput = z.infer<typeof AIExamSeatingInputSchema>;

const AIExamSeatingOutputSchema = z.object({
  seatingArrangement: z.array(z.object({
    batchNumber: z.number().describe('The batch number.'),
    students: z.array(z.object({
      rollNumber: z.string().describe("The student's roll number."),
      name: z.string().describe("The student's name."),
      seat: z.string().describe('The assigned seat number (e.g., R1-C1).'),
    })).describe('List of students in this batch with their assigned seats.'),
  })).describe('The detailed seating plan for all batches.'),
});
export type AIExamSeatingOutput = z.infer<typeof AIExamSeatingOutputSchema>;

export async function aiExamSeatingArrangement(input: AIExamSeatingInput): Promise<AIExamSeatingOutput> {
  return aiExamSeatingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiExamSeatingPrompt',
  input: { schema: AIExamSeatingInputSchema },
  output: { schema: AIExamSeatingOutputSchema },
  prompt: `You are an AI exam administrator. Your task is to create a seating arrangement for an upcoming exam.

Exam Details:
- Class(es): {{{className}}}
- Subject: {{{subject}}}
- Total Batches/Rooms: {{{numBatches}}}
- Students per Batch/Room: {{{studentsPerBatch}}}

Student List (Total: {{students.length}}):
{{#each students}}
- {{name}} ({{rollNumber}}), Class: {{className}}
{{/each}}

Based on these details, please generate a clear seating plan.
1. Distribute all students from the provided list into the available batches/rooms.
2. The total number of students is {{students.length}}. You need to fit them into {{{numBatches}}} batches with a capacity of {{{studentsPerBatch}}} students per batch.
3. For each batch, assign each student a unique seat number. The seat number format should be "R{row}-C{column}", starting from R1-C1. Arrange them in a grid within each batch.
4. Ensure no student is left out. If the total number of students exceeds the total capacity (numBatches * studentsPerBatch), you must still assign all students, distributing the overflow as evenly as possible among the batches.
5. If there are students from multiple classes, try to mix them within the batches rather than grouping them by class.
6. Return the complete seating arrangement in the specified JSON format.
`,
});

const aiExamSeatingFlow = ai.defineFlow(
  {
    name: 'aiExamSeatingFlow',
    inputSchema: AIExamSeatingInputSchema,
    outputSchema: AIExamSeatingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a valid seating arrangement.');
    }
    return output;
  }
);
