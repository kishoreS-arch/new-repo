import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import Image from 'next/image';

export default function StudentQrCodePage() {
  const studentId = 's1';
  const studentName = 'Aarav Gupta';
  const qrData = JSON.stringify({ studentId, studentName });
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            My QR Code
          </CardTitle>
          <CardDescription>
            Teachers can scan this code to view your details and mark attendance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Image
            src={qrCodeUrl}
            alt="Student QR Code"
            width={250}
            height={250}
            className="rounded-lg"
          />
          <div className="text-center">
            <p className="font-semibold text-lg">{studentName}</p>
            <p className="text-muted-foreground">Student ID: {studentId}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
