import { useGetPlayersQuery } from "@/services/tour";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { GenderEnum, PlayerStatusEnum, PlayerStatusEnumText, PlayerTierEnum, TourStatusEnum } from "@/types/enums";
import { Button } from "../ui/button";

export default function PlayerApproveTab({ tourId }: { tourId: number }) {
    const { data, isLoading, isError } = useGetPlayersQuery({ "tourId.equals": tourId, "status.in": [`${PlayerStatusEnum.PENDING_APPROVE}`], size: 999 });

    const pendingPlayers = data?.content.map((p) => {
        return [
            {
                title: 'Tên', value: p.name
            }, {
                title: 'Email', value: p.email
            }, {
                title: 'Câu lạc bộ', value: p.club
            }, {
                title: 'Trình độ', value: PlayerTierEnum[p.tier as keyof typeof PlayerTierEnum]
            }, {
                title: 'Giới tính', value: GenderEnum[p.gender as keyof typeof GenderEnum]
            }, {
                title: 'Trạng thái', value: PlayerStatusEnumText[p.status as keyof typeof PlayerStatusEnumText]
            }
        ]
    }) ?? [];
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-2xl">Đơn đợi duyệt</div>
                <div className="w-full p-6 flex justify-center">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="lg:w-2xl xl:w-4xl w-72"
                    >
                        <CarouselContent>
                            {pendingPlayers?.map((p, index) => (
                                <div>

                                    <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                                        <div className="text-center">
                                            {index + 1} / {pendingPlayers.length}
                                        </div>
                                        <div className="p-1">
                                            <Card className="w-66 border-2 border-primary">
                                                <CardContent className="flex flex-col aspect-square text-sm space-y-2">
                                                    {p.map((item, index) => (
                                                        <div key={index} className="">
                                                            <div className="font-bold">{item.title}: </div>
                                                            <div>{item.value}</div>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between mt-2">
                                                        <Button className="bg-gray-500 cursor-pointer hover:opacity-80 hover:bg-gray-500">Từ Chối</Button>
                                                        <Button className="bg-green-600 cursor-pointer hover:opacity-80 hover:bg-green-600">Chấp nhận</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                </div>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}