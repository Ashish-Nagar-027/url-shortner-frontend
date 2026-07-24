"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Header = () => {
  const [userData, setUserData] = useState<null | {name: string}>(null);
  const router = useRouter()

  useEffect(() =>  {
        const data = window.localStorage.getItem("i_user");
    if (data) {
       setUserData(JSON.parse(data))

    }
  },[])

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        credentials: 'include',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData?.message || "Login failed");
      }

      toast.success("logout !");
      
       localStorage.clear()
      router.push("/sign-in");
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <header className="mx-auto py-4 px-6 border mt-2 mb-2 rounded-xl flex justify-between items-center w-3/4">
      <Link href="/">
        <span className="font-extrabold text-2xl">iLynk</span>
      </Link>
      <div className="flex gap-4 items-center">
        {!userData ? (
          <>
            <Link
              className="hover:underline hover:text-blue-600"
              href="/sign-up"
            >
              Sign-up
            </Link>
            <Link
              className="hover:underline hover:text-blue-600"
              href="/sign-in"
            >
              Sign-in
            </Link>
          </>
        ) : (
          <>

           <Link
              className="hover:underline hover:text-blue-600"
              href="/dashboard"
            >{userData?.name}</Link>
          <Button onClick={handleLogout}>Logout</Button>

          </>
        )}
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
