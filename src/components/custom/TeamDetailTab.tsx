import { useGetPlayersQuery, useGetTeamsQuery } from "@/services/tour";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { TeamResponse } from "@/types/tourTypes";
import { GenderEnumText, PlayerStatusEnum, PlayerTierEnumText } from "@/types/enums";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Check } from "lucide-react";
import CreateTeamDialog from "./CreateTeamDialog";
import { Button } from "../ui/button";
import AddPlayerDialog from "./AddplayerDialog";

interface TeamDetailHostProps {
    tourId: number
}
export default function TeamDetailTab({ tourId }: TeamDetailHostProps) {

    const { data: teamsData, isLoading: isTeamsLoading, isError: isTeamsError } = useGetTeamsQuery({ "tourId.equals": tourId });
    const { data: playersData, isLoading: isPlayersLoading, isError: isPlayersError } = useGetPlayersQuery({
        "tourId.equals": tourId,
        "status.in": [PlayerStatusEnum.APPROVED]
    });

    return (
        <div className="flex flex-col items-center">
            <div className="border-b pb-2 pt-2 flex items-center space-x-2 w-full m-2">
                <CreateTeamDialog tourId={tourId} />
            </div>
            <p className="text-2xl font-bold">
                Danh Sách Đội
            </p>
            <div className="flex flex-col">
                <div>
                    {teamsData?.content.map((team: TeamResponse) => (
                        <div className="flex flex-col items-center border-2 border-secondary mt-5 rounded-2xl p-4 relative">
                            <div className="absolute top-2 right-2">
                                <AddPlayerDialog teamId={team.id} players={playersData?.content} />
                            </div>
                            <div className="text-xl  font-semibold">
                                <span>STT: {team.number}</span>
                                <span> - </span>
                                <span>{team.name}</span>
                            </div>
                            <div>
                                <ScrollArea className="w-xs md:w-sm lg:w-md xl:w-full h-fit p-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tên</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Trình độ</TableHead>
                                                <TableHead>Giới tính đăng ký</TableHead>
                                                <TableHead>Đội trưởng</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                playersData?.content.filter((player) => player.teamId === team.id).map((player) => (
                                                    <TableRow key={player.id}>
                                                        <TableCell>{player.name}</TableCell>
                                                        <TableCell>{player.email}</TableCell>
                                                        <TableCell>{PlayerTierEnumText[player.tier as keyof typeof PlayerTierEnumText]}</TableCell>
                                                        <TableCell>{GenderEnumText[player.gender as keyof typeof GenderEnumText]}</TableCell>
                                                        <TableCell className="text-green-500">{team?.captain?.id === player.id && <Check />}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}