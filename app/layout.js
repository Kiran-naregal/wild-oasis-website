import Header from "./_components/Header";


import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-50 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 py-12 px-8 grid">
          <main className="mx-auto max-w-7xl w-full">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
