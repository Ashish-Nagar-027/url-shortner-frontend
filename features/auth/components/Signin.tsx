"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { loginSchema } from "../validation/auth.schema";
import { authApi } from "../api/auth.api";
import { AxiosError } from "axios";



const defaultFormValues = {
  email: "",
  password: "",
};

export default function Signin() {
  const [formData, setFormData] = useState(defaultFormValues);
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errMessage) {
      setErrMessage("");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      setErrMessage(parsed.error.issues[0]?.message);
      return;
    }

    try {


      const res = await authApi.login(parsed.data)

     const resData = res.data;

      if (!resData) {
        throw new Error(res?.message || "Login failed");
      }

      toast.success("Logged in successfully!");

      const data = res?.data;

      if (data?.user) {
        const userData = JSON.stringify(data.user);
        localStorage.setItem("i_user", userData);
      }
      if (data?.token?.accessToken) {
        localStorage.setItem("i_accessToken", data?.token?.accessToken);
      }
      if (data?.token?.refreshToken) {
        localStorage.setItem("i_refreshToken", data?.token?.refreshToken);
      }

      //   setFormData(defaultFormValues);
      toast.success('Login Succesfull')
      setErrMessage("");
      window.location.href = "/dashboard"

    } catch (error: unknown) {
      let message = "Something went wrong"
      if (error instanceof AxiosError) {
       message =  error?.response?.data.message
        toast.error(error.message);
      } 
      setErrMessage(message);
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <a href="#" className="text-sm underline-offset-4 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={onInputChange}
              className="pr-10"
              required
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

      <Button type="submit" className="mt-4 w-full cursor-pointer">
        Login
      </Button>

      {errMessage && (
        <Label className="mt-2 w-full text-red-600">{errMessage}</Label>
      )}
    </form>
  );
}
