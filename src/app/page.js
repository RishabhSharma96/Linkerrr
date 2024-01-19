'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [username, setUsername] = useState("")

  useEffect(() => {
    if ('localStorage' in window && window.localStorage.getItem("linkerrrUsername")) {
      const user = window.localStorage.getItem("linkerrrUsername")
      window.localStorage.removeItem("linkerrrUsername")
      redirect(`/account?username=${user}`)
    }
  }, [])

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    if (username.length > 0) {
      window.localStorage.setItem("linkerrrUsername", username)
      await signIn('google')
    }
    else {
      console.log("it is empty")
    }
  }

  return (
    <div>
      <div className="h-[91vh] w-full bg-gray-200 flex">

        <div className="flex justify-center items-center w-[60%] flex-col gap-3">
          <p className="text-7xl w-[80%] font-extrabold text-purple-700">Flaut what you are. In one, with simple link in bio.</p>
          <p className="text-lg w-[80%] text-purple-500">Simplify your digital footprint - one link, endless possibilities. Connect with on Instagram, TikTok, Twitter, YouTube, and more for a curated experience.</p>
          <form className="w-[80%]">
            <span className="pl-3 pt-[1.1rem] pb-[1.1rem] bg-white text-lg text-purple-900 rounded-l-lg font-bold">linkerrr.to/
            </span>
            <input
              type="text"
              placeholder="linkerrrID"
              className="h-[3.5rem] outline-none text-lg text-gray-400 w-[200px]"
              onChange={e => setUsername(e.target.value)}
            />
            <button type="submit" onClick={handleCreateAccount} className="h-[3.5rem] bg-purple-700 text-white font-bold w-[12rem] text-lg rounded-r-lg hover:bg-white hover:text-purple-700 : hover:border-purple-700 hover:border-2 transition-all">Claim your linkerrr</button>
          </form>
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
