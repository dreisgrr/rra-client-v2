import './barChartSiteUtilization.css'
import {
    BarChart,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
  } from "recharts";
import { forwardRef } from 'react';

const BarChartSiteUtilization = forwardRef( function BarChartSiteUtilization({data}, ref) {
    return (
        <div className='bcsuContainer' ref={ref}>
            <div className="bcWrapper">
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="site" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hoursBooked" fill="#8884d8" />
                    <Bar dataKey="hoursAvailable" fill="#82ca9d" />
                </BarChart>
            </div>
            <p className="bcsuTitle">Total utilization for {data[0]?.timePeriod}</p>
        </div>
    )
})

export default BarChartSiteUtilization
