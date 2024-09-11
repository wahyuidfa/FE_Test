"use client"
import React from 'react';
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChartComponent } from './barchart-component';
import { DonutChartComponent } from './donut-chart-component';
import dynamic from 'next/dynamic';
import LoadingComponent from '../LoadingComponent';
function DashboardComponents(props) {
    const searchParams = useSearchParams()
    const tanggal = searchParams.get('tanggal')
    console.log(tanggal);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                let response;
                if (!tanggal) {
                    response = await axios.get(`http://localhost:8080/api/lalins?limit=1000`);
                } else {
                    response = await axios.get(`http://localhost:8080/api/lalins?limit=1000&tanggal=${tanggal}`);
                }
                setLoading(false)
                setData(response.data);
            } catch (error) {
                setLoading(false)
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tanggal]);

    // console.log(data);
    // if (loading) return <><LoadingComponent /></>
    if (!data) {
        return <div>No data available</div>; // Show a message if no data is available
    }
    return (
        <div className='py-4 grid grid-cols-2'>
            <BarChartComponent response={data} type={'lalin'} loading={loading} />
            <DonutChartComponent response={data} loading={loading} />
            <BarChartComponent response={data} type={'gerbang'} loading={loading} />
            <DonutChartComponent response={data} loading={loading} />
        </div>
    );
}

export default DashboardComponents