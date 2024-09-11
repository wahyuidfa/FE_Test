"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, LabelList, Label } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { processData } from "@/lib/utils";
import LoadingComponent from "../LoadingComponent";

export const description = "A donut chart";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    shift1: {
        label: "Shift 1",
        color: "#fbcf16",
    },
    shift2: {
        label: "Shift 2",
        color: "#0d4ca1",
    },
    shift3: {
        label: "Shift 3",
        color: "#000",
    },
};

export function DonutChartComponent({ response, loading }) {
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        if (!response) return;
        const getData = () => {
            const result = processData(response);
            setResultData(result);
        };
        getData();
    }, [response]);
    console.log(resultData, "donut data");

    if (loading) return <><LoadingComponent /></>
    return (
        <ChartContainer
            config={chartConfig}
            className='w-full min-h-[150px]'>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={resultData}
                    dataKey='percentage'
                    nameKey='name'
                    innerRadius={50}>

                    {/* <LabelList dataKey="percentage" position="inside" /> */}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor='middle'
                                        dominantBaseline='middle'>
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className='fill-foreground text-3xl font-bold'>
                                            {resultData.reduce((acc, arr) => {
                                                acc += arr.value;
                                                return acc;
                                            }, 0)}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className='fill-muted-foreground'>
                                            Total Lalin
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>

                <ChartLegend>
                    <ChartLegendContent nameKey='name' dataKey='percentage' payload={resultData} />
                </ChartLegend>
            </PieChart>
        </ChartContainer>
    );
}
