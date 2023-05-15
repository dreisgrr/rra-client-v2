import React from 'react'
import useFetch from '../../hooks/useFetch'
import { format } from "date-fns";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ReservationRoomInfo = ({reservationInfo}) => {
    const { user } = useContext(AuthContext)
    console.log(reservationInfo)
    let query = reservationInfo.facilityType === 'seat' ? 
        `/seats/${reservationInfo.roomId}?domainId=${user.domainId}&id=${user._id}`
        :
        `/rooms/${reservationInfo.roomId}?domainId=${user.domainId}&id=${user._id}`
    const {data, loading, error} = useFetch(query)
    let created = new Date(reservationInfo.createdAt)
    return (
        <>
            <div className="reservationItemItem">
                <label>Request submitted on</label>
                <span>{`${format(created, "MMM dd yyyy")}`}</span>
             </div>
             <div className="reservationItemItem">
                <label>Site Location</label>
                <span>{data.siteId === '63b56fea41184440f9f90696' ? 'AGT' : data.siteId === '63b56f2241184440f9f90694' ? 'GLAS' : data.siteId === '63b570b7b9b00d78455bf72d' ? 'OFT' : 'SMS'}</span>
            </div>
            <div className="reservationItemItem">
                <label>Name of room</label>
                <span>{data.name}</span>
            </div>
            <div className="reservationItemItem">
                <label>Floor</label>
                <span>{data.floor}</span>
            </div>
            <div className="reservationItemItem">
                <label>Capacity</label>
                <span>{data.capacity}</span>
            </div>  
        </>
    )
}

export default ReservationRoomInfo
