"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import z from "zod";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name Should at least have 3 chars")
      .max(50, "Name must be under 50 chars"),
    email: z.email(),
    password: z
      .string()
      .min(5, "Password Should at least have 5 chars")
      .max(128, "Password must be under 128 chars"),
    confirmPassword: z.string().min(5, "Password Should at least have 5 chars"),
  })
  .refine((d) => d.password == d.confirmPassword, {
    error: "Passwords and confirms password must match",
  });

const defaultFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(defaultFormValues);

  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parse = registerSchema.safeParse(formData);
    if (!parse.success) {
      const errr = parse.error?.issues;
      setErrMessage(errr[0]?.message);
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parse.data),
      });

      const data = await res.json();
      if (!res.ok) {
        const message = data?.message || "Something Went Wrong";
        throw new Error(message);
      }

      setFormData(defaultFormValues);
    } catch (error: unknown) {
      console.log("error ", error);
      if (error instanceof Error) {
        setErrMessage(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Ashish Nagar"
            required
            value={formData.name}
            onChange={onInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={onInputChange}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={formData.password}
              onChange={onInputChange}
              className="pr-10"
              placeholder="password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              className="pr-10"
              placeholder="confirm password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full mt-4 cursor-pointer">
        Register
      </Button>
      <Label className="w-full mt-2 cursor-pointer text-red-600">
        {errMessage}
      </Label>
    </form>
  );
}
