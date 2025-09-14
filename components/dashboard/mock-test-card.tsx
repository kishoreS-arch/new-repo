'use client';
import { useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getMockTestFeedback } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TestTube2, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState, useActionState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { mockTestSubjects } from '@/lib/data';
import type { MockTestSubject } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';

const initialState = {
  message: '',
  feedback: '',
  estimatedMarks: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="ml-auto" disabled={pending}>
      {pending ? 'Evaluating...' : 'Get Feedback'}
    </Button>
  );
}

export function MockTestCard() {
  const [state, formAction, isPending] = useActionState(getMockTestFeedback, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedSubject, setSelectedSubject] = useState<MockTestSubject | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    if (state.message === 'success') {
      setIsSubmitted(true);
    }
     if (state.message && state.message !== 'success' && !isPending) {
      setIsSubmitted(false);
    }
  }, [state, isPending]);

  const handleSubjectChange = (subjectId: string) => {
    const subject = mockTestSubjects.find(s => s.id === subjectId) || null;
    setSelectedSubject(subject);
    setSelectedSubjectId(subjectId);
    setIsSubmitted(false);
    // Reset form and state when subject changes
    if (formRef.current) {
        formRef.current.reset();
    }
    if (state.message) {
      state.message = '';
      state.feedback = '';
      state.estimatedMarks = '';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube2 className="h-5 w-5" />
          AI Mock Test
        </CardTitle>
        <CardDescription>
          Select a subject, answer the questions (total 20 marks), and get instant AI-powered feedback.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction} key={selectedSubjectId}>
        <CardContent className="space-y-4">
          <div className='space-y-2'>
            <Label htmlFor='subject'>Select Subject</Label>
            <Select onValueChange={handleSubjectChange} value={selectedSubjectId} disabled={isPending}>
              <SelectTrigger id='subject'>
                <SelectValue placeholder="Choose a subject for the test" />
              </SelectTrigger>
              <SelectContent>
                {mockTestSubjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedSubject && (
            <div className='space-y-6 rounded-lg border p-4'>
              <input type="hidden" name="syllabus" value={selectedSubject.name} />
              <input type="hidden" name="testName" value={selectedSubject.name} />
              <input type="hidden" name="questions" value={JSON.stringify(selectedSubject.questions)} />

              {selectedSubject.questions.map((q, index) => (
                <div key={q.id} className="space-y-3">
                  <Label htmlFor={q.type === 'mcq' ? `studentAnswer_${index}` : `subjectiveAnswer_${index}`} className="font-semibold">
                    {`Question ${index + 1}: ${q.question} (${q.marks} Marks)`}
                  </Label>
                  {q.type === 'mcq' && q.options ? (
                    <RadioGroup 
                      name={`studentAnswer_${index}`} 
                      id={`studentAnswer_${index}`}
                      required
                    >
                      {q.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`q${index}_option${optionIndex}`} />
                          <Label htmlFor={`q${index}_option${optionIndex}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Textarea 
                      name={`subjectiveAnswer_${index}`}
                      id={`subjectiveAnswer_${index}`}
                      placeholder="Type your answer here..."
                      required
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {isPending && (
            <div className='space-y-4'>
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}

          {state.message === 'success' && state.feedback && (
            <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800 dark:text-green-300">Evaluation Complete</AlertTitle>
              <AlertDescription>
                <p className="font-semibold">Estimated Total Marks: {state.estimatedMarks} / 20</p>
                <div className="mt-2 whitespace-pre-wrap font-sans">
                  <span className="font-semibold">Feedback:</span> 
                  <div>{state.feedback}</div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {state.message && state.message !== 'success' && !isPending && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {state.message}
              </AlertDescription>
            </Alert>
          )}

        </CardContent>
        {selectedSubject && (
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
