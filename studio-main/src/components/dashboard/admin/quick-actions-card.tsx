import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Book, Folder } from "lucide-react";
import Link from "next/link";

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used features for your role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/teacher/attendance" className="flex items-center gap-2">
            <ClipboardCheck />
            Take Attendance
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <Book />
          Enter Grades
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <Folder />
          Upload Materials
        </Button>
      </CardContent>
    </Card>
  );
}
