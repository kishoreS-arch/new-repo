import { UserManagementCard } from '@/components/dashboard/user-management-card';

export default function AdminUsersPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">User Management</h1>
        <p className="text-muted-foreground mb-6">Create and manage user accounts</p>
        <UserManagementCard />
    </div>
  )
}
