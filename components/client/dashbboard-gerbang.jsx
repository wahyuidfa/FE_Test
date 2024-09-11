"use client"
import React from 'react';
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChartComponent } from './barchart-component';
import { DonutChartComponent } from './donut-chart-component';
import dynamic from 'next/dynamic';
import LoadingComponent from '../LoadingComponent';
import TableGerbangComponent from '../table-gerbang-component';
function DashboardGerbang(props) {
    // const searchParams = useSearchParams()
    // const tanggal = searchParams.get('tanggal')
    // console.log(tanggal);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                let response;
                response = await axios.get(`http://localhost:8080/api/gerbangs`);
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
    }, []);

    console.log(data);
    // if (loading) return <><LoadingComponent /></>
    if (!data) {
        return <div>No data available</div>; // Show a message if no data is available
    }
    return (
        <div className=''>
            <TableGerbangComponent response={data} />
        </div>
    );
}

export default DashboardGerbang