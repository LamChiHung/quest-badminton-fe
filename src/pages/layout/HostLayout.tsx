import { AppSidebar } from "@/components/custom/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { capitalizeWords } from "@/utils/StringUtil"
import { Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"

export default function HostLayout({ children }: { children: React.ReactNode }) {
    const [now, setNow] = useState(new Date())
    const location = useLocation()
    const headerName = capitalizeWords(location?.pathname?.replaceAll("/host/", "").replaceAll("-", " "))
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])
    const items = [
        {
            title: "Tour Management",
            url: "/host/tour-management",
            icon: <Trophy />,
        },
    ]

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                <AppSidebar items={items} />

                <div className="flex flex-1 flex-col">
                    <header className="flex h-14 items-center gap-4 border-b px-4 justify-between">
                        <div className="flex items-center">
                            <SidebarTrigger />
                            <span className="font-semibold">{headerName}</span>
                        </div>
                        <div>
                            {now.toLocaleString("vi-VN")}
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto p-4">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
