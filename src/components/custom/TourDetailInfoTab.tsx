import type { TourResponse } from "@/types/tourTypes";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { TourMatchTypeEnum, TourStatusEnum, TourTypeEnum } from "@/types/enums";
import { formatDate } from "@/utils/StringUtil";
import { is } from "date-fns/locale";

export default function TourDetailInfoTab({ tour }: { tour: TourResponse }) {
    const details = [
        {
            title: "Id giải đấu",
            value: tour?.id
        },
        {
            title: "Tên giải đấu",
            value: tour?.name
        },
        {
            title: "Mã giải đấu",
            value: tour?.code
        },
        {
            title: "Trạng thái",
            value: TourStatusEnum[tour?.status as keyof typeof TourStatusEnum]
        },
        {
            title: "Loại giải đấu",
            value: TourTypeEnum[tour?.type as keyof typeof TourTypeEnum]
        },
        {
            title: "Loại trận đấu",
            value: TourMatchTypeEnum[tour?.matchType as keyof typeof TourMatchTypeEnum]
        },
        {
            title: "Số lượng vận động viên nam",
            value: tour?.malePlayers
        },
        {
            title: "Số lượng vận động viên nữ",
            value: tour?.femalePlayers
        },
        {
            title: "Ngày bắt đầu giải đấu",
            value: formatDate(tour?.startDate)
        },
        {
            title: "Ngày kết thúc đăng ký",
            value: formatDate(tour?.registrationEndDate)
        },
        {
            title: "Địa điểm",
            value: tour?.location
        },
        {
            title: "Link google map",
            value: tour?.locationUrl,
            isLink: true
        },
        {
            title: "Link nội quy",
            value: tour?.ruleUrl,
            isLink: true
        },
        {
            title: "Link avatar",
            value: tour?.avatarUrl,
            isLink: true
        },
        {
            title: "Link background",
            value: tour?.backgroundUrl,
            isLink: true
        },
        {
            title: "Private",
            value: tour?.isPrivate ? "Có" : "Không"
        }


    ]
    return (
        <div className="w-full flex flex-col items-center">
            <div className={`flex justify-center items-center`}>
                <img src={tour?.avatarUrl || "/images/quest-logo.jpg"} alt="background" className="w-36 md:w-56 aspect-ratio: 1/1 object-fit: cover rounded-2xl border-2 border-white" />
            </div>
            <div>
                <p className="text-4xl font-semibold text-center mt-2 text-primary">{tour?.name}</p>
            </div>
            <div className="flex justify-center">
                <div className="mt-4">
                    <div className="space-y-4">
                        {details.map((detail, index) => (
                            <div className="flex-col md:flex-row flex" key={index}>
                                <p className="font-bold mr-2">{detail.title}: </p>
                                {detail?.isLink ? <a className="text-blue-400 underline" href={detail.value} rel="noopener noreferrer">{detail.value}</a> : <p className="">{detail.value}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}