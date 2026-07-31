"use client";

import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import useLogout from "@/features/auth/hooks/useLogout";

const Header = () => {
  const { data: userData } = useUserData();
  const router = useRouter();
  const {logout} = useLogout()


  return (
    <header className="mx-auto py-4 px-6 border mt-2 mb-2 rounded-xl flex justify-between items-center w-3/4">
      <Link href="/">
        <span className="font-extrabold text-2xl">iLynk</span>
      </Link>
      <div className="flex gap-4 items-center">
        {!userData ? (
          <>
            <button
              className="hover:underline hover:text-blue-600"
              onClick={() => router.push("/sign-up")}
            >
              Sign-up
            </button>
            <button
              className="hover:underline hover:text-blue-600"
              onClick={() => router.push("/sign-in")}
            >
              Sign-in
            </button>
          </>
        ) : (
          <>
            <Link
              className="hover:underline hover:text-blue-600"
              href="/dashboard"
            >
              {userData?.name}
            </Link>
            <Button onClick={logout}>Logout</Button>
          </>
        )}
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
