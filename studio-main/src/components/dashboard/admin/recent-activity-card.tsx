import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const activities = [
    { text: "Attendance marked for Class 9-B Mathematics", time: "2 hours ago" },
    { text: "Mock test created for Algebra unit", time: "1 day ago" },
    { text: "Uploaded study materials for Geometry", time: "2 days ago" },
    { text: "Grades entered for last week's quiz", time: "3 days ago" },
];

export function RecentActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
              <div>
                <p className="text-sm">{activity.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
