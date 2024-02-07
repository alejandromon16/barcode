// TicketGenerator.tsx
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

interface TicketGeneratorProps {
  qrCodeData: string;
}

const TicketGenerator: React.FC<TicketGeneratorProps> = ({ qrCodeData }) => {
  return (
    <ViewShot captureMode="mount" options={{ format: 'png', quality: 1.0 }}>
      {/* Your ticket UI with logo, QR code, etc. */}
      <QRCode value={qrCodeData} />
      {/* Add other components like logo, text, etc. */}
    </ViewShot>
  );
};

export default TicketGenerator;

