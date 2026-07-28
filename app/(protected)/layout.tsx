"use client";
import { useUserData } from "@/hooks/useUserData";
import { redirect } from "next/navigation";
import Appsidebar from "@/components/AppSidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useUserData();

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
      <main className="text-white flex-2">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
