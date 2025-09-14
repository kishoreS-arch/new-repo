'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { syllabus } from '@/lib/data';
import type { Role } from '@/lib/types';
import { BookCopy, Upload, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SyllabusCardProps {
  role: Role;
}

export function SyllabusCard({ role }: SyllabusCardProps) {
  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
        title: 'File Uploaded',
        description: 'The syllabus has been successfully uploaded.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BookCopy className="h-5 w-5" />
            Syllabus
        </CardTitle>
        <CardDescription>
          {role === 'teacher'
            ? 'Upload and manage unit-wise syllabus.'
            : 'Download the latest syllabus for your subjects.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {role === 'teacher' && (
          <form onSubmit={handleUpload} className="mb-6 flex items-center gap-2">
            <Input type="file" required />
            <Button type="submit" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </form>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {syllabus.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.subject}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
