'use client'

import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, type LoginFormSchemaType } from '@/schemas/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { login } from '@/actions/login'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

const defaultValues: LoginFormSchemaType = {
  email: '',
  password: '',
}

interface LoginFormProps extends React.ComponentProps<'div'> {
  className?: string
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(login, {})

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'all',
    defaultValues,
  })

  const submit = (data: LoginFormSchemaType) => {
    console.log(data)
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    startTransition(() => formAction(formData))
  }

  // 使用 useEffect 处理状态更新
  useEffect(() => {
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, message]) => {
        console.log(field, message)
        if (message) {
          form.setError(field as keyof LoginFormSchemaType, {
            type: 'manual',
            message: message.join(','),
          })
        }
      })
    }
  }, [state.errors, form]) // 依赖 state.errors 和 form

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>登录到您的账户</CardTitle>
          <CardDescription>输入您的邮箱以登录到您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input placeholder="邮箱" {...field} />
                        </FormControl>
                        <FormDescription>请输入您的邮箱</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="password">密码</Label>
                          <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            忘记密码？
                          </a>
                        </div>
                        <FormControl>
                          <Input placeholder="密码" type="password" {...field} />
                        </FormControl>
                        <FormDescription>密码长度不能小于4位</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        登录中...
                      </span>
                    ) : (
                      '登录'
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    使用Google登录
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                没有账号？
                <Link href="/register" className="underline underline-offset-4">
                  注册
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
