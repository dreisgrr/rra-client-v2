import './reportSummarySpaceInfo.css'
import { SPACE_TYPES_CODES, SPACE_TYPES } from '../../utils/definitions'

const ReportSummarySpaceInfo = ({item}) => {
    return (
        <div className='rsrSpaceInfoWrapper'>
            <div className="rsrSectionItem">
                <label className="rsrSpaceName">{item.name}</label>
            </div>
            <div className="rsrSectionItem">
                <label>Facility Type: </label> <span>{SPACE_TYPES_CODES[item.facilityType]}</span>
            </div>
            <div className="rsrSectionItem">
                <label>Total Hours Booked: </label> <span>100 hours</span>
            </div>
            <div className="rsrSectionItem">
                <label>Most Booked Time Period: </label> <span>2PM-3PM</span>
            </div>
            <div className="rsrSectionItem">
                <label>Most Booked By: </label> <span>Clinical</span>
            </div>
            <div className="rsrSectionItem">
                <label>Total Reservations: </label> <span>43</span>
            </div>
        </div>
    )
}

export default ReportSummarySpaceInfo
