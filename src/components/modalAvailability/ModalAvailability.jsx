import './modalAvailability.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import useFetch from '../../hooks/useFetch.js'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import TimeBlock from '../timeBlock/TimeBlock'

const ModalAvailability = ({selectedRoom, openAvailabilityModal, requestDetails, hoursDef}) => {
    console.log(selectedRoom)
    console.log(requestDetails)
    console.log(hoursDef)
    const { user } = useContext(AuthContext)
    // const { data, loading, error } = useFetch(`/reservations/isavailable?roomId=${selectedRoom._id}&requestStart=${requestDetails.requestStartTime}&requestEnd=${requestDetails.requestEndTime}&id=${user._id}`);
    return (
        <div className="modalAvailability">
            <div className="modalAvailabilityContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="closeModal"
                    onClick={ ()=> openAvailabilityModal(false)}
                />
                <div className="modalAvailabilityTitle">
                    <h3>Availability</h3>
                </div>
                <div className="modalAvailabilityContent">
                    <div className="timeBlockWrapper">
                        {
                            hoursDef.map((item, key) => (
                                <TimeBlock item={item} roomId={selectedRoom._id} timeBlockStartTime={key} requestDetails={requestDetails} userId={user._id} />
                            ))
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ModalAvailability
