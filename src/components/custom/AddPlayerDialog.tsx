import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CalendarIcon, Check, ChevronsUpDown, Eye, EyeOff, Loader2, LockIcon, MailIcon, Plus, PlusIcon, UserPlus } from "lucide-react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import { TourMatchTypeEnumText, TourTypeEnumText } from "@/types/enums"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Switch } from "../ui/switch"
import { useAddPlayerToTeamMutation, useCreateTeamMutation, useCreateTourMutation, useGetToursQuery } from "@/services/tour"
import type { PlayerResponse } from "@/types/tourTypes"
import { MultiSelect } from "../ui/multi-select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"


const addPlayerSchema = z.object({
    captainId: z.number("Vui lòng chọn đội trưởng"),
    playerIds: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 vận động viên")
});
export type AddPlayerSchemaType = z.infer<typeof addPlayerSchema>

interface AddPlayerDialogProps {
    teamId: number,
    players?: PlayerResponse[],
    captainId?: number
}
export default function AddPlayerDialog({ teamId, players, captainId }: AddPlayerDialogProps) {
    const playerInTeams = players?.filter(p => p.teamId === teamId)

    const form = useForm<AddPlayerSchemaType>({
        resolver: zodResolver(addPlayerSchema),
        defaultValues: {
            captainId: captainId ?? undefined,
            playerIds: playerInTeams?.map(p => p.id).map(p => String(p)) || [],
        }
    })

    useEffect(() => {
        if (captainId) {
            form.reset({
                captainId: captainId,
            })
        }
    }, [captainId])

    const [open, setOpen] = useState(false);
    const [addPlayer, { isLoading, isSuccess, error, data }] = useAddPlayerToTeamMutation()
    const [playersInTeamState, setPlayersInTeamState] = useState<PlayerResponse[]>(playerInTeams || [])

    const onSubmit = async (values: AddPlayerSchemaType) => {
        if (!values.playerIds.includes(String(values.captainId))) {
            toast.error("Vui lòng chọn đội trưởng hợp lệ!")
            return;
        }
        await addPlayer({
            teamId: teamId,
            captainId: values.captainId,
            playerIds: values.playerIds.map(p => Number(p))
        }).unwrap()
            .then(res => {
                toast.success("Thêm vận động viên vào đội thành công!")
                form.reset();
                setOpen(false)
            })
    }


    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="cursor-pointer hover:bg-neutral-200"> <UserPlus /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Thêm đội thi đấu</DialogTitle>
                                <DialogDescription>
                                    Form tạo đội thi đấu, hãy điền đầy đủ thông tin.
                                </DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={form.control as any}
                                name="captainId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Đội trưởng</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                        role="combobox"
                                                        variant="outline"
                                                    >
                                                        {field.value
                                                            ? playersInTeamState.find(player => player.id === field.value)?.name
                                                            : "Tìm vận đội trưởng"}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput className="h-9" placeholder="Tìm đội trưởng..." />
                                                    <CommandList>
                                                        <CommandEmpty>Không thấy vận động viên.</CommandEmpty>
                                                        <CommandGroup>
                                                            {playersInTeamState.map(player => (
                                                                <CommandItem
                                                                    key={player.id}
                                                                    onSelect={() => field.onChange(player.id)}
                                                                    value={String(player.name)}
                                                                >
                                                                    {player.name}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            player.id === field.value ? "opacity-100" : "opacity-0",
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Đội trưởng cho đội thi đấu.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="playerIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Danh sách thành viên</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                maxCount={99999}
                                                autoSize={true}
                                                options={players?.filter(p => p.teamId === teamId || p.teamId === null).map(p => { return { value: `${p.id}`, label: p.name } }) || []}
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setPlayersInTeamState(players?.filter(p => value.includes(String(p.id))) || [])
                                                }}
                                                placeholder="Chọn vận động viên"
                                                defaultValue={players?.filter(p => p.teamId === teamId).map(p => p.id).map(p => String(p))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="cursor-pointer" type="submit">Tạo {isLoading && <Loader2 className="size-4 animate-spin" />}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}