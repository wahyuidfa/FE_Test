"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import TableComponent from "../table-component";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "../ui/select";
import { useRouter } from "next/navigation";
import PaginationComponent from "../pagination-component";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "../ui/button";
import { DiscIcon, FileInput } from "lucide-react";

const listTabs = [
    "Total Tunai",
    "Total E-Toll",
    "Total E-Flo",
    "Total KTP",
    "Total Keseluruhan",
    "Total E-Toll+Tunai+Flo",
];

function LalinDashboardComponent(props) {
    const searchParams = useSearchParams();
    const tanggal = searchParams.get("tanggal");
    console.log(tanggal);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let response;
                if (!tanggal) {
                    response = await axios.get(
                        `http://localhost:8080/api/lalins?limit=10000`
                    );
                } else {
                    response = await axios.get(
                        `http://localhost:8080/api/lalins?tanggal=${tanggal}`
                    );
                }
                setLoading(false);
                setData(response.data);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tanggal]);
    return (
        // <Card>
        <>
            <Tabs className='mt-2' defaultValue='Total Tunai'>
                <div className="flex justify-end">
                    {" "}
                    <Button variant='secondary' className='my-2 justify-end'>
                        <FileInput /> Export
                    </Button>
                </div>

                <Card>
                    {" "}
                    <TabsList className='flex flex-wrap h-auto justify-start '>
                        {listTabs.map(val => (
                            <TabsTrigger value={val}>{val}</TabsTrigger>
                        ))}
                    </TabsList>
                </Card>

                {listTabs.map(val => (
                    <TabsContent value={val}>
                        <TableComponent response={data} type={val} />
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
}

export default LalinDashboardComponent;
