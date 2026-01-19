import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const getTimeLeft = (targetDate: Date): TimeLeft => {
    const diff = targetDate.getTime() - Date.now();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};


interface CountdownProps {
    date: Date
}

export default function Countdown({ date }: CountdownProps) {
    // 🎯 Ngày kết thúc
    const targetDate = date;

    console.log(targetDate);

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(
        getTimeLeft(targetDate)
    );

    useEffect(() => {
        setTimeLeft(getTimeLeft(targetDate));

        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const items = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4 flex-wrap justify-center items-center">
            {items.map((item) => (
                <Card
                    key={item.label}
                    className="w-24 h-fit text-center transition-all duration-300 bg-[rgba(43,77,80,0.4)]"
                >
                    <CardContent className="flex flex-col items-center justify-center ">
                        <span className="text-3xl text-white font-mono font-normal bg-[rgb(21,45,34)] opacity-100 w-15 h-16 flex justify-center items-center rounded-xl">
                            <span>
                                {String(item.value).padStart(2, "0")}
                            </span>
                        </span>
                        <span className="text-xl text-muted-foreground text-white font-normal">
                            {item.label}
                        </span>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
