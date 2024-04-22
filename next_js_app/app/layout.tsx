import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./ui/SideNav";
import styles from "./page.module.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "next js pet",
  description: "next js project is for study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.screen}>

          <SideNav />
          <div className="wrapper">
            <div className={styles.work_place}>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
