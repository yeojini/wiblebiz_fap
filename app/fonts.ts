import localFont from 'next/font/local';

export const kiaSignature = localFont({
  src: [
    {
      path: '../public/fonts/Kia-Signature-Fix-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Kia-Signature-Fix-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-kia-signature',
  display: 'swap',
});
