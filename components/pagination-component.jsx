"use client"
import React from "react";
import usePaginationStore from "@/hooks/use-pagination-store";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

export default function PaginationComponent({ totalPages }) {
    const { page, setPage, setLimit, limit } = usePaginationStore();

    const handleLimitChange = (newLimit) => {
        setLimit(Number(newLimit)); // Convert string to number
        setPage(1); // Reset page to 1 when limit changes
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage); // Update page state
        }
    };

    // if (totalPages <= 1) {
    //     return null; // Do not render pagination if there's only one page or none
    // }

    return (
        <Card className='my-2'>
            <div className='flex flex-wrap gap-2 items-center justify-end'>
                <div>
                    <Select onValueChange={handleLimitChange} defaultValue={String(limit)}>
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder={`Show: ${limit} entries`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='5'>Show: 5 entries</SelectItem>
                                <SelectItem value='10'>Show: 10 entries</SelectItem>
                                <SelectItem value='15'>Show: 15 entries</SelectItem>
                                <SelectItem value='20'>Show: 20 entries</SelectItem>
                                <SelectItem value='50'>Show: 50 entries</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* Previous Button */}
                            <PaginationItem>
                                <PaginationPrevious
                                    className='mr-2'
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                />
                            </PaginationItem>

                            {/* First Page */}
                            <PaginationItem>
                                <PaginationLink
                                    className={`px-3 py-2 rounded-md ${page === 1
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                    onClick={() => handlePageChange(1)}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {/* Page 2 */}
                            {totalPages > 2 && (
                                <PaginationItem>
                                    <PaginationLink
                                        className={`px-3 py-2 rounded-md ${page === 2
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                        onClick={() => handlePageChange(2)}
                                    >
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            {/* Ellipsis if necessary */}
                            {page > 3 && totalPages > 4 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Current Page */}
                            {page > 2 && page < totalPages - 1 && totalPages > 4 && (
                                <PaginationItem>
                                    <PaginationLink
                                        className='px-3 py-2 rounded-md bg-primary text-primary-foreground'
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            {/* Ellipsis before last two pages */}
                            {page < totalPages - 2 && totalPages > 4 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Last two pages */}
                            {totalPages > 2 && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink
                                            className={`px-3 py-2 rounded-md ${page === totalPages - 1
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                }`}
                                            onClick={() => handlePageChange(totalPages - 1)}
                                        >
                                            {totalPages - 1}
                                        </PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink
                                            className={`px-3 py-2 rounded-md ${page === totalPages
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                }`}
                                            onClick={() => handlePageChange(totalPages)}
                                        >
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}

                            {/* Next Button */}
                            <PaginationItem>
                                <PaginationNext
                                    className='ml-2'
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </Card>
    );
}
