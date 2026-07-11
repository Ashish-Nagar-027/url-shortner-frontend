"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    return resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div>
      <Button onClick={toggleTheme}>Toggle</Button>
    </div>
  );
};

export default ToggleTheme;
