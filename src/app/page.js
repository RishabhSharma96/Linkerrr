import HeroForm from "@/forms/HeroForm";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Loginoptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(Loginoptions)

  return (
    <div>
      <div className="h-[91vh] w-full bg-gray-200 flex">

        <div className="flex justify-center items-center w-[60%] flex-col gap-3">
          <p className="text-7xl w-[80%] font-extrabold text-purple-700">Flaut what you are. In one, with simple link in bio.</p>
          <p className="text-lg w-[80%] text-purple-500">Simplify your digital footprint - one link, endless possibilities. Connect with on Instagram, TikTok, Twitter, YouTube, and more for a curated experience.</p>
          <HeroForm user_name={session?.user} />
        </div>

        <div className="flex justify-center items-center w-[40%] pr-10">
          <Image
            src={'/images/LinkerrrLoginSider.png'}
            height={1300}
            width={1300}
            alt="login-form-asset"
          />
        </div>

      </div>
    </div >
  );
}
