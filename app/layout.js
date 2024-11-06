import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { dbConnect } from "@/service/mongo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Edu Connect",
  description: "Explore",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body
        className={`${cn(
          geistMono.className,
          geistMono.className,
          poppins.className
        )} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* this was inital body class 
        className = `${geistSans.variable} ${
          geistMono.variable
        } antialiased` */}
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
