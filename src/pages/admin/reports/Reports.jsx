import "./reports.css";
import 'react-circular-progressbar/dist/styles.css'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar } from 'react-circular-progressbar'
import ProgressBarSpaceUtilization from "../../../components/progressBarSpaceUtilization/ProgressBarSpaceUtilization";
import BarChartSiteUtilization from "../../../components/barChartSiteUtilization/BarChartSiteUtilization";

const barChartData = [
  {
    site: "GLAS Tower",
    hoursBooked: 4000,
    hoursAvailable: 12000,
    timePeriod: 'last 30 days'
  },
  {
    site: "Alliance Global Tower",
    hoursBooked: 2745,
    hoursAvailable: 14902,
    timePeriod: 'last 30 days'
  },
  {
    site: "One Fintech Tower",
    hoursBooked: 6180,
    hoursAvailable: 11073,
    timePeriod: 'last 30 days'
  },
  {
    site: "SM Strata",
    hoursBooked: 2205,
    hoursAvailable: 13648,
    timePeriod: 'last 30 days'
  }
];

const progressbarData = {
    value: 68,
    timePeriod: "last three months",
    totalHours: 1469
}

const Reports = () => {
  return (
    <div className="reportsContainer">
      <div className="reportsHeader">
        <h3>Reports</h3>
      </div>
      <div className="reportsContent">
          
          <BarChartSiteUtilization data={barChartData} />
          {/* <ProgressBarSpaceUtilization data={progressbarData} /> */}
      </div>
    </div>
  );
};

export default Reports;
