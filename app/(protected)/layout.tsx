"use client";
import { useUserData } from "@/hooks/useUserData";
import { redirect } from "next/navigation";
import Appsidebar from "@/components/AppSidebar";
import useRoutes from "@/hooks/useRoutes";
import ToggleTheme from "@/components/ToggleTheme";
import { useTheme } from "@wrksz/themes/client";
import TopNotification from "@/features/auth/components/TopNotification";
import { useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError  } = useUserData();
  const { getCurrentPathInfo } = useRoutes();
  const { resolvedTheme } = useTheme();

    const [show, setShow] = useState(false);

  const currentPath = getCurrentPathInfo();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center gap-6">
        <span className="font-extrabold text-2xl">iLynk</span>
      </div>
    );
  }

  if (isError) {
    redirect("/");
  }


  return (
    <>
      {/* top message banner */}
      <TopNotification showNotification={show} setShowNotification={setShow}/>

      {/*  */}
      <div className="flex  ">
        <Appsidebar showNotification={show}  />
        <main
          className={` flex-2 ${resolvedTheme === "dark" ? "text-white" : "text-black"}`}
        >
          <div className="h-18 flex items-center px-6 border-b-2 my-2 justify-between">
            <span className="text-2xl">
              {currentPath && currentPath?.title}
            </span>
            <ToggleTheme />
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </>
  );
};

export default ProtectedLayout;
