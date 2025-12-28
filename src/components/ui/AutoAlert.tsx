import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function AutoAlert(props: { subject: string, message: string }) {

    const [open, setOpen] = useState(true)

    return (
        <div className="w-full p-6 flex justify-center">
            <AlertDialog open={open} onOpenChange={setOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{props.subject}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {props.message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="cursor-pointer" onClick={() => setOpen(false)}>Xác nhận</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}