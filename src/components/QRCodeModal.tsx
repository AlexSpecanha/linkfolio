import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function QRCodeModal({ isOpen, onClose, url }: QRCodeModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then(dataUrl => setQrCodeDataUrl(dataUrl))
        .catch(err => console.error('Error generating QR code:', err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">QR Code</h2>

          <div className="flex flex-col items-center gap-6">
            {qrCodeDataUrl && (
              <img
                src={qrCodeDataUrl}
                alt="QR Code"
                className="w-64 h-64"
              />
            )}

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Baixar
            </button>

            <p className="text-sm text-gray-500 text-center">
              Escaneie este QR Code para acessar:<br />
              <span className="font-medium text-gray-700">{url}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}