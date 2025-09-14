import { StatsCard } from '@/components/dashboard/admin/stats-card';
import { QuickActionsCard } from '@/components/dashboard/admin/quick-actions-card';
import { RecentActivityCard } from '@/components/dashboard/admin/recent-activity-card';
import { SystemHealthCard } from '@/components/dashboard/admin/system-health-card';
import { Users, Calendar, ClipboardCheck, Award } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="My Classes Today" value="6" icon={Calendar} />
        <StatsCard title="Students Taught" value="245" icon={Users} />
        <StatsCard title="Attendance Taken" value="4/6" icon={ClipboardCheck} />
        <StatsCard title="Pending Grades" value="12" icon={Award} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <QuickActionsCard />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <RecentActivityCard />
        </div>
        <div className="lg:col-span-1 space-y-6">
            <SystemHealthCard />
        </div>
      </div>
    </div>
  );
}
