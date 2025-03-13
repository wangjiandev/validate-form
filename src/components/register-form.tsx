'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { register } from '@/actions/register'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormMessage } from './ui/form'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [state, formAction, isPending] = useActionState(register, {})

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>注册您的账户</CardTitle>
          <CardDescription>输入您的邮箱以注册到您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">邮箱</Label>
                <Input placeholder="邮箱" name="email" />
                {state.errors?.email && state.errors?.email.join(',')}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">密码</Label>
                <Input placeholder="密码" name="password" />
                {state.errors?.password && state.errors.password.join(',')}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input placeholder="确认密码" name="confirmPassword" />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      注册中...
                    </span>
                  ) : (
                    '注册'
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              已有账号？
              <Link href="/login" className="underline underline-offset-4">
                登录
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
