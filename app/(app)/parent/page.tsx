import { ChildDetailsCard } from '@/components/dashboard/parent/child-details-card';
import { AttendancePercentageCard } from '@/components/dashboard/parent/attendance-percentage-card';
import { TeacherContactsCard } from '@/components/dashboard/parent/teacher-contacts-card';
import { ProgressCard } from '@/components/dashboard/progress-card';

export default function ParentDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ChildDetailsCard />
      </div>
      <div className="lg:col-span-2 grid content-start gap-6">
        <AttendancePercentageCard />
        <TeacherContactsCard />
      </div>
      <div className="lg:col-span-3">
        <ProgressCard />
      </div>
    </div>
  );
}
