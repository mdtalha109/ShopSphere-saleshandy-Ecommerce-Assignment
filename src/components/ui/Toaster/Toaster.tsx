"use client";

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#111827',
          padding: '5px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          border: '1px solid #275df5',
        },
        success: {
          iconTheme: {
            primary: '#106146',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
