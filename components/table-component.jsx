import React from "react";
import { Card } from "./ui/card";
import {
    Table,
    TableCaption,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { calculateTunaiTransactions, ktpTransaction, processTransactionData, calculateTotalsByCabang, getDayFromDate } from "@/lib/utils";
import PaginationComponent from "./pagination-component";
import usePaginationStore from "@/hooks/use-pagination-store";

function TableComponent({ response, type }) {
    const { page, setPage, setLimit, limit } = usePaginationStore();
    let result
    let totalCabang
    if (type === 'Total Tunai') {
        result = calculateTunaiTransactions(response?.data?.rows?.rows)

    } else if (type === 'Total E-Toll') {
        result = processTransactionData(response?.data?.rows?.rows)
    } else {
        result = ktpTransaction(response?.data?.rows?.rows)
    }

    if (result) totalCabang = calculateTotalsByCabang(result)
    console.log(totalCabang);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResult = result.slice(startIndex, endIndex);
    const totalPages = Math.ceil(result.length / limit);
    const getCabangTotal = (index, golongan) => {
        return totalCabang?.totalsByCabangArray[index]?.[golongan] || 0;
    };

    const getTotalPerGolongan = (golongan) => {
        return (getCabangTotal(0, golongan) + getCabangTotal(1, golongan));
    };
    return (
        <>
            <Card>
                <ScrollArea className='h-[300px] overflow-y-auto overflow-x-auto p-2  w-full'>
                    <Table className=''>

                        <TableHeader className=''>
                            <TableRow className='w-28 overflow-y-auto  '>
                                <TableHead>No</TableHead>
                                <TableHead className='w-[100px]'>Ruas</TableHead>
                                <TableHead className='w-[100px]'>Gerbang</TableHead>
                                <TableHead className='w-[100px]'>Gardu</TableHead>
                                <TableHead className='w-[100px] text-right'>Hari</TableHead>
                                <TableHead className='w-[100px] text-right'>Tanggal</TableHead>
                                <TableHead className='w-[100px] text-right'>
                                    Metode Pembayaran
                                </TableHead>
                                <TableHead className='w-[100px] text-right'>Gol I</TableHead>
                                <TableHead className='w-[100px] text-right'>Gol II</TableHead>
                                <TableHead className='w-[100px] text-right'>Gol III</TableHead>
                                <TableHead className='w-[100px] text-right'>Gol IV</TableHead>
                                <TableHead className='w-[100px] text-right'>Gol V</TableHead>
                                <TableHead className='w-[100px] text-right'>
                                    Total Lalin
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{
                            paginatedResult.map((res, id) => (

                                <TableRow>
                                    <TableCell>{id + 1}</TableCell>
                                    <TableCell className='font-medium'>{res.IdCabang}</TableCell>
                                    <TableCell>{res.IdGerbang}</TableCell>
                                    <TableCell>{res.IdGardu}</TableCell>
                                    <TableCell className='text-right'>{getDayFromDate(res.Tanggal)}</TableCell>
                                    <TableCell className='text-right'>{res.Tanggal}</TableCell>
                                    <TableCell className='text-right'>{res.MetodePembayaran}</TableCell>
                                    <TableCell className='text-right'>{res.Golongan[1]}</TableCell>
                                    <TableCell className='text-right'>{res.Golongan[2]}</TableCell>
                                    <TableCell className='text-right'>{res.Golongan[3]}</TableCell>
                                    <TableCell className='text-right'>{res.Golongan[4]}</TableCell>
                                    <TableCell className='text-right'>{res.Golongan[5]}</TableCell>
                                    <TableCell className='text-right'>{res.Total}</TableCell>
                                </TableRow>

                            ))
                        }
                        </TableBody>
                        <TableFooter>
                            {totalCabang?.totalsByCabangArray.map((cabang, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-center' colSpan={7}>
                                        Total Lalin Ruas {cabang?.IdCabang}
                                    </TableCell>
                                    <TableCell className='text-right'>{cabang?.golongan1 || 0}</TableCell>
                                    <TableCell className='text-right'>{cabang?.golongan2 || 0}</TableCell>
                                    <TableCell className='text-right'>{cabang?.golongan3 || 0}</TableCell>
                                    <TableCell className='text-right'>{cabang?.golongan4 || 0}</TableCell>
                                    <TableCell className='text-right'>{cabang?.golongan5 || 0}</TableCell>
                                    <TableCell className='text-right'>{cabang?.total || 0}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell className='text-center' colSpan={7}>
                                    Total Lalin Keseluruhan
                                </TableCell>
                                <TableCell className='text-right'>{getTotalPerGolongan('golongan1')}</TableCell>
                                <TableCell className='text-right'>{getTotalPerGolongan('golongan2')}</TableCell>
                                <TableCell className='text-right'>{getTotalPerGolongan('golongan3')}</TableCell>
                                <TableCell className='text-right'>{getTotalPerGolongan('golongan4')}</TableCell>
                                <TableCell className='text-right'>{getTotalPerGolongan('golongan5')}</TableCell>
                                <TableCell className='text-right'>
                                    {(getCabangTotal(0, 'total') + getCabangTotal(1, 'total'))}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </ScrollArea>
            </Card>
            <PaginationComponent totalPages={totalPages} />
        </>
    );
}

export default TableComponent;
