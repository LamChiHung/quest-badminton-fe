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
import { CalendarIcon, Eye, EyeOff, Loader2, LockIcon, MailIcon, Plus, PlusIcon, UserPlus } from "lucide-react"

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


const addPlayerSchema = z.object({
    captainId: z.number("Vui lòng chọn đội trưởng"),
    playerIds: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 vận động viên")
});
export type AddPlayerSchemaType = z.infer<typeof addPlayerSchema>

interface AddPlayerDialogProps {
    teamId: number,
    players?: PlayerResponse[]
}
export default function AddPlayerDialog({ teamId, players }: AddPlayerDialogProps) {

    const form = useForm<AddPlayerSchemaType>({
        resolver: zodResolver(addPlayerSchema),
        defaultValues: {
            captainId: undefined,
            playerIds: players?.filter(p => p.teamId !== teamId).map(p => p.id).map(p => String(p)) || [],
        }
    })

    const [open, setOpen] = useState(false);
    const [addPlayer, { isLoading, isSuccess, error, data }] = useAddPlayerToTeamMutation()

    const onSubmit = async (values: AddPlayerSchemaType) => {
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
                                <DialogTitle>Thêm đội thi đâu</DialogTitle>
                                <DialogDescription>
                                    Form tạo đội thi đấu, hãy điền đầy đủ thông tin.
                                </DialogDescription>
                            </DialogHeader>
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
                                                options={players?.map(p => { return { value: `${p.id}`, label: p.name } }) || []}
                                                value={field.value}
                                                onValueChange={field.onChange}
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