"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Label,
    LabelList,
} from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
    ChartLegendContent,
    ChartTooltip,
    ChartLegend,
    ChartStyle,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { calculateTransactionCounts } from "@/lib/utils";
import LoadingComponent from "../LoadingComponent";

const chartConfig = {
    name: {
        label: "name",
        color: "#2563eb",
    },
};

export function BarChartComponent({ response, type, loading }) {
    const [data, setData] = useState(null);
    const [totalsArray, setTotalsArray] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (type === "lalin") {
            if (!response || !response.data || !response.data.rows) return;
            const totals = response?.data?.rows?.rows?.reduce(
                (acc, row) => {
                    acc.totalEMandiri += row.eMandiri;
                    acc.totalEBri += row.eBri;
                    acc.totalEBni += row.eBni;
                    acc.totalEBca += row.eBca;
                    acc.totalENobu += row.eNobu;
                    acc.totalEDKI += row.eDKI;
                    acc.totalEMega += row.eMega;
                    acc.totalEFlo += row.eFlo;
                    return acc;
                },
                {
                    totalEMandiri: 0,
                    totalEBri: 0,
                    totalEBni: 0,
                    totalEBca: 0,
                    totalENobu: 0,
                    totalEDKI: 0,
                    totalEMega: 0,
                    totalEFlo: 0,
                }
            );
            // Membuat array sesuai format yang diinginkan
            const totalsArr = [
                { name: "Mandiri", value: totals?.totalEMandiri },
                { name: "BRI", value: totals?.totalEBri },
                { name: "BNI", value: totals?.totalEBni },
                { name: "BCA", value: totals?.totalEBca },
                { name: "Nobu", value: totals?.totalENobu },
                { name: "DKI", value: totals?.totalEDKI },
                { name: "Mega", value: totals?.totalEMega },
                { name: "Flo", value: totals?.totalEFlo },
            ];
            console.log(totalsArr, "total");
            setTotalsArray(totalsArr);
        } else if (type === "gerbang") {
            if (!response || !response.data || !response.data.rows) return;
            const getData = () => {
                const result = calculateTransactionCounts(response);
                setTotalsArray(result);
            };
            getData();
        } else {
            return;
        }
    }, [response]);
    if (loading) return <><LoadingComponent /></>
    return (
        <ChartContainer config={chartConfig} className='min-h-[150px] w-full'>
            <BarChart accessibilityLayer data={totalsArray}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey='name'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={value => value.slice(0, 3)}
                />
                <YAxis
                    dataKey='value'
                    tickLine={false}
                    tickMargin={10}
                    label={
                        type === "lalin"
                            ? { value: "Jumlah Lalin", angle: -90, position: "insideLeft" }
                            : { value: "Jumla Gerbang", angle: -90, position: "insideLeft" }
                    }
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar dataKey='value' fill='#2563eb' radius={4} />
                {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
            </BarChart>
        </ChartContainer>
    );
}
