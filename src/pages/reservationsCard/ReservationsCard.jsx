import './reservationsCard.css'
import { useContext } from 'react';
import { SitesContext } from '../../context/SitesContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
    faBed,
    faUsersBetweenLines,
    faPersonChalkboard,
    faComputer
  } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

import { DEFAULT_NAMES, ERROR_MESSAGE, SPACE_TYPES, SPACE_TYPES_NAMES } from '../../utils/definitions.js';
import useFetch from '../../hooks/useFetch';

import conferenceStockPhoto from "../../resources/AGT/images/conference-room-stock-photo.jpg";
import trainingStockPhoto from "../../resources/AGT/images/training-room-stock-photo.jpg";
import gymStockPhoto from "../../resources/AGT/images/gym-stock-photo.jpg";
import sleepingStockPhoto from "../../resources/AGT/images/sleeping-quarters-stock-photo2.jpg";
import workstationPhoto from "../../resources/stock/workstation.jpg";

const ReservationsCard = ({reservationInfo}) => {
    const { sites } = useContext(SitesContext);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    const sitesMatch = sites?.find( (item)=> (item._id === reservationInfo?.siteId))
    const siteName = sitesMatch?.name;
    const roomId = reservationInfo?.roomId;
    const reservation = reservationInfo;

    let query = reservationInfo.facilityType === SPACE_TYPES.SEAT ? 
        `/seats/${roomId}?id=${user._id}`
        :
        `/rooms/${roomId}?id=${user._id}`

    const { data, loading, error } = useFetch(query);

    const handleViewDetails = (e) => {
        e.preventDefault();
        navigate(`/reservations/${reservationInfo._id}`, {
            state: { roomId, reservation },
        });
    };

    return (
        <div className="reservationsItem">
            <h4>
                {siteName}
            </h4>
            <div className="reservationsItemType">
                <FontAwesomeIcon
                className="reservationsItemTypeImg"
                icon={
                    reservationInfo.facilityType === SPACE_TYPES.CONFERENCE
                    ? faUsersBetweenLines
                    : reservationInfo.facilityType === SPACE_TYPES.TRAINING
                    ? faPersonChalkboard
                    : reservationInfo.facilityType === SPACE_TYPES.GYM
                    ? faDumbbell
                    : reservationInfo.facilityType === SPACE_TYPES.SEAT
                    ? faComputer
                    : faBed
                }
                />
                <span>
                {reservationInfo.facilityType === SPACE_TYPES.CONFERENCE
                    ? SPACE_TYPES_NAMES.CONFERENCE
                    : reservationInfo.facilityType === SPACE_TYPES.TRAINING
                    ? SPACE_TYPES_NAMES.TRAINING
                    : reservationInfo.facilityType === SPACE_TYPES.GYM
                    ? SPACE_TYPES_NAMES.GYM
                    : SPACE_TYPES_NAMES.SLEEPING_QUARTERS
                }
                </span>
            </div>
            <div className="reservationsItemBox">
                <img
                src={
                    reservationInfo.facilityType === SPACE_TYPES.CONFERENCE
                    ? conferenceStockPhoto
                    : reservationInfo.facilityType === SPACE_TYPES.TRAINING
                    ? trainingStockPhoto
                    : reservationInfo.facilityType === SPACE_TYPES.GYM
                    ? gymStockPhoto
                    : reservationInfo.facilityType === SPACE_TYPES.SEAT
                    ? workstationPhoto
                    : sleepingStockPhoto
                }
                alt=""
                className="reservationsItemBoxImg"
                />
                <div className="reservationsItemBoxDesc">
                <span className="reservationsItemDates">
                    {`${format(
                    new Date(reservationInfo.reservationStartTime),
                    "MMM dd yyyy"
                    )}`}
                    <br/> {`${format(new Date(reservationInfo.reservationStartTime), "p")}`}–
                    {`${format(new Date(reservationInfo.reservationEndTime), "p")}`}
                </span>
                {loading ? (
                    DEFAULT_NAMES.LOADING_MESSAGE
                ) : error ? (
                    <>
                    <span>{error.message}</span>
                    <br />
                    <span>{ERROR_MESSAGE.CONTACT}</span>
                    </>
                ) : (
                    <>
                    <h4 className="reservationsItemBoxName">{data.name}</h4>
                    <span className="reservationsItemSubtitle">{data.description}</span>
                    </>
                )}
                <label>{reservationInfo.reservationStatus}</label>
                </div>
                <div className="reservationsItemDetails">
                <button className="reservationsItemDetailsBtn" onClick={handleViewDetails}>
                    Details 
                </button>
                </div>
            </div>
        </div>
    )
}

export default ReservationsCard
