import { api } from "@/services/api";
import type {
  AuthResponse,
  LoginSchema,
  RegisterSchema,
} from "../types/auth.types";

export const authApi = {
  register: async (data: RegisterSchema) => {
    const respnse = await api.post("/auth/register", data);
    return respnse.data;
  },
  login: async (data: LoginSchema): Promise<AuthResponse> => {
    const respnse = await api.post("/auth/login", data);
    return respnse.data;
  },
  currentUser: async () => {
    const res = await api.get("/user/me");
    return res?.data?.data;
  },
};
