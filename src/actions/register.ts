'use server'

import { RegisterFormSchema } from '@/schemas/register'
import { redirect } from 'next/navigation'

export type RegisterActionState = {
  form?: {
    email?: string
    password?: string
    confirmPassword?: string
  }
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
}

export async function register(_prev: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  const form = Object.fromEntries(formData)
  const validationResult = RegisterFormSchema.safeParse(form)
  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  // 模拟注册过程，延时3秒
  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (validationResult.data.email.includes('qq')) {
    return {
      errors: {
        email: ['请勿使用QQ邮箱登录'],
      },
    }
  }

  console.log('Server Side Validated form:', form)

  redirect('/')
}
