'use server';

/**
 * @fileOverview An AI chatbot for answering frequently asked questions about the syllabus, exam dates, and attendance.
 *
 * - aiFAQChatbot - A function that handles the chatbot interactions.
 * - AIFAQChatbotInput - The input type for the aiFAQChatbot function.
 * - AIFAQChatbotOutput - The return type for the aiFAQChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIFAQChatbotInputSchema = z.object({
  query: z.string().describe('The user query about syllabus, exam dates, or attendance.'),
});
export type AIFAQChatbotInput = z.infer<typeof AIFAQChatbotInputSchema>;

const AIFAQChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AIFAQChatbotOutput = z.infer<typeof AIFAQChatbotOutputSchema>;

export async function aiFAQChatbot(input: AIFAQChatbotInput): Promise<AIFAQChatbotOutput> {
  return aiFAQChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiFAQChatbotPrompt',
  input: {schema: AIFAQChatbotInputSchema},
  output: {schema: AIFAQChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot assistant providing information to students and parents.

  You are an expert on:
  - Syllabus information
  - Exam dates
  - Attendance policies

  Use the following context to answer the question.

  Context: The school syllabus includes units on Math, Science, English and History. Exams are scheduled for the end of each semester. Attendance is mandatory, and students must attend at least 80% of classes to be eligible to sit for the exams.

  Question: {{{query}}}`,
});

const aiFAQChatbotFlow = ai.defineFlow(
  {
    name: 'aiFAQChatbotFlow',
    inputSchema: AIFAQChatbotInputSchema,
    outputSchema: AIFAQChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
