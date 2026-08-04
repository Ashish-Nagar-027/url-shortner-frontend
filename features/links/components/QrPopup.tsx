"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";

const QrCodeC = ({
  open,
  onOpenChange,
  shortUrl,
}: {
  open: boolean;
  onOpenChange: () => void;
  shortUrl: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl ">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="font-bold text-lg">Qr Code</DialogTitle>
        </DialogHeader>

        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%", background:'#fff' }}
          value={shortUrl}
          viewBox={`0 0 256 256`}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeC;
