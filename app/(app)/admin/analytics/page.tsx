
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, Percent } from "lucide-react";
import { subjectPopularityData } from '@/lib/data';
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/language-context";

const StudentPerformanceChart = dynamic(() => import('@/components/dashboard/admin/analytics/student-performance-chart'), { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />
});
const SubjectPopularityChart = dynamic(() => import('@/components/dashboard/admin/analytics/subject-popularity-chart'), { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />
});
const EnrollmentTrendChart = dynamic(() => import('@/components/dashboard/admin/analytics/enrollment-trend-chart'), { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />
});
const TeacherAttendanceChart = dynamic(() => import('@/components/dashboard/admin/analytics/teacher-attendance-chart'), { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />
});

export default function AnalyticsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('analyticsDashboard')}</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalStudents')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,420</div>
            <p className="text-xs text-muted-foreground">{t('fromLastMonth')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('subjectDiversity')}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjectPopularityData.length}</div>
            <p className="text-xs text-muted-foreground">{t('totalSubjectsOffered')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('overallPerformance')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5%</div>
            <p className="text-xs text-muted-foreground">{t('averageStudentScore')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('teacherAttendance')}</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">{t('averagePresenceRate')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentPerformanceChart />
        <SubjectPopularityChart />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentTrendChart />
        <TeacherAttendanceChart />
      </div>
    </div>
  );
}
