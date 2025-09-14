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
import { students } from '@/lib/data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ClipboardCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function AttendanceCard() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: 'Success!',
      description: 'Attendance has been submitted.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          Mark Attendance
        </CardTitle>
        <CardDescription>
          Mark attendance for students in Grade 10, Section A for today.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.slice(0, 5).map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/40/40`} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      defaultValue="present"
                      className="flex justify-center space-x-2 sm:space-x-4"
                      name={`attendance-${student.id}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="present" id={`p-${student.id}`} />
                        <Label htmlFor={`p-${student.id}`}>Present</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="absent" id={`a-${student.id}`} />
                        <Label htmlFor={`a-${student.id}`}>Absent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="late" id={`l-${student.id}`} />
                        <Label htmlFor={`l-${student.id}`}>Late</Label>
                      </div>
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Submit Attendance
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
