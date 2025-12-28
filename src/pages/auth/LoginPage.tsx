import { useSearchParams } from "react-router";
import AutoAlert from "../../components/ui/AutoAlert";
import { useEffect, useState } from "react";
import { fa } from "zod/v4/locales";
import { useConfirmRegisterMutation } from "@/services/auth";

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [confirmRegister, { isLoading }] = useConfirmRegisterMutation();
    const [isConfirmRegister, setIsConfirmRegister] = useState(false);

    useEffect(() => {
        if (!token) return;
        confirmRegister({ token })
            .unwrap()
            .finally(() => setIsConfirmRegister(true))
    }, [token]);

    return (
        <div>
            {isConfirmRegister && <AutoAlert subject="Xác thực tài khoản thành công!" message="Tài khoản của bạn đã được xác thực thành công, vui lòng đăng nhập để tiếp tục" />}
        </div>
    )
}