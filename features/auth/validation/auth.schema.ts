import z from "zod";


export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(5, "Password should have at least 5 characters")
    .max(128, "Password must be under 128 characters"),
});


export const registerSchema = z
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