"use server";
import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*?[0-9]).+$/);

const formSchema = z.object({
  username: z.string().min(5),
  email: z
    .string()
    .email()
    .refine(
      (email) => (email.includes("@zod.com") ? true : false),
      "only @zod.com emails are allowed"
    ),
  password: z
    .string()
    .min(10)
    .regex(
      passwordRegex,
      "Password should contain at least one number (01234567890)"
    ),
});

export async function Login(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    fieldErrors: {},
  };
}
