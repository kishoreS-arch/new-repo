'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ClipboardCheck } from 'lucide-react';

export function AttendancePercentageCard() {
  const attendance = 85; // Example percentage

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          Attendance
        </CardTitle>
        <CardDescription>
          Your child's attendance percentage for the current semester.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Overall Attendance</span>
            <span className="font-semibold">{attendance}%</span>
        </div>
        <Progress value={attendance} aria-label={`${attendance}% attendance`} />
        {attendance < 80 && (
            <p className="text-xs text-destructive">Attendance is below the required 80% minimum.</p>
        )}
      </CardContent>
    </Card>
  );
}
