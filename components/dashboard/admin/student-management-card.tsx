'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { students } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { teachers } from '@/lib/data';

export function StudentManagementCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');

  const uniqueClasses = ['all', ...Array.from(new Set(students.map(s => s.class)))];
  const uniqueSections = ['all', 'A', 'B'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    const matchesSection = sectionFilter === 'all' || student.section === sectionFilter;
    return matchesSearch && matchesClass && matchesSection;
  });

  const getClassTeacher = (className: string, section: string) => {
    // This is a mock logic. In a real app, this would be more robust.
    const teacher = teachers.find(t => t.classes.includes(className));
    return teacher ? teacher.name : 'N/A';
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClasses.map(c => (
                <SelectItem key={c} value={c}>
                  {c === 'all' ? 'All Classes' : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Select value={sectionFilter} onValueChange={setSectionFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by section" />
            </SelectTrigger>
            <SelectContent>
              {uniqueSections.map(s => (
                <SelectItem key={s} value={s}>
                  {s === 'all' ? 'All Sections' : `Section ${s}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                 <TableHead>Class Teacher</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.slice(0, 25).map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{getClassTeacher(student.class, student.section)}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredStudents.length > 25 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
                And {filteredStudents.length - 25} more students...
            </p>
        )}
      </CardContent>
    </Card>
  );
}
