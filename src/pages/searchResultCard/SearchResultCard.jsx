import './searchResultCard.css'

import conferenceStockPhoto from  "../../resources/AGT/images/conference-room-stock-photo.jpg"
import trainingStockPhoto from "../../resources/AGT/images/training-room-stock-photo.jpg"
import gymStockPhoto from "../../resources/AGT/images/gym-stock-photo.jpg"
import sleepingStockPhoto from "../../resources/AGT/images/sleeping-quarters-stock-photo2.jpg"
import workstationPhoto from "../../resources/stock/workstation.jpg"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js'
import { SPACE_TYPES } from '../../utils/definitions.js'

const SearchResultCard = ({room, handleReserve, handleAvailability}) => {
    const { user } = useContext(AuthContext)
    
    const handleViewAvailability = (room) => {
        console.log(room)
    }
    return (
        <div className="searchItem">
            <img
                src={room.facilityType === 'conference' ? conferenceStockPhoto : room.facilityType === 'training' ? trainingStockPhoto : room.facilityType === 'gym' ? gymStockPhoto : room.facilityType === 'sleeping' ? sleepingStockPhoto : workstationPhoto}
                alt=""
                className="searchItemImg"
            />
            <div className="searchItemDesc">
                <h1 className="searchItemName">{room.name}</h1>
                <span className="searchItemSubtitle">
                    {room.description}
                </span>
                <label>
                    {room.isRestricted === false ? 'Available' : 'Restricted'}
                </label>
                {
                    room?.features === undefined ? '' :  
                        room?.features?.withCisco === false ? '' :    
                        <>
                            <label>Features: CISCO Equipped </label>
                            {/* <span className="rliFeatures">With CISCO</span>*/}
                        </> 
                    
                }
                <label>Floor: {room.floor}</label>
                {
                    room?.facilityType !== undefined ? 
                    <>
                        <label>Capacity: {room.capacity}</label>
                    </> :
                    <>
                        <label>Screen Count: {room.screenCount}</label>
                        <label>Workstation Type: {room.workstationType}</label>
                    </>
                }
                
            </div>
            <div className="searchItemDetails">
                <button className="searchItemReserveBtn" disabled={room.isRestricted && !user.permissions.isAdmin ? true : false} onClick={ ()=>handleReserve(room)}>Reserve</button>
                <button className="searchItemReserveBtn" onClick={ ()=>handleAvailability(room)}>Availability</button>
            </div>
        </div>
    )
}

export default SearchResultCard
