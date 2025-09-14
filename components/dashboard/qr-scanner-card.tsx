import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QrCode, Camera } from 'lucide-react';

export function QrScannerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Student QR Scanner
        </CardTitle>
        <CardDescription>
          Quickly access student details by scanning their ID card.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Scan QR Code</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR Code Scanner</DialogTitle>
              <DialogDescription>
                Point the camera at a student's QR code.
              </DialogDescription>
            </DialogHeader>
            <div className="flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted">
              <div className="text-center text-muted-foreground">
                <Camera className="mx-auto h-12 w-12" />
                <p>QR Scanner will be implemented here.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
