import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { Loginoptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AccountSidebar from "@/components/AccountSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkerrr - Link the world with you",
  description: "Generated by create next app",
};

export default async function AppLayout({ children }) {

  const session = await getServerSession(Loginoptions)

  if (!session) {
    return redirect("/")
  }

  return (
    <html lang="en">
      <body className="poppins">

        <div className="flex">
          <div className="fixed"> 
            <AccountSidebar image={session?.user?.image} />
          </div>

          <div className="pl-[15rem] bg-gray-200 w-full h-[100vh]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
