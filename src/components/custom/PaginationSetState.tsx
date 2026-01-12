import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationSetStateProps {
    currentPage: number,
    totalPage: number,
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>
}

export default function PaginationSetState({ props }: { props: PaginationSetStateProps }) {

    return (
        <div
            className="flex justify-center self-start pt-6 w-full"
            style={{
                all: 'revert',
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                paddingTop: '1.5rem',
                width: '100%',
                fontSize: '14px',
                lineHeight: '1.5',
                letterSpacing: 'normal'
            }}
        >
            <Pagination>
                <PaginationContent>
                    {props.currentPage > 1 ?
                        <PaginationItem>
                            <PaginationPrevious data={props.data} setData={props.setData} value={props.currentPage - 3} href="#" />
                        </PaginationItem>
                        : <></>}
                    {props.currentPage > 0 ?
                        <PaginationItem>
                            <PaginationLink data={props.data} setData={props.setData} value={props.currentPage - 1} href="#">{props.currentPage}</PaginationLink>
                        </PaginationItem>
                        : <></>}
                    <PaginationItem>
                        <PaginationLink data={props.data} setData={props.setData} value={props.currentPage} href="#" isActive>
                            {props.currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                    {props.currentPage < props.totalPage - 1 ?
                        <PaginationItem>
                            <PaginationLink data={props.data} setData={props.setData} value={props.currentPage + 1} href="#" onClick={(e) => e.preventDefault()}>{props.currentPage + 2}</PaginationLink>
                        </PaginationItem>
                        : <></>}
                    {props.currentPage < props.totalPage - 2 ?
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        : <></>
                    }
                    {props.currentPage < props.totalPage - 2 ?
                        <PaginationItem>
                            <PaginationNext data={props.data} setData={props.setData} value={props.currentPage + 3} href="#" onClick={(e) => e.preventDefault()} />
                        </PaginationItem>
                        : <></>}
                </PaginationContent>
            </Pagination>
        </div>
    )
}