import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const healthMetrics = [
    { name: "Server Uptime", value: 99.9, color: "bg-green-500" },
    { name: "Data Sync", value: 98.5, color: "bg-blue-500" },
    { name: "User Satisfaction", value: 96.2, color: "bg-yellow-500" },
];

export function SystemHealthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthMetrics.map((metric) => (
            <div key={metric.name}>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <span className="text-sm font-medium text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
