import './searchResult.css'


import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { SPACE_TYPES_CODES, SPACE_TYPES, MODAL_MESSAGE } from '../../utils/definitions.js'
import requestUrl from '../../utils/requestMethods.js'

import useFetch from '../../hooks/useFetch.js'
import { AuthContext } from '../../context/AuthContext.js'
import ReservationForm from '../reservationForm/ReservationForm';
import SearchResultCard from '../searchResultCard/SearchResultCard';
import ModalAvailability from '../../components/modalAvailability/ModalAvailability';
import ModalMessage from '../../components/modalMessage/ModalMessage';
import AutoLogout from '../../components/autoLogout/AutoLogout';

const SearchResult = ({searchQuery}) => {
    const { user } = useContext(AuthContext)
    const location = useLocation();
    const { state } = location;
    console.log(state)
    const navigate = useNavigate();
    const [hours, setHours] = useState([]);
    const [userActiveRes, setUserActiveRes] = useState(0);
    const [messageModal, setMessageModal] = useState('');

    const today = new Date()
    const generateHours = () => {
        let hoursDef = [];
        let tempHours = '';
        for (let ctrHour = 0; ctrHour < 24; ctrHour++) {
            //today.setMinutes("00")
            if (ctrHour < 13) {
                today.setHours(ctrHour)
                tempHours = (ctrHour < 10 ? '0' : '') + ctrHour;
                if (tempHours === "00") tempHours = '12'; 
                tempHours = ctrHour === 12 ? `${tempHours}:00 PM` : `${tempHours}:00 AM`
            }
            else {
                //today.setHours(ctrHour-12)
                let pmHour = ctrHour-12;
                tempHours = (pmHour < 10 ? '0' : '') + pmHour;
                tempHours = `${tempHours}:00 PM`
            }
            hoursDef.push(`${tempHours}`)
        }
        setHours(hoursDef);
    }
    useEffect( () => {
        const onPageLoad = () => {
            generateHours();
        };
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, [])
    const [openReservationModal, setOpenReservationModal] = useState(false)
    const [selectedRoomToReserve, setSelectedRoomToReserve] = useState({});
    const handleReserve = (room) => {
        //check active reservations
        if (((user?.permissions?.isManager || user?.permissions?.isWorkforce) && userActiveRes > 1) ||
        ((user?.permissions?.isAssociate && !(user?.permissions?.isManager || user?.permissions?.isWorkforce)) && userActiveRes > 0)) {
            if (user?.permissions?.isAssociate) 
                setMessageModal('You are not allowed to have more than one active reservation at a time.')
            if (user?.permissions?.isManager || user?.permissions?.isWorkforce)
                setMessageModal('You are not allowed to have more than two active reservation at a time.')
            setOpenModalMessage(true)
        }
        else {
            setOpenReservationModal(true)
            setSelectedRoomToReserve(room);
        }
    }
    const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false)
    const handleAvailability = (room) => {
        setOpenAvailabilityModal(true)
        setSelectedRoomToReserve(room)
    }
    const [openModalMessage, setOpenModalMessage] = useState(false)
    
    const goHome = (e) => {
        e.preventDefault()
        navigate('/search');
    }
    let query = state?.search === SPACE_TYPES.SEAT ? 
        `/seats/getavailable?siteId=${state?.site}&requestStart=${state?.requestStartTime}&requestEnd=${state?.requestEndTime}&id=${user._id}` 
        : 
        (state?.search === SPACE_TYPES.GYM || state?.search === SPACE_TYPES.SLEEPING_QUARTERS) ? 
        `/rooms/getavailableSlots?siteId=${state?.site}&facilityType=${state?.search}&capacity=${state?.options.pax}&requestStart=${state?.requestStartTime}&requestEnd=${state?.requestEndTime}&id=${user._id}`
        :
        `/rooms/getavailable?siteId=${state?.site}&facilityType=${state?.search}&capacity=${state?.options.pax}&requestStart=${state?.requestStartTime}&requestEnd=${state?.requestEndTime}&id=${user._id}`
    const { data, loading, error } = useFetch(query);

    useEffect(() => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: 'same-origin'
        }
        requestUrl.get(`/reservations/countUserActiveReservations?domainId=${user.domainId}&id=${user._id}`, config)
        .then(response => setUserActiveRes(response.data))
        .catch(error => { 
            console.error(error)
        })
    }, [user])
    return (
        <AutoLogout>
            <div className="searchResultContainer">
                <div className="searchResultHeader">
                    <h3>Search Result</h3>
                    {/* {data.length} */}
                </div>
                <div className="searchResultWrapper">
                    <div className="searchResultParamsBox">
                        <div className="searchResultParamsItemWrapper">
                            <div className="searchResultParamsItem">
                                <label>Space Type</label>
                                <span>{SPACE_TYPES_CODES[`${state?.search}`]}</span>
                            </div>
                            <div className="searchResultParamsItem">
                                <label>Site</label>
                                <span>{state?.site === '63b56fea41184440f9f90696' ? 'AGT' : state?.site === '63b56f2241184440f9f90694' ? 'GLAS' : state?.site === '63b570b7b9b00d78455bf72d' ? 'OFT' : 'SMS'}</span>
                            </div>
                            <div className="searchResultParamsItem">
                                <label>Date</label>
                                <span>{`${format(state?.date.date, "MM/dd/yyyy")}`}</span>
                            </div>
                            <div className="searchResultParamsItemOptions">
                                <div className="searchResultParamsItemOptionsWrapper">
                                    <div className="searchResultParamsItemOptionsItem">
                                        <span className="searchResultParamsItemOptionsItemText">Start Time</span>
                                        <span className="searchResultParamsItemOptionsItemValue">{`${hours[state?.computedStartTime]}`}</span>
                                    </div>
                                    <div className="searchResultParamsItemOptionsItem">
                                        <span className="searchResultParamsItemOptionsItemText">Duration</span>
                                        <span className="searchResultParamsItemOptionsItemValue">{ state?.duration === 1 ? `${state?.duration} hour` : `${state?.duration} hours`}</span>
                                    </div>
                                    <div className="searchResultParamsItemOptionsItem">
                                        <span className="searchResultParamsItemOptionsItemText">Pax</span>
                                        <span className="searchResultParamsItemOptionsItemValue">{state?.options.pax}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={goHome}>Back</button>
                    </div>
                    <div className="searchResultList">
                            {
                                loading ?
                                    "Loading..."
                                :
                                    error ? 
                                        <>
                                            <span>{error.message}</span><br/>
                                            <span>Contact System Administrator</span>
                                        </>
                                    :
                                        Object.keys(data).length === 0 ?
                                            "No matches found"
                                        :
                                            <> 
                                                {data.map((item) => (
                                                <SearchResultCard 
                                                    key={item._id} 
                                                    room={item}
                                                    handleReserve={handleReserve}
                                                    handleAvailability={handleAvailability}
                                                />
                                                ))}
                                            </>
                            }
                    </div>
                </div>
                { openReservationModal && 
                    <ReservationForm selectedRoom={selectedRoomToReserve} openReservationModal={setOpenReservationModal} requestDetails={location.state} hoursDef={hours}/>
                }
                {
                    openAvailabilityModal &&
                    <ModalAvailability selectedRoom={selectedRoomToReserve} openAvailabilityModal={setOpenAvailabilityModal} requestDetails={location.state} hoursDef={hours} />
                }
                {
                    openModalMessage &&
                    <ModalMessage openModalMessage={setOpenModalMessage} message={messageModal} title={MODAL_MESSAGE.RESERVATION_LIMIT}/>
                }
            </div>
        </AutoLogout>
    )
}

export default SearchResult
