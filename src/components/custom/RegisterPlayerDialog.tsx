import { useRegisterPlayerMutation } from "@/services/tour";
import { GenderEnum, GenderEnumText, PlayerTierEnum, PlayerTierEnumText } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v3";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Info, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const createPlayerSchema = z.object({
    tourId: z.number({ message: "Vui lòng chọn giải đấu" }),
    tier: z.string().nonempty({ message: "Vui lòng chọn trình độ" }),
    gender: z.string().nonempty({ message: "Vui lòng chọn giới tính đăng ký" }),
});
export type CreatePlayerSchemaType = z.infer<typeof createPlayerSchema>
interface RegisterPlayerDialogProps {
    id: number
}

export default function RegisterPlayerDialog({ id }: RegisterPlayerDialogProps) {
    const TIER_ENTRIES = Object.entries(PlayerTierEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof PlayerTierEnumText,
            value,
        })
    );
    const GENDER_ENTRIES = Object.entries(GenderEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof GenderEnumText,
            value,
        })
    );

    const form = useForm<CreatePlayerSchemaType>({
        resolver: zodResolver(createPlayerSchema),
        defaultValues: {
            tourId: id,
            tier: "",
            gender: "",
        }
    })

    const [open, setOpen] = useState(false);
    const [createPlayer, { isLoading, isSuccess, error, data }] = useRegisterPlayerMutation();

    const onSubmit = async (values: CreatePlayerSchemaType) => {
        await createPlayer({
            tourId: id,
            tier: values.tier,
            gender: values.gender,
        }).unwrap()
            .then(res => {
                toast.success("Đăng ký thành công! Vui lòng chờ Ban tổ chức duyệt đơn tham gia.")
                form.reset();
                setOpen(false)
            })
    }

    const clickDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return (
        <div onClick={(e) => clickDialog(e)} className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className="cursor-pointer hover:opacity-80">Đăng ký</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Đăng ký tham gia giải đấu</DialogTitle>
                                <DialogDescription>
                                    Form đăng ký tham gia giải đấu, hãy điền đầy đủ thông tin.
                                </DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="tier"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Chọn trình độ" />
                                                    </SelectTrigger>
                                                </div>
                                            </FormControl>
                                            <SelectContent>
                                                {TIER_ENTRIES.map((t) => (
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
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="pb-1">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Info size={12} className="text-neutral-500 cursor-pointer" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Giới tính đăng ký không phải giới tính thật.</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Chọn giới tính đăng ký thi đấu" />
                                                    </SelectTrigger>
                                                </div>
                                            </FormControl>
                                            <SelectContent>
                                                {GENDER_ENTRIES.map((t) => (
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
                                <Button className="cursor-pointer" type="submit">Đăng ký {isLoading && <Loader2 className="size-4 animate-spin" />}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}