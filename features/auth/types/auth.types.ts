import type z from "zod";
import type { loginSchema, registerSchema } from "../validation/auth.schema";

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterRequest = Omit<RegisterSchema, "confirmPassword">;

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: AuthTokens;
  };
}