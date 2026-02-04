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
import { useCreateRoundMutation, useCreateTeamMutation } from "@/services/tour";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RoundTypeEnumText } from "@/types/enums";


const createRoundSchema = z.object({
    name: z.string().nonempty({ message: "Vui lòng nhập tên vòng đấu" }),
    type: z.string().nonempty({ message: "Vui lòng chọn loại vòng đấu" }),
});
export type CreateRoundSchemaType = z.infer<typeof createRoundSchema>

interface CreateRoundDialogProps {
    tourId: number
}
export default function CreateRoundDialog({ tourId }: CreateRoundDialogProps) {
    const TYPE_ENTRIES = Object.entries(RoundTypeEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof RoundTypeEnumText,
            value,
        })
    );

    const form = useForm<CreateRoundSchemaType>({
        resolver: zodResolver(createRoundSchema),
        defaultValues: {
            name: "",
            type: ""
        }
    })

    const [open, setOpen] = useState(false);
    const [createRound, { isLoading, isSuccess, error, data }] = useCreateRoundMutation()

    const onSubmit = async (values: CreateRoundSchemaType) => {
        await createRound({
            name: values.name,
            tourId: tourId,
            type: values.type
        }).unwrap()
            .then(res => {
                toast.success("Tạo vòng đấu thành công!")
                form.reset();
                setOpen(false)
            })
    }


    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className="cursor-pointer"> <Plus />Thêm vòng đấu</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Thêm vòng đấu</DialogTitle>
                                <DialogDescription>
                                    Form tạo vòng đấu, hãy điền đầy đủ thông tin.
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
                                                    placeholder="Tên vòng đấu"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Chọn loại vòng đấu" />
                                                    </SelectTrigger>
                                                </div>
                                            </FormControl>
                                            <SelectContent>
                                                {TYPE_ENTRIES.map((t) => (
                                                    <SelectItem key={t.key} value={t.key}>
                                                        {t.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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