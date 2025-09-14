import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GraduationCap } from 'lucide-react';

export function ChildDetailsCard() {
  const student = {
    name: 'Aarav Gupta',
    grade: 'Grade 10, Section A',
    avatar: 'https://picsum.photos/seed/s1/100/100',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          My Child
        </CardTitle>
        <CardDescription>
          Details of your child enrolled in the school.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{student.name}</p>
          <p className="text-muted-foreground">{student.grade}</p>
        </div>
      </CardContent>
    </Card>
  );
}
