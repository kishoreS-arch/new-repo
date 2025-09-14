import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { newsUpdates } from '@/lib/data';
import { Newspaper } from 'lucide-react';

export function NewsUpdatesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Daily News & Updates
        </CardTitle>
        <CardDescription>
          Latest announcements and school news.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsUpdates.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <Separator className="my-4" />}
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
