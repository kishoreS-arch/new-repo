
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
import { weeklyTimetable, teacherWeeklyTimetable } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { Role } from '@/lib/types';

interface WeeklyTimetableCardProps {
  role: Role;
}

const getBadgeVariant = (subject: string) => {
    if (subject === 'Break Time') return 'outline';
    switch (subject) {
        case 'Math': return 'default';
        case 'Physics': return 'destructive';
        case 'Chemistry': return 'destructive';
        case 'Biology': return 'destructive';
        case 'English': return 'secondary';
        case 'History': return 'outline';
        case 'Geography': return 'outline';
        case 'Computer Science': return 'default';
        default: return 'default';
    }
}

export function WeeklyTimetableCard({ role }: WeeklyTimetableCardProps) {
  const timetableRef = useRef<HTMLDivElement>(null);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00 - 09:50',
    '09:50 - 10:40',
    '10:40 - 11:00',
    '11:00 - 11:50',
    '11:50 - 12:40',
    '12:40 - 01:30',
    '01:30 - 02:20',
    '02:20 - 03:10',
  ];

  const currentTimetable = role === 'teacher' ? teacherWeeklyTimetable : weeklyTimetable;
  const isTeacher = role === 'teacher';

    const handleDownload = () => {
    if (timetableRef.current) {
      html2canvas(timetableRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('weekly-timetable.pdf');
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Weekly Timetable
        </CardTitle>
        <CardDescription>Your class schedule for the week.</CardDescription>
      </CardHeader>
      <CardContent ref={timetableRef}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              {timeSlots.map((time, index) => (
                <TableHead key={index} className="text-center">{time}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day) => (
              <TableRow key={day}>
                <TableCell className="font-semibold">{day}</TableCell>
                {currentTimetable[day.toLowerCase()].map((period, index) => (
                  <TableCell key={index} className="text-center">
                    {period ? (
                        period.subject === 'Break Time' ? (
                            <div className="font-semibold text-muted-foreground">{period.teacher}</div>
                        ) : (
                            <div>
                                {isTeacher ? (
                                     <Badge variant={getBadgeVariant(period.subject)}>{period.subject}</Badge>
                                ) : (
                                    <Button variant="link" asChild className="p-0 h-auto text-center block">
                                        <Link href="/student/syllabus">
                                            <Badge variant={getBadgeVariant(period.subject)}>{period.subject}</Badge>
                                        </Link>
                                    </Button>
                                )}
                                <p className="text-xs text-muted-foreground">{period.teacher}</p>
                            </div>
                        )
                    ) : (
                      '-'
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
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
