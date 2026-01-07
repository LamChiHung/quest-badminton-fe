import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function DashboardCard({ header, content, subContent }:
    {
        header: string
        content: string
        subContent: string
    }) {
    return (
        <>
            <Card className="w-3xs h-36">
                <CardHeader className="flex flex-row items-center justify-center space-y-0">
                    <CardTitle className="text-sm font-medium">{header}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="text-2xl font-bold">{content}</div>
                    <p className="text-xs text-muted-foreground">
                        {subContent}
                    </p>
                </CardContent>
            </Card>
        </>
    )
}