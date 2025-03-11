import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().trim().email("邮箱格式错误"),
  password: z.string().trim().min(4, "密码长度不能小于4位"),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
