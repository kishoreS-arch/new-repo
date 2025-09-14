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
import { Download, TrendingUp, Award, Percent } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { progressData } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const chartConfig = {
  marks: {
    label: 'Marks',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const getGrade = (marks: number) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    if (marks >= 40) return 'E';
    return 'F';
}

const totalMarks = progressData.reduce((acc, item) => acc + item.marks, 0);
const totalMaxMarks = progressData.length * 100;
const overallPercentage = (totalMarks / totalMaxMarks) * 100;
const overallGrade = getGrade(overallPercentage);

export function ProgressCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Report
        </CardTitle>
        <CardDescription>Your performance in the recent exams.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <Card>
                <CardHeader className='flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium'>Overall Percentage</CardTitle>
                    <Percent className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{overallPercentage.toFixed(2)}%</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className='flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium'>Overall Grade</CardTitle>
                    <Award className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{overallGrade}</div>
                </CardContent>
            </Card>
        </div>

        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={progressData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="marks" fill="var(--color-marks)" radius={4} />
          </BarChart>
        </ChartContainer>

         <div>
          <h3 className="text-lg font-semibold mb-2">Detailed Marks</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-right">Marks (out of 100)</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progressData.map((item) => (
                  <TableRow key={item.subject}>
                    <TableCell className="font-medium">{item.subject}</TableCell>
                    <TableCell className="text-right">{item.marks}</TableCell>
                    <TableCell className="text-right font-semibold">{getGrade(item.marks)}</TableCell>
                  </TableRow>
                ))}
                 <TableRow className="bg-muted/50 font-bold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{totalMarks} / {totalMaxMarks}</TableCell>
                    <TableCell className="text-right">{overallGrade}</TableCell>
                 </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </CardFooter>
    </Card>
  );
}
