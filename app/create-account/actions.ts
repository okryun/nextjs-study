"use server";

import { redirect } from "next/navigation";
import { z, typeToFlattenedError } from "zod";
import * as bcrypt from "bcrypt";
import { isEmailExist, isUsernameExist } from "../../service/userService";
import db from "../../utils/db";
import { getSession } from "../../utils/session";

const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 10;
const PASSWORD_REGEX = /^(?=.*\d).{10,}$/;

const createAccountSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .trim()
      .email("Please enter a valid email address.")
      .refine(
        (email) => email.includes("@zod.com"),
        "Only @zod.com emails allowed."
      ),
    username: z
      .string({ required_error: "Username is required." })
      .trim()
      .min(
        USERNAME_MIN_LENGTH,
        `Username must be at least ${USERNAME_MIN_LENGTH} characters.`
      ),
    password: z
      .string({ required_error: "Password is required." })
      .trim()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
      )
      .regex(PASSWORD_REGEX, "Password must include at least one number."),
  })
  .superRefine(async ({ username }, ctx) => {
    if (await isUsernameExist(username)) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
    }
  })
  .superRefine(async ({ email }, ctx) => {
    if (await isEmailExist(email)) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
    }
  });

type FormValues = z.infer<typeof createAccountSchema>;

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<FormValues, string> | null;
}

export async function handleForm(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await createAccountSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedPassword,
    },
    select: { id: true },
  });

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/");
}
