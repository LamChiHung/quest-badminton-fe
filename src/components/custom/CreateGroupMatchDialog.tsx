import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Loader2, Plus } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import { useCreateGroupMatchMutation, useCreateRoundMutation, useCreateTeamMutation } from "@/services/tour";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RoundTypeEnumText } from "@/types/enums";


const createGroupMatchSchema = z.object({
    name: z.string().nonempty({ message: "Vui lòng nhập tên nhóm trận" }),
});
export type CreateGroupMatchSchemaType = z.infer<typeof createGroupMatchSchema>

interface CreateGroupMatchDialogProps {
    tourId?: number,
    roundId?: number
}
export default function CreateGroupMatchDialog({ tourId, roundId }: CreateGroupMatchDialogProps) {

    const form = useForm<CreateGroupMatchSchemaType>({
        resolver: zodResolver(createGroupMatchSchema),
        defaultValues: {
            name: "",
        }
    })
    const [createGroupMatch, { isLoading, isSuccess, error, data }] = useCreateGroupMatchMutation()

    const [open, setOpen] = useState(false);

    const onSubmit = async (values: CreateGroupMatchSchemaType) => {
        await createGroupMatch({
            name: values.name,
            tourId: tourId,
            roundId: roundId
        }).unwrap()
            .then(res => {
                toast.success("Tạo nhóm trận thành công!")
                form.reset();
                setOpen(false)
            })
    }


    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="cursor-pointer"> <Plus />Thêm nhóm trận</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Thêm nhóm trận</DialogTitle>
                                <DialogDescription>
                                    Form tạo nhóm trận, hãy điền đầy đủ thông tin.
                                </DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Tên nhóm trận: Bảng A Đơn Nam"
                                                    {...field}
                                                />
                                            </div>
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