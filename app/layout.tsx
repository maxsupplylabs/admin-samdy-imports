import "./globals.css";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { StateContext } from "@/context/state-context";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { BizProductContextProvider } from "@/context/Business-Product-Edit";
import AdminHeader from "@/components/admin/header";
const inter = Inter({
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Samdy Administration",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <StateContext>
            <Toaster />
            <div>
              <div className="sticky top-0 z-50">
                <AdminHeader />
              </div>
              <BizProductContextProvider>{children}</BizProductContextProvider>
            </div>
          </StateContext>
        </AuthProvider>
      </body>
    </html>
  );
}
