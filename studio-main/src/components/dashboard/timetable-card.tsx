
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { allSubjects, teachers, students, classTimetables as initialClassTimetables } from '@/lib/data';
import type { Role, TimetableSlot } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Pencil, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface TimetableCardProps {
  role: Role;
}

const getBadgeVariant = (subject: string) => {
  if (subject === 'Break Time') return 'outline';
  switch (subject) {
    case 'Math':
      return 'default';
    case 'Physics':
      return 'destructive';
    case 'Chemistry':
      return 'destructive';
    case 'Biology':
      return 'destructive';
    case 'English':
      return 'secondary';
    case 'History':
      return 'outline';
    case 'Geography':
      return 'outline';
    case 'Computer Science':
      return 'default';
    default:
      return 'default';
  }
};

const uniqueClasses = [...new Set(students.map(s => s.class))];
const uniqueSections = [...new Set(students.map(s => s.section))];

export function TimetableCard({ role }: TimetableCardProps) {
  const timetableRef = useRef<HTMLDivElement>(null);
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [classTimetables, setClassTimetables] = useState(initialClassTimetables);
  
  // Local state for timetable to allow editing
  const [currentTimetable, setCurrentTimetable] = useState<TimetableSlot[]>([]);
  
  const [editedTimetable, setEditedTimetable] = useState<TimetableSlot[]>(currentTimetable);

  useEffect(() => {
    const timetableKey = `${selectedClass}-${selectedSection}`;
    const timetableData = classTimetables[timetableKey] || [];
    setCurrentTimetable(timetableData);
    setEditedTimetable(timetableData);
  }, [selectedClass, selectedSection, classTimetables]);


  const handleClassOrSectionChange = (value: string, type: 'class' | 'section') => {
    const newClass = type === 'class' ? value : selectedClass;
    const newSection = type === 'section' ? value : selectedSection;
    setSelectedClass(newClass);
    setSelectedSection(newSection);
  };

  const handleEditSlot = (slotId: string, field: 'subject' | 'teacher', value: string) => {
    setEditedTimetable(prev => 
      prev.map(slot => slot.id === slotId ? { ...slot, [field]: value } : slot)
    );
  };

  const handleSaveChanges = () => {
    const timetableKey = `${selectedClass}-${selectedSection}`;
    setClassTimetables(prev => ({
      ...prev,
      [timetableKey]: editedTimetable,
    }));
    setEditDialogOpen(false);
    toast({
        title: 'Timetable Updated!',
        description: `The schedule for ${selectedClass} - ${selectedSection} has been saved.`,
    });
  };

  const handleDownload = () => {
    if (timetableRef.current) {
      html2canvas(timetableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('timetable.pdf');
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Today's Timetable
                </CardTitle>
                <CardDescription>
                    {role === 'admin' ? 'View and manage class schedules.' : `Your schedule for ${selectedClass}, Section ${selectedSection}.`}
                </CardDescription>
            </div>
            {role === 'admin' && (
                <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Schedule
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Edit Timetable for {selectedClass} - Section {selectedSection}</DialogTitle>
                        <DialogDescription>
                        Modify the subjects and teachers for today's schedule. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {editedTimetable.map((slot) => (
                        <div key={slot.id} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`time-${slot.id}`} className="text-right">
                            {slot.time}
                            </Label>
                            <Select 
                                value={slot.subject}
                                onValueChange={(value) => handleEditSlot(slot.id, 'subject', value)}
                                disabled={slot.subject === 'Break Time'}
                            >
                            <SelectTrigger className="col-span-2">
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {allSubjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                    {subject}
                                </SelectItem>
                                ))}
                                <SelectItem value="Break Time">Break Time</SelectItem>
                            </SelectContent>
                            </Select>
                            <Select 
                                value={slot.teacher}
                                onValueChange={(value) => handleEditSlot(slot.id, 'teacher', value)}
                                disabled={slot.subject === 'Break Time'}
                            >
                            <SelectTrigger className="col-span-1">
                                <SelectValue placeholder="Select Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.name}>
                                    {teacher.name}
                                </SelectItem>
                                ))}
                                 <SelectItem value="Morning Break">Morning Break</SelectItem>
                                 <SelectItem value="Lunch Break">Lunch Break</SelectItem>
                                 <SelectItem value="Evening Break">Evening Break</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                             <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSaveChanges}>Save changes</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
        {role === 'admin' && (
            <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                    <Label>Class</Label>
                    <Select value={selectedClass} onValueChange={(value) => handleClassOrSectionChange(value, 'class')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Section</Label>
                    <Select value={selectedSection} onValueChange={(value) => handleClassOrSectionChange(value, 'section')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueSections.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )}
      </CardHeader>
      <CardContent ref={timetableRef} className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTimetable.length > 0 ? currentTimetable.map((slot) => (
              <TableRow key={slot.id} className={slot.subject === 'Break Time' ? 'bg-muted/50' : ''}>
                <TableCell className="font-medium">{slot.time}</TableCell>
                <TableCell>
                  {slot.subject === 'Break Time' ? (
                     <Badge variant={getBadgeVariant(slot.subject)}>
                      {slot.subject}
                    </Badge>
                  ) : (
                    <Button variant="link" asChild className="p-0 h-auto">
                        <Link href="/student/syllabus">
                           <Badge variant={getBadgeVariant(slot.subject)}>
                            {slot.subject}
                           </Badge>
                        </Link>
                    </Button>
                  )}
                </TableCell>
                <TableCell>{slot.teacher}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No timetable available for {selectedClass} - {selectedSection}.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
