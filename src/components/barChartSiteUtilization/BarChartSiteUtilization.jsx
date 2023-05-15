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

const BarChartSiteUtilization = ({data}) => {
    return (
        <div className='bcsuContainer'>
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
}

export default BarChartSiteUtilization
