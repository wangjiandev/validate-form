"use server";

import { LoginFormSchema, type LoginFormSchemaType } from "@/schemas/login";
import { redirect } from "next/navigation";

export type LoginActionState = {
  form?: {
    email?: string;
    password?: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function login(
  _prev: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const form = Object.fromEntries(formData);
  const validationResult = LoginFormSchema.safeParse(form);
  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 模拟登录过程，延时3秒
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (validationResult.data.email.includes("qq")) {
    return {
      errors: {
        email: ["请勿使用QQ邮箱登录"],
      },
    };
  }

  console.log("Server Side Validated form:", form);

  redirect("/");
}
