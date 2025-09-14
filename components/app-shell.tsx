'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import {
  BookCopy,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  QrCode,
  Shield,
  TestTube2,
  TrendingUp,
  User,
  UserCheck,
  Users,
  ChevronDown,
  Bell,
  Settings,
  BarChart2,
  FileCheck,
  UserPlus,
  Heart,
  Book,
  Folder,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/header';
import { UserNav } from '@/components/user-nav';
import { Chatbot } from '@/components/chatbot';
import type { Role } from '@/lib/types';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

interface AppShellProps {
  children: React.ReactNode;
}

const NavLink = ({ href, children, currentPath }: { href: string; children: React.ReactNode; currentPath: string }) => (
    <Link href={href} passHref>
        <SidebarMenuButton
        asChild
        isActive={currentPath === href}
        tooltip={{
            children: <div className="p-2">{children}</div>,
            side: 'right',
            align: 'center',
        }}
        >
        <span>{children}</span>
        </SidebarMenuButton>
    </Link>
);


const AdminSidebar = ({ pathname }: { pathname: string }) => {
  const { t } = useLanguage();
  
  return (
    <>
      <SidebarMenuItem>
         <NavLink href="/admin" currentPath={pathname}>
            <LayoutDashboard />
            <span>{t('dashboard')}</span>
        </NavLink>
      </SidebarMenuItem>
      <SidebarMenuItem>
         <NavLink href="/admin/timetable" currentPath={pathname}>
            <CalendarDays />
            <span>My Timetable</span>
        </NavLink>
      </SidebarMenuItem>
       <SidebarMenuItem>
         <NavLink href="/admin/attendance" currentPath={pathname}>
            <ClipboardCheck />
            <span>Attendance</span>
        </NavLink>
      </SidebarMenuItem>
       <SidebarMenuItem>
         <NavLink href="/admin/gradebook" currentPath={pathname}>
            <Book />
            <span>Gradebook</span>
        </NavLink>
      </SidebarMenuItem>
       <SidebarMenuItem>
         <NavLink href="/admin/materials" currentPath={pathname}>
            <Folder />
            <span>Materials</span>
        </NavLink>
      </SidebarMenuItem>
       <SidebarMenuItem>
         <NavLink href="/admin/notifications" currentPath={pathname}>
            <Bell />
            <span>{t('notifications')}</span>
        </NavLink>
      </SidebarMenuItem>
       <SidebarMenuItem>
         <NavLink href="/admin/settings" currentPath={pathname}>
            <Settings />
            <span>{t('settings')}</span>
        </NavLink>
      </SidebarMenuItem>
    </>
  );
};


const menuItems = (t: (key: string) => string): { [key in Role]: { href: string; icon: React.ElementType; label: string }[] } => ({
  admin: [], // Admin uses a custom sidebar
  teacher: [
    { href: '/teacher', icon: LayoutDashboard, label: t('dashboard') },
    { href: '/teacher/timetable', icon: CalendarDays, label: t('timetable') },
    { href: '/teacher/attendance', icon: ClipboardCheck, label: t('attendance') },
    { href: '/teacher/syllabus', icon: BookCopy, label: t('syllabus') },
  ],
  student: [
    { href: '/student', icon: LayoutDashboard, label: t('dashboard') },
    { href: '/student/timetable', icon: CalendarDays, label: t('timetable') },
    { href: '/student/progress-report', icon: TrendingUp, label: t('progressReport') },
    { href: '/student/syllabus', icon: BookCopy, label: t('syllabus') },
    { href: '/student/mock-test', icon: TestTube2, label: t('mockTest') },
    { href: '/student/qr-code', icon: QrCode, label: t('qrCode') },
  ],
  parent: [
    { href: '/parent', icon: LayoutDashboard, label: t('dashboard') },
  ]
});

const roleIcons = {
  admin: <Shield className="size-8" />,
  teacher: <UserCheck className="size-8" />,
  student: <GraduationCap className="size-8" />,
  parent: <Users className="size-8" />,
};

const roleNames = (t: (key: string) => string) => ({
  admin: t('principal'),
  teacher: t('teacher'),
  student: t('student'),
  parent: t('parent'),
});

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const role = (pathname.split('/')[1] || 'student') as Role;
  const isMobile = useIsMobile();
  const currentMenuItems = menuItems(t)[role] || menuItems(t).student;
  const currentRoleNames = roleNames(t);

  return (
    <SidebarProvider
      defaultOpen={!isMobile}
    >
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center justify-center gap-2 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10">
              {roleIcons[role]}
            </div>
            <div className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              {currentRoleNames[role]}
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {role === 'admin' ? <AdminSidebar pathname={pathname} /> : (
              currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{
                        children: item.label,
                        side: 'right',
                        align: 'center',
                      }}
                    >
                      <span>
                        <item.icon />
                        <span>{item.label}</span>
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
            <UserNav role={role} />
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <AppHeader role={role} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      <Chatbot />
    </SidebarProvider>
  );
}
