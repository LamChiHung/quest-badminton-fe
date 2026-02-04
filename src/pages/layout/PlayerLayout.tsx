import LeftSideMenu from "@/components/custom/LeftSideMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, Home, LogOut, Menu, Trophy } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

export default function PlayerLayout() {

    const menu = [{
        title: "Trang Chủ",
        url: "/",
        icon: <Home />
    }, {
        title: "Giải Đấu",
        url: "/",
        icon: <Trophy />
    }, {
        title: "Hoạt động câu lạc bộ",
        url: "#",
        icon: <Calendar />
    }]

    const navigate = useNavigate();

    const handleClickMenu = (url: string) => {
        navigate(url);
    }

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    }

    return (
        <>
            <div className="w-full h-14 bg-primary flex items-center md:px-10 px-2 justify-between fixed top-0 left-0 z-10">
                <img src="/images/quest-logo-big.jpg" alt="logo" className="w-10 rounded-full md:flex hidden"></img>
                <div className="text-primary-foreground flex md:hidden">
                    <LeftSideMenu items={menu} />
                </div>
                <div className="flex space-x-8">
                    <div className="space-x-15 font-normal text-primary-foreground items-center hidden md:flex">
                        {menu.map((item, index) => (
                            <div key={item.title} onClick={() => handleClickMenu(item.url)} className="flex items-center space-x-2 hover:opacity-80 cursor-pointer">
                                <span>{item.icon}</span>
                                <span>{item.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-2 items-center text-primary-foreground">
                        <div className="hover:opacity-80 cursor-pointer">
                            <Bell />
                        </div>
                        <div className="hover:opacity-80 cursor-pointer">
                            <Avatar className="size-8">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback className="text-xs">CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="hover:opacity-80 cursor-pointer">
                            <LogOut onClick={() => handleLogout()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-14 bg-primary flex items-center md:px-10 px-2 justify-between">
            </div>
            <Outlet />
        </>
    )
}