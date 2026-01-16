import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TourMatchTypeEnum, TourStatusEnum, TourTypeEnum } from "@/types/enums"
import type { TourResponse } from "@/types/tourTypes"
import { formatDate } from "@/utils/StringUtil"
import { ArrowRightIcon, Calendar, CalendarCheck, CalendarClock, Divide, MapPin, Mars, NotebookPen, StarIcon, Trophy, User, Venus } from "lucide-react"
import RegisterPlayerDialog from "./RegisterPlayerDialog"
import { useNavigate } from "react-router"


export default function TourCard({ tour, className, isAdmin = false, url = "#" }: { tour: TourResponse, className?: string, isAdmin?: boolean, url?: string }) {

    const content = [{
        title: "Loại giải đấu",
        value: TourTypeEnum[tour.type as keyof typeof TourTypeEnum]
    }, {
        title: "Loại trận đấu",
        value: TourMatchTypeEnum[tour.matchType as keyof typeof TourMatchTypeEnum]
    }, {
        title: "Ngày bắt đầu giải đấu",
        value: formatDate(tour.startDate)
    }, {
        title: "Ngày kết thúc đăng ký",
        value: formatDate(tour.registrationEndDate)
    },
    {
        title: "Địa điểm",
        value: tour.location
    },
    ];

    const navigator = useNavigate();

    const statusColorMap: Record<string, string> = {
        UPCOMING: "border-blue-400 text-white bg-blue-400",
        LIVE: "border-green-400 text-white bg-green-400",
        END: "border-gray-400 text-white bg-gray-400",
        CANCEL: "border-gray-400 text-white bg-gray-400",
    };

    return (
        <Card onClick={() => navigator(`/host/tour-management/${tour.id}`)} className={`w-96 h-[450px] p-0 ${className} shadow-2xl hover:border-2 hover:border-primary`}>
            <div className="rounded-t-md w-full h-2/5 relative">
                <div className="flex items-center justify-center h-full">
                    <img className="rounded-t-md w-full h-full object-cover" src={tour.backgroundUrl ? tour.backgroundUrl : `/images/badminton-bg-colorful.jpg`} alt="banner-img" />
                </div>
                <div className="absolute top-1/2 left-1/2 + -translate-x-1/2 w-24 h-24 rounded-md border-2 border-white shadow-2xl">
                    <img className="w-fit h-full object-cover rounded-md" src={tour.avatarUrl ? tour.avatarUrl : `/images/quest-logo.jpg`} alt="banner-img" />
                </div>
                {
                    <div className={`${statusColorMap[tour.status]} absolute top-2 right-2 w-22 h-6 rounded-md border-2 shadow-2xl flex items-center justify-center text-xs font-medium`}>
                        <div>
                            {TourStatusEnum[tour.status as keyof typeof TourStatusEnum]}
                        </div>
                    </div>
                }

            </div>
            <CardContent className="px-4 py-2 flex flex-col justify-between h-full">
                <div className="flex justify-center h-fit">
                    <CardTitle className="mb-4 font-bold text-primary text-2xl">{tour.name}</CardTitle>
                </div>
                <div className="flex flex-col justify-between h-full">
                    {content.map((item, index) => (
                        <CardDescription >
                            <span className="font-bold text-black mr-2">
                                {item.title}:
                            </span>
                            <span className="text-black">
                                {item.value}
                            </span>
                        </CardDescription>
                    ))}
                    <CardDescription className="flex">
                        <span className="font-bold text-black mr-2">
                            Số lượng đăng ký:
                        </span>
                        <span className="text-black flex">
                            {tour.malePlayerRegistered}/{tour.malePlayers} <User className="text-blue-600" size={18} /> <div className="h-4 w-0.5 bg-neutral-700 mx-2"></div> {tour.femalePlayerRegistered}/{tour.femalePlayers} <User className="text-pink-600" size={18} />
                        </span>
                    </CardDescription>
                </div>
                <CardFooter className="flex justify-between p-2 h-fit">
                    <CardDescription>
                        <span className="underline italic">Bấm để xem chi tiết</span>
                    </CardDescription>
                    {tour.isAvailableToRegister && !isAdmin && <RegisterPlayerDialog id={tour.id} />}
                </CardFooter>
            </CardContent>
        </Card>
    )
}