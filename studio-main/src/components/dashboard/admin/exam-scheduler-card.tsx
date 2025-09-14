
'use client';

import { useActionState, useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allSubjects, students } from "@/lib/data";
import { AlertCircle, CheckCircle, FileCheck, Loader2 } from "lucide-react";
import { getExamSeatingPlan } from "@/app/actions";
import type { SeatingPlan } from "@/lib/types";
import { MultiSelect } from "@/components/ui/multi-select";

const uniqueClasses = [...Array.from(new Set(students.map(s => s.class)))].map(c => ({ value: c, label: c }));

const initialState = {
    message: '',
    seatingPlan: null as SeatingPlan | null,
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Generate Seating Plan'}
    </Button>
  );
}

export function ExamSchedulerCard() {
    const [state, formAction, isPending] = useActionState(getExamSeatingPlan, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

    useEffect(() => {
        if (state.message === 'success' && state.seatingPlan) {
           formRef.current?.reset();
           setSelectedClasses([]);
        }
    }, [state]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileCheck />Exam Seating Allocation</CardTitle>
                <CardDescription>
                    Select classes, subject, and batch details to automatically generate a seating plan.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form ref={formRef} action={formAction} className="space-y-4">
                     <input type="hidden" name="classNames" value={JSON.stringify(selectedClasses)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="className">Class(es)</Label>
                            <MultiSelect
                                options={uniqueClasses}
                                selected={selectedClasses}
                                onChange={setSelectedClasses}
                                placeholder="Select one or more classes"
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select name="subject" required>
                                <SelectTrigger id="subject">
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allSubjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="numBatches">Number of Batches/Rooms</Label>
                            <Input 
                                id="numBatches" 
                                name="numBatches"
                                type="number" 
                                min="1" 
                                defaultValue="1" 
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="studentsPerBatch">Students per Batch/Room</Label>
                            <Input id="studentsPerBatch" name="studentsPerBatch" type="number" min="1" defaultValue="25" required />
                        </div>
                    </div>
                    <SubmitButton />
                </form>

                {isPending && (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-4 text-muted-foreground">Generating seating plan...</p>
                    </div>
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

                {state.seatingPlan && state.message === 'success' && (
                    <div className="space-y-6 pt-4">
                        <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800 dark:text-green-300">Seating Plan Generated Successfully</AlertTitle>
                        </Alert>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {state.seatingPlan.map(batch => (
                                <Card key={batch.batchNumber}>
                                    <CardHeader>
                                        <CardTitle>Batch {batch.batchNumber}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-sm">
                                            {batch.students.map(student => (
                                                <li key={student.rollNumber} className="flex justify-between">
                                                    <span>{student.name} ({student.rollNumber})</span>
                                                    <span className="font-bold">{student.seat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
