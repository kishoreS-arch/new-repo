import { ClassReminder } from '@/components/class-reminder';
import { CustomEventsCard } from '@/components/dashboard/custom-events-card';
import { MockTestCard } from '@/components/dashboard/mock-test-card';
import { NewsUpdatesCard } from '@/components/dashboard/news-updates-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { SyllabusCard } from '@/components/dashboard/syllabus-card';
import { WeeklyTimetableCard } from '@/components/dashboard/weekly-timetable-card';

export default function StudentDashboardPage() {
  return (
    <>
      <ClassReminder role="student" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <WeeklyTimetableCard />
        </div>
        <NewsUpdatesCard />
        <div className="lg:col-span-2">
          <ProgressCard />
        </div>
        <SyllabusCard role="student" />
        <div className="lg:col-span-2">
          <MockTestCard />
        </div>
        <CustomEventsCard />
      </div>
    </>
  );
}
