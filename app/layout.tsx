import "./globals.css";

export const metadata = {
  title: "EURO CARS | دعوة المسوّق",
  description: "افتح دعوة المسوّق وتابع التسجيل في تطبيق EURO CARS.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
