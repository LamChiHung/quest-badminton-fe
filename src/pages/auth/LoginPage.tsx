import { useSearchParams } from "react-router";
import AutoAlert from "../../components/ui/AutoAlert";
import { useEffect, useState } from "react";
import { useConfirmRegisterMutation, useLoginMutation } from "@/services/auth";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    FormMessage,
} from "@/components/ui/form"
import { useRegisterMutation } from "@/services/auth"
import { Eye, EyeOff, Loader2, LockIcon, MailIcon } from "lucide-react"
import { toast } from "sonner"
import { ClubEnum } from "@/types/enums"
import { useNavigate, useRoutes } from "react-router"
import type { LoginResponse } from "@/types/userTypes";

const loginSchema = z.object({
    email: z.email({ message: "Hãy nhập email hợp lệ" }),
    password: z.string().nonempty("Vui lòng nhập mật khẩu"),

});
export type LoginSchemaType = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [confirmRegister, { isLoading: isConfirmRegisterLoading }] = useConfirmRegisterMutation();
    const [isConfirmRegister, setIsConfirmRegister] = useState(false);

    useEffect(() => {
        if (!token) return;
        confirmRegister({ token })
            .unwrap()
            .finally(() => setIsConfirmRegister(true))
    }, [token]);

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const [loginAccount, { isLoading, isSuccess, error, data }] = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (values: LoginSchemaType) => {
        await loginAccount({
            email: values.email,
            password: values.password,
        }).unwrap()
            .then(res => {
                localStorage.setItem("access_token", res.token);
                toast.success("Đăng nhập thành công!")
                navigate("/");
            })
    }

    return (
        <>
            <div className="w-dvw h-dvh flex justify-center items-right bg-linear-to-r from-zinc-600 to-zinc-400 ">
                <div className="container flex justify-center items-center">
                    <div className="register-form max-w-2xl min-w-xs w-10/12 min-h-100 bg-white rounded-2xl shadow-2xl flex items-center flex-col justify-between p-8">
                        <div>
                            <p className="font-bold text-2xl text-primary mb-8">Đăng nhập</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 flex flex-1 flex-col justify-center">
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
                                <Button className="text-white text-2xs cursor-pointer"
                                    disabled={isLoading}
                                    type="submit">
                                    Đăng nhập
                                    {isLoading && <Loader2 className="size-4 animate-spin" />}
                                </Button>
                                <Button variant={"link"} onClick={() => navigate("/register")} className="cursor-pointer">Chưa có tài khoản? Đăng ký</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div>
                {isConfirmRegister && <AutoAlert subject="Xác thực tài khoản thành công!" message="Tài khoản của bạn đã được xác thực thành công, vui lòng đăng nhập để tiếp tục" />}
            </div>
        </>
    )
}