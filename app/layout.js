import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import DialogLoading from "@/components/client/dialog-loading";
import useRouteLoading from "@/hooks/use-route-loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jasamarga",
  description: "Front End Test Jasamarga",
};

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <body className={inter.className}>
        {" "}

        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <DialogLoading />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
