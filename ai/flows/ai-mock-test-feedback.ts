'use server';

/**
 * @fileOverview This file defines the AI mock test feedback flow. It takes the student's answers and the test syllabus as input,
 * uses an AI model to evaluate the answers, and provides feedback along with estimated marks.
 *
 * @exports {
 *   aiMockTestFeedback,
 *   AIMockTestFeedbackInput,
 *   AIMockTestFeedbackOutput
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMockTestFeedbackInputSchema = z.object({
  studentAnswers: z.string().describe("The student's answers for the mock test. It includes multiple-choice and subjective questions."),
  syllabus: z.string().describe('The syllabus or subject of the mock test.'),
  testName: z.string().describe('The name of the test.'),
});

export type AIMockTestFeedbackInput = z.infer<typeof AIMockTestFeedbackInputSchema>;

const AIMockTestFeedbackOutputSchema = z.object({
  feedback: z.string().describe('A single paragraph of detailed feedback for the student\'s answers, especially for the incorrect or partially correct ones.'),
  estimatedMarks: z.string().describe('The estimated total marks for all answers combined, out of a total of 20.'),
});

export type AIMockTestFeedbackOutput = z.infer<typeof AIMockTestFeedbackOutputSchema>;

export async function aiMockTestFeedback(input: AIMockTestFeedbackInput): Promise<AIMockTestFeedbackOutput> {
  return aiMockTestFeedbackFlow(input);
}

const aiMockTestFeedbackPrompt = ai.definePrompt({
  name: 'aiMockTestFeedbackPrompt',
  input: {schema: AIMockTestFeedbackInputSchema},
  output: {schema: AIMockTestFeedbackOutputSchema},
  prompt: `You are an AI-powered mock test evaluator for a test named {{{testName}}}. Your task is to evaluate the student's answers based on the provided questions, correct answers, and student's choices. Provide a single, consolidated paragraph of feedback covering all the answers. For incorrect MCQ answers and subjective answers, explain what was wrong and how to improve. Award partial marks for subjective answers where appropriate. Finally, provide a combined estimated mark out of 20.

Syllabus/Subject: {{{syllabus}}}

Questions and Answers: 
{{{studentAnswers}}}

Calculate the total score. For incorrect MCQ answers and all subjective answers, provide feedback within a single paragraph. For correct MCQ answers, you can just acknowledge them as correct within the flow of the paragraph. Ensure the feedback is formatted clearly as a single block of text without any bullet points or numbered lists.`,
});

const aiMockTestFeedbackFlow = ai.defineFlow(
  {
    name: 'aiMockTestFeedbackFlow',
    inputSchema: AIMockTestFeedbackInputSchema,
    outputSchema: AIMockTestFeedbackOutputSchema,
  },
  async input => {
    const {output} = await aiMockTestFeedbackPrompt(input);
    return output!;
  }
);
