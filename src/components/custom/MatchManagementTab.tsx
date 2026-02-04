import { useGetGroupMatchesQuery, useGetRoundsQuery } from "@/services/tour";
import type { TourResponse } from "@/types/tourTypes"
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CreateRoundDialog from "./CreateRoundDialog";
import CreateGroupMatchDialog from "./CreateGroupMatchDialog";
import RoundMatchesContainer from "./RoundMatchesContainer";

interface MatchManagementTabProps {
    tour: TourResponse
}

export default function MatchManagementTab({ tour }: MatchManagementTabProps) {
    const { data: rounds, isLoading: isLoadingRound, isError: isErrorRound } = useGetRoundsQuery({
        "tourId.equals": tour.id,
        size: 99999
    });


    const [round, setRound] = useState(0);

    useEffect(() => {
        if (rounds && round == 0) {
            setRound(1);
        }
    }, [rounds]);

    const handleRoundChange = (isIncrease: boolean) => {
        if (rounds === undefined) return;
        if (isIncrease) {
            if (round < rounds.totalElements) {
                setRound(round + 1);
            }
        } else {
            if (round > 1) {
                setRound(round - 1);
            }
        }
    }
    return (
        <div className="w-full">
            <div className="w-full flex flex-col items-center justify-center text-primary">
                <div className="bg-neutral-200 p-2 w-full rounded-2xl space-x-1 flex">
                    <CreateRoundDialog tourId={tour.id} />
                </div>
                <div className="text-2xl font-semibold w-fit">Vòng Đấu</div>
                <div className="flex items-center space-x-2 mb-5">
                    <div>
                        <ArrowLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => handleRoundChange(false)} />
                    </div>
                    <div className="text-2xl font-semibold w-fit">
                        <span>{round}</span>/<span className="text-neutral-500 text-xl font-light">{rounds?.totalElements}</span>
                    </div>
                    <div>
                        <ArrowRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => handleRoundChange(true)} />
                    </div>
                </div>
                <div className="w-full rounded-2xl">
                    <RoundMatchesContainer tourId={tour.id} round={rounds?.content[round - 1]} />
                </div>
            </div>
        </div>
    )
}