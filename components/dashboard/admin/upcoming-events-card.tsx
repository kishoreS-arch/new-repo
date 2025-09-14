import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export function UpcomingEventsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
         <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md border p-0"
            />
      </CardContent>
    </Card>
  );
}
