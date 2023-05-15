import './progressBarSpaceUtilization.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar } from 'react-circular-progressbar'

const ProgressBarSpaceUtilization = ({data}) => {
    return (
        <div className='pbsuContainer'>
            <div className="pbWrapper">
                <CircularProgressbar value={data?.value} text={`${data?.value}%`} strokeWidth={5}/>
            </div>
            <p className="pbsuTitle">Total utilization for {data?.timePeriod}</p>
            <p className="pbsuTotalHours">{data?.totalHours} hours</p>
        </div>
    )
}

export default ProgressBarSpaceUtilization
