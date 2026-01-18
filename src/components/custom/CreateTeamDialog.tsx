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
import { useCreateTeamMutation } from "@/services/tour";


const createTeamSchema = z.object({
    name: z.string().nonempty({ message: "Vui lòng nhập tên giải đấu" }),
});
export type CreateTeamSchemaType = z.infer<typeof createTeamSchema>

interface CreateTeamDialogProps {
    tourId: number
}
export default function CreateTeamDialog({ tourId }: CreateTeamDialogProps) {

    const form = useForm<CreateTeamSchemaType>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            name: ""
        }
    })

    const [open, setOpen] = useState(false);
    const [createTeam, { isLoading, isSuccess, error, data }] = useCreateTeamMutation()

    const onSubmit = async (values: CreateTeamSchemaType) => {
        await createTeam({
            name: values.name,
            tourId: tourId
        }).unwrap()
            .then(res => {
                toast.success("Tạo đội thành công!")
                form.reset();
                setOpen(false)
            })
    }


    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className="cursor-pointer"> <Plus />Thêm đội</Button>
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Tên đội"
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