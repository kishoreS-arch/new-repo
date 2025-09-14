import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { students, teachers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Users, MoreVertical, UserPlus, ShieldAlert, UserCog } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';

const allUsers = [
  { id: 'admin1', name: 'Kishore', role: 'Admin', email: 'kishore.sec.in' },
  ...students.slice(0, 3).map((s) => ({ ...s, role: 'Student', email: `${s.name.split(' ')[0].toLowerCase()}@school.com` })),
  ...teachers.slice(0, 2).map((t) => ({ ...t, role: 'Teacher', email: `${t.name.split(' ')[1].toLowerCase()}@school.com` })),
].sort((a, b) => a.name.localeCompare(b.name));

const roleIcons = {
    Admin: <ShieldAlert className="h-6 w-6 text-red-500" />,
    Teacher: <UserCog className="h-6 w-6 text-blue-500" />,
    Student: <Users className="h-6 w-6 text-green-500" />,
}

export function UserManagementCard() {
  return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus />
            Add New User
          </CardTitle>
          <CardDescription>
            Create new user accounts for the system
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
           <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Create User</Button>
            </div>
            <div>
                 <h3 className="text-lg font-medium mb-4">Existing Users</h3>
                 <div className="space-y-4">
                    {allUsers.map((user, index) => (
                        <React.Fragment key={user.id}>
                         {index > 0 && <Separator />}
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <p className="font-semibold">{user.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Teacher' ? 'default' : 'secondary'}>{user.role}</Badge>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">Delete User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                         </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
  );
}
