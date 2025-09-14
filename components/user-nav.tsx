import Link from 'next/link';
import {
  LogOut,
  User,
  GraduationCap,
  UserCheck,
  Shield,
  Users
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import type { Role } from '@/lib/types';

interface UserNavProps {
    role: Role;
}

const roleData = {
    admin: { name: 'Principal', icon: Shield, avatar: 'https://picsum.photos/seed/admin/100/100' },
    teacher: { name: 'Teacher User', icon: UserCheck, avatar: 'https://picsum.photos/seed/teacher/100/100' },
    student: { name: 'Student User', icon: GraduationCap, avatar: 'https://picsum.photos/seed/student/100/100' },
    parent: { name: 'Parent User', icon: Users, avatar: 'https://picsum.photos/seed/parent/100/100' },
}

export function UserNav({ role }: UserNavProps) {
  const {name, icon: Icon, avatar} = roleData[role];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-full justify-start gap-2 px-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
           <div className="text-left group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{role === 'admin' ? 'Principal' : role}</p>
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {name.toLowerCase().replace(' ','')}@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
