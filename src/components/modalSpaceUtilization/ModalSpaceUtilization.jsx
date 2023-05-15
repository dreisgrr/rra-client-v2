import './modalSpaceUtilization.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import ProgressBarSpaceUtilization from '../progressBarSpaceUtilization/ProgressBarSpaceUtilization'

const progressbarData = {
    value: 68,
    timePeriod: "last three months",
    totalHours: 1469
}
const ModalSpaceUtilization = ({openSpaceUtilModal}) => {
    return (
        <div className="modalSpaceUtil">
            <div className="modalSpaceUtilContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="closeModal"
                    onClick={ ()=> openSpaceUtilModal(false)}
                />
                <div className="modalSpaceUtilTitle">
                    <h3>Space Utilization</h3>
                </div>
                <div className="modalSpaceUtilContent">
                    <ProgressBarSpaceUtilization data={progressbarData}/>
                </div>
            </div>
        </div>
    )
}

export default ModalSpaceUtilization
