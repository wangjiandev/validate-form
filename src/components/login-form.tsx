"use client";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, type LoginFormSchemaType } from "@/schemas/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { startTransition, useActionState, useRef } from "react";
import { login } from "@/actions/login";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const defaultValues: LoginFormSchemaType = {
  email: "",
  password: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(login, {});
  const formRef = useRef<HTMLFormElement>(null);

  // 1. Define your form.
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "all",
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormSchemaType) {
    form.setError("email", {
      message: "请勿使用QQ邮箱登录",
    });
    console.log("Client Side Validated Values:", values);
    console.log("Client Side Validated Errors:", form.formState.errors);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>登录到您的账户</CardTitle>
          <CardDescription>输入您的邮箱以登录到您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(() => {
                  startTransition(() =>
                    formAction(new FormData(formRef.current!))
                  );
                })(e);
              }}
              action={formAction}
            >
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
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            忘记密码？
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="密码"
                            type="password"
                            {...field}
                          />
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
                      "登录"
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    使用Google登录
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                没有账号？
                <a href="#" className="underline underline-offset-4">
                  注册
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
