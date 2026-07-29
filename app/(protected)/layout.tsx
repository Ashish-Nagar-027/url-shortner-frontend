"use client";
import { useUserData } from "@/hooks/useUserData";
import { redirect } from "next/navigation";
import Appsidebar from "@/components/AppSidebar";
import useRoutes from "@/hooks/useRoutes";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useUserData();
      const { getCurrentPathInfo}= useRoutes()

      const currentPath = getCurrentPathInfo()

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
    <div className="flex ">
      <Appsidebar />
      <main className="text-white flex-2">
        <div className="h-18 flex items-center px-6 border-b-2 my-2">
          <span className="text-2xl">{currentPath && currentPath?.title}</span>
        </div>
        <div className="p-6">
        {children}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
