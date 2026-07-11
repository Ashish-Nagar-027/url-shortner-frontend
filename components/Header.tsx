"use client";
import React, { useState } from "react";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  const [userData] = useState(() => {
    const data = localStorage.getItem("i_user");
    if (data) {
      return JSON.parse(data);
    }
  });

  return (
    <header className="mx-auto py-4 px-6 border mt-2 mb-2 rounded-xl flex justify-between items-center w-3/4">
      <Link href="/">
        <span className="font-extrabold text-2xl">iLynk</span>
      </Link>
      <div className="flex gap-4">
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
          <span>{userData?.name}</span>
        )}
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
