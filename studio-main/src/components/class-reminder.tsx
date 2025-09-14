
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { timetable, weeklyTimetable } from '@/lib/data';
import type { Role, TimetableSlot } from '@/lib/types';
import { parse, differenceInMinutes, isBefore, isSameDay } from 'date-fns';

interface ClassReminderProps {
  role: 'student' | 'teacher';
}

const getTodayTimetable = (): TimetableSlot[] => {
  const now = new Date();
  const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  if (weeklyTimetable[dayOfWeek]) {
    return weeklyTimetable[dayOfWeek].filter(Boolean) as TimetableSlot[];
  }
  return timetable;
};

export function ClassReminder({ role }: ClassReminderProps) {
  const { toast } = useToast();

  useEffect(() => {
    const checkClasses = () => {
      const now = new Date();
      const todaySchedule = getTodayTimetable();

      todaySchedule.forEach((slot) => {
        if (slot.subject === 'Break Time') return;

        const [startTimeStr] = slot.time.split(' - ');
        // Parsing time like "09:00"
        const classTime = parse(startTimeStr, 'HH:mm', new Date());

        if (isSameDay(now, classTime) && isBefore(now, classTime)) {
            const minutesUntilClass = differenceInMinutes(classTime, now);

            if (minutesUntilClass > 0 && minutesUntilClass <= 5) {
                // Check if a reminder for this class has already been shown
                const reminderKey = `reminder_${role}_${slot.id}`;
                const hasBeenShown = sessionStorage.getItem(reminderKey);

                if (!hasBeenShown) {
                    toast({
                        title: 'Class Reminder',
                        description: `${slot.subject} with ${slot.teacher} is starting in ${minutesUntilClass} minutes.`,
                    });
                    sessionStorage.setItem(reminderKey, 'true');
                }
            }
        }
      });
    };

    // Clear session storage on new day
    const lastVisit = sessionStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    if (lastVisit !== today) {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith('reminder_')) {
                sessionStorage.removeItem(key);
            }
        });
        sessionStorage.setItem('lastVisit', today);
    }

    const intervalId = setInterval(checkClasses, 60 * 1000); // Check every minute

    // Initial check
    checkClasses();

    return () => clearInterval(intervalId);
  }, [toast, role]);

  return null; // This component does not render anything
}
