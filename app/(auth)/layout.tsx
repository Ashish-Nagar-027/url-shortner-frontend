"use client";

import { useUserData } from "@/hooks/useUserData";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useUserData();

  if (data) {
    redirect("/links");
  }

  return <>{children}</>;
}
