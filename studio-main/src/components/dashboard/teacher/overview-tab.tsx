
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teacherSubjects, todaysSchedule } from "@/lib/data";
import { Calendar, Book, Clock, Users } from "lucide-react";

export function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaysSchedule.map((item, index) => (
            <div key={index} className="p-4 rounded-lg border flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.subject}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{item.time}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{item.location}</span>
                </div>
              </div>
              <Badge variant={item.type === 'Theory' ? 'default' : 'secondary'}>{item.type}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            My Subjects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teacherSubjects.map((subject, index) => (
            <div key={index} className="p-4 rounded-lg border flex justify-between items-center">
              <div>
                <p className="font-semibold">{subject.name}</p>
                <p className="text-sm text-muted-foreground">{subject.classes.join(', ')}</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
