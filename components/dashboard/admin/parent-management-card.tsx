'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { parents, students } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ParentManagementCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  const studentMap = useMemo(() => {
    const map = new Map();
    students.forEach(student => map.set(student.id, student));
    return map;
  }, []);

  const uniqueClasses = ['all', ...Array.from(new Set(students.map(s => s.class)))];

  const filteredParents = useMemo(() => {
    return parents.filter(parent => {
      const child = studentMap.get(parent.childId);
      if (!child) return false;

      const matchesSearch = 
        parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = classFilter === 'all' || child.class === classFilter;

      return matchesSearch && matchesClass;
    });
  }, [parents, studentMap, searchTerm, classFilter]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by parent or child name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by child's class" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClasses.map(c => (
                <SelectItem key={c} value={c}>
                  {c === 'all' ? 'All Classes' : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parent Name</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Child Name</TableHead>
                <TableHead>Child Class</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParents.slice(0, 50).map((parent) => {
                const child = studentMap.get(parent.childId);
                return (
                  <TableRow key={parent.id}>
                    <TableCell className="font-medium">{parent.name}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                    <TableCell>{child?.name || 'N/A'}</TableCell>
                    <TableCell>{child ? `${child.class} - ${child.section}`: 'N/A'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
         {filteredParents.length > 50 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
                And {filteredParents.length - 50} more parents...
            </p>
        )}
      </CardContent>
    </Card>
  );
}
