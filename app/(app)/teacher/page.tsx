
'use client';

import { useState } from 'react';
import { Clock, Users, BookOpen, CheckCircle } from 'lucide-react';
import { TeacherStatsCard } from '@/components/dashboard/teacher/teacher-stats-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from '@/components/dashboard/teacher/overview-tab';
import { TimetableCard } from '@/components/dashboard/timetable-card';

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <TeacherStatsCard title="Today's Classes" value="3" icon={Clock} />
        <TeacherStatsCard title="Total Students" value="5" icon={Users} />
        <TeacherStatsCard title="Subjects" value="3" icon={BookOpen} />
        <TeacherStatsCard title="Present Today" value="0/5" icon={CheckCircle} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timetable">My Timetable</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="timetable">
            <TimetableCard role='teacher' />
        </TabsContent>
      </Tabs>
    </div>
  );
}
