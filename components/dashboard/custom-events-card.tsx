
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { customEvents as initialCustomEvents } from '@/lib/custom-events';
import type { CustomEvent } from '@/lib/types';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from '@/hooks/use-toast';

export function CustomEventsCard() {
  const [events, setEvents] = useState<CustomEvent[]>(initialCustomEvents);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CustomEvent | null>(null);

  const handleAddOrUpdateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: CustomEvent = {
      id: currentEvent?.id || `ce${Date.now()}`,
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      description: formData.get('description') as string,
    };

    if (currentEvent) {
      // Update
      setEvents(events.map(ev => ev.id === currentEvent.id ? newEvent : ev));
       toast({ title: 'Event Updated!', description: 'Your event has been successfully updated.' });
    } else {
      // Add
      setEvents([...events, newEvent]);
      toast({ title: 'Event Added!', description: 'Your new event has been created.' });
    }

    setCurrentEvent(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (event?: CustomEvent) => {
    setCurrentEvent(event || null);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(ev => ev.id !== eventId));
    toast({ title: 'Event Deleted', description: 'The event has been removed.', variant: 'destructive' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>My Custom Events</CardTitle>
            <CardDescription>Manage your personal schedule.</CardDescription>
        </div>
        <Button size="sm" onClick={() => openEditDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length > 0 ? events.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.date} at {event.time}
                </p>
                <p className="text-xs text-muted-foreground">{event.description}</p>
              </div>
              <div className="flex gap-2">
                 <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          )) : (
            <p className="text-center text-muted-foreground py-4">No custom events yet. Add one to get started!</p>
          )}
        </div>
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <form onSubmit={handleAddOrUpdateEvent}>
                <DialogHeader>
                    <DialogTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                    <DialogDescription>
                    Fill in the details for your personal event.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={currentEvent?.title} required />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" type="date" defaultValue={currentEvent?.date} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input id="time" name="time" type="time" defaultValue={currentEvent?.time} required />
                        </div>
                     </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={currentEvent?.description} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">{currentEvent ? 'Save Changes' : 'Add Event'}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
