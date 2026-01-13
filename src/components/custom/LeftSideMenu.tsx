import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { NavLink } from "react-router";

interface LeftSideMenu {
    items: {
        title: string
        url: string
        icon: React.ReactNode
    }[]
}
export default function LeftSideMenu({ items }: LeftSideMenu) {
    const path = window.location.pathname;

    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Button variant="default">
                    <Menu />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="h-full w-full">
                    <DrawerHeader>
                        <DrawerTitle>Menu</DrawerTitle>
                    </DrawerHeader>
                    {items.map((item) => (
                        <div key={item.title} className={`text-sm font-normal mb-4 cursor-pointer border-b-2 ${path === item.url ? "border-b-primary" : ""}`}>
                            <div className="hover:bg-secondary rounded-xl">
                                <NavLink className={`flex space-x-2 items-center`} to={item.url}>
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                    <div className="p-4">
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}