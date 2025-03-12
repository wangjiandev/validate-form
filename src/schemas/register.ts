import { z } from 'zod'

export const RegisterFormSchema = z.object({
  email: z.string().trim().email('邮箱格式错误'),
  password: z.string().trim().min(4, '密码长度不能小于4位'),
  confirmPassword: z.string().trim().min(4, '密码长度不能小于4位'),
})

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>
