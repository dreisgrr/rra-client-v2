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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState } from "react";
import { useReactToPrint } from 'react-to-print'
import FilterBarReportSummary from "../../../components/filterBarReportSummary/FilterBarReportSummary";
import ReportSummaryResult from "../../../components/reportSummaryResult/ReportSummaryResult";
import { useRef } from "react";
import AutoLogout from "../../../components/autoLogout/AutoLogout";

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return(
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {
        value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )
      }

    </div>
  )
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

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
  const componentRef = useRef(null)
  const graphRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const handlePrintGraph = useReactToPrint({
    content: () => graphRef.current,
  })
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [selectedSite, setSelectedSite] = useState('63b56fea41184440f9f90696')
  const [urlCall, setUrlCall] = useState(`/rooms?siteId=63b56fea41184440f9f90696`)

  const handlePassFilter = (filter) => {
    setSelectedSite(filter?.state?.filterSite)
    setUrlCall(`rooms?siteId=${filter?.state?.filterSite}`)
  }

  return (
    <AutoLogout>
      <div className="reportsContainer">
        <div className="reportsHeader">
          <h3>Reports</h3>
        </div>
        <div className="reportsContent">

            <Box sx={{ width: '100%'}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='tabs'>
                  <Tab label='Site Utilization Overview' {...a11yProps(0)} />
                  <Tab label='Report Summary' {...a11yProps(1)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <BarChartSiteUtilization data={barChartData} ref={graphRef} />
                <button className="reportPrintBtn" onClick={handlePrintGraph}>Print Report</button>
                {/* <ProgressBarSpaceUtilization data={progressbarData} /> */}
              </TabPanel>
              <TabPanel value={value} index={1}>
                  <FilterBarReportSummary passFilter={(filter)=> handlePassFilter(filter)}/>
                <div className="roomListResultWrapper">
                  
                  <ReportSummaryResult selectedSite={selectedSite} urlCall={urlCall} ref={componentRef} />
                  <button className="reportPrintBtn" onClick={handlePrint}>Print Report</button>
                </div>
              </TabPanel>

            </Box>
            
            
        </div>
      </div>
    </AutoLogout>
  );
};

export default Reports;
