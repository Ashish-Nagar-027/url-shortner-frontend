

"use client";

import { useTheme } from "@wrksz/themes/client";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return ( 
    <Button
      className="cursor-pointer"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
   {  resolvedTheme === "dark" ?  <Sun /> : <Moon />}
    </Button>
  );
}