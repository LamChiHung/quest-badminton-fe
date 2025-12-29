import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useGetAuthWelcomeQuery, useRegisterMutation } from "@/services/auth"
import { Building2, Building2Icon, Eye, EyeOff, Loader2, LockIcon, MailIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import type { ApiError } from "@/types/errorTypes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClubEnum } from "@/types/enums"
import { ro } from "date-fns/locale"
import { useNavigate, useRoutes } from "react-router"

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Họ Tên phải có ít nhất 2 ký tự.",
  }).max(100, ""),
  email: z.email({ message: "Hãy nhập email hợp lệ" }),
  password: z.string().regex(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$/,
    "Mật khẩu phải gồm 8+ ký tự, chứa chữ, số và ký tự đặc biệt"
  ),
  confirmPassword: z.string(),
  club: z.string().nonempty("Vui lòng chọn câu lạc bộ"),
}).refine((data: any) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
})
export type RegisterSchemaType = z.infer<typeof registerSchema>

export default function RegisterPage() {

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      club: ""
    }
  })

  const [registerAccount, { isLoading, isSuccess, error, data }] = useRegisterMutation()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const CLUB_VALUES = Object.values(ClubEnum);
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterSchemaType) => {
    const res = await registerAccount({
      name: values.name,
      email: values.email,
      password: values.password,
      club: values.club
    }).unwrap()
    console.log("Register success:", res)
    toast.success("Đăng ký thành công, hãy kiểm tra mail của bạn!")
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-right bg-linear-to-r from-primary to-secondary ">
      <div className="container flex justify-center items-center">
        <div className="register-form max-w-2xl min-w-xs w-10/12 min-h-100 bg-white rounded-2xl shadow-2xl flex items-center flex-col justify-between p-8">
          <div>
            <p className="font-bold text-2xl text-primary mb-8">Đăng ký thành viên</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-1 space-y-4 flex flex-col justify-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Họ và tên"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mật khẩu"
                          className="pl-10 bg-background"
                          {...field}
                        />
                        <Button
                          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Nhập lại mật khẩu"
                          className="pl-10 bg-background"
                          {...field}
                        />
                        <Button
                          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="club"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Building2Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Chọn câu lạc bộ" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {CLUB_VALUES.map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="text-white text-2xs cursor-pointer"
                disabled={isLoading}
                type="submit">
                Đăng ký
                {isLoading && <Loader2 className="size-4 animate-spin" />}
              </Button>
              <Button variant={"link"} onClick={() => navigate("/login")} className="cursor-pointer">Đã có tài khoản? Đăng nhập</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}