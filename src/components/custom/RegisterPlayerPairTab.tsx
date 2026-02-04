import { GenderEnumText, PlayerPairTypeEnumText, PlayerTierEnumText } from "@/types/enums";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Spinner } from "../ui/spinner";
import { Check, Trash2 } from "lucide-react";
import RegisterPlayerPairDialog from "./RegisterPlayerPairDialog";
import { useDeletePlayerPairMutation, useGetMyTeamQuery, useGetTeamPairsQuery, useGetTeamPlayersQuery } from "@/services/tour";
import { toast } from "sonner";
import type { TourResponse } from "@/types/tourTypes";

interface Props {
    tour: TourResponse | undefined;
}

export default function RegisterPlayerPairTab({ tour }: Props) {
    const { data: myTeam, isLoading: isLoadingMyTeam, isError: isErrorMyTeam } = useGetMyTeamQuery(tour?.id!, { skip: !tour?.id, });
    const { data: teamPlayers, isLoading: isLoadingTeamPlayers, isError: isErrorTeamPlayers } = useGetTeamPlayersQuery(myTeam?.id!, { skip: !myTeam?.id, });
    const { data: teamPairs, isLoading: isLoadingTeamPairs, isError: isErrorTeamPairs } = useGetTeamPairsQuery(myTeam?.id!, { skip: !myTeam?.id, });
    const [deletePlayerPair, { isLoading: isLoadingDeletePair }] = useDeletePlayerPairMutation();

    const handleDeletePair = (id: number) => {
        deletePlayerPair(id)
            .unwrap()
            .then(() => {
                toast.success("Xóa cặp đấu thành công!");
            });
    }
    return (
        <div className="flex flex-col items-center w-full">
            <div className="text-2xl font-bold m-2.5">{`${myTeam?.name}`}</div>
            <div className="flex justify-between flex-wrap w-full">
                <div className="flex-1 md:m-2.5 w-full">
                    <div className="font-semibold mb-2.5">Danh sách vận động viên</div>
                    <Table className=" w-full">
                        <TableHeader className="bg-neutral-300 border-2 border-neutral-300">
                            <TableRow>
                                <TableHead>STT</TableHead>
                                <TableHead>Tên</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Trình độ</TableHead>
                                <TableHead>Giới tính đăng ký</TableHead>
                                <TableHead>Đội trưởng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="shadow-2xl border-2 border-neutral-200">
                            {teamPlayers?.content.map((player, index) => (
                                <TableRow key={player.id}>
                                    <TableCell>{player.id}</TableCell>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{player.email}</TableCell>
                                    <TableCell>{PlayerTierEnumText[player.tier as keyof typeof PlayerTierEnumText]}</TableCell>
                                    <TableCell>{GenderEnumText[player.gender as keyof typeof GenderEnumText]}</TableCell>
                                    <TableCell>{myTeam?.captain?.id === player.id ? <Check className="text-green-500" /> : ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex-1 m-2.5 w-full">
                    <div className="flex justify-between items-center">
                        <div className="font-semibold">Danh sách đội hình</div>
                        {tour && <RegisterPlayerPairDialog tourId={tour.id} players={teamPlayers?.content} />}
                    </div>
                    <Table className="border-2 border-secondary w-full">
                        <TableHeader className="bg-gray-300 border-2 border-gray-300">
                            <TableRow>
                                <TableHead>STT</TableHead>
                                <TableHead>Vận động viên</TableHead>
                                <TableHead>Nội dung</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="shadow-2xl border-2 border-gray-200">
                            {teamPairs?.content.map((pair, index) => (
                                <TableRow key={pair.id}>
                                    <TableCell>{pair.id}</TableCell>
                                    <TableCell><span>{pair.player1?.name}</span> {pair.player2 && <><br /> <span>{pair.player2?.name}</span></>}</TableCell>
                                    <TableCell>{PlayerPairTypeEnumText[pair.type as keyof typeof PlayerPairTypeEnumText]}</TableCell>
                                    <TableCell>{isLoadingDeletePair ? <Spinner /> : <Trash2 className="cursor-pointer" onClick={() => handleDeletePair(pair.id)} />}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}