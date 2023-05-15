import './reservationItem.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ReservationContext } from '../../context/ReservationContext';
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import requestUrl from "../../utils/requestMethods.js";
import {
    reservationStatusActions,
    reservationStatus,
    ACTION_TYPES,
} from "../../utils/definitions.js";
import ReservationRoomInfo from '../../components/reservationRoomInfo/ReservationRoomInfo';
import ActionModal from '../../components/actionModal/ActionModal';

const ReservationItem = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { error, dispatch } = useContext(ReservationContext);

    const [reservation, setReservation] = useState(location.state.reservation);
    let start = new Date(reservation.reservationStartTime);
    let end = new Date(reservation.reservationEndTime);

    const [action, setAction] = useState("");
    const [remarks, setRemarks] = useState("");
    const [openActionModal, setOpenActionModal] = useState(false);

    const handlePassRemarks = (i) => {
        setRemarks(i);
    };
    const handleGoBack = () => {
        navigate("/reservations");
    };
    const handleActionModal = (e) => {
        setAction(e.target.name);
        e.preventDefault();
        setOpenActionModal(true);
    };
    const handleActionReservation = async (e) => {
        e.preventDefault();
        const { value } = reservationStatusActions.find(
          (item) => item.name === action
        );
        const payload = {
          reservationStatus: value,
          actionTaken: {
            performedBy: user.domainId,
            performedDate: new Date(),
            action: value,
            remarks: remarks,
          },
        };
        dispatch({ type: ACTION_TYPES.START });
        try {
          let config = {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: 'same-origin'
          }
          const res = await requestUrl.put(
            `/reservations/${reservation._id}?id=${user._id}`,
            payload, config
          );
          dispatch({ type: ACTION_TYPES.SUCCESS, payload: res.data });
          setReservation((prev) => ({ ...prev, payload }));
          setOpenActionModal(false);
          navigate(`/reservations`);
        } 
        catch (error) {
          console.log(error);
          dispatch({ type: ACTION_TYPES.FAILURE, payload: error.response.data });
        }
    }
    return (
        <div className="reservationItemContainer">
            <div className="reservationItemHeader">
                <h3>View Reservations</h3>
            </div>
            <div className="reservationItemWrapper">
                <div className="reservationItemActionBox">
                    <h1 className="reservationItemTitle">Reservation Info</h1>
                    <div className="reservationItemActionBoxItemWrapper">
                        <div className="reservationItemActionBoxItem">
                            <label>Status</label>
                            <div className="statusWrapper">
                            <span
                                className={
                                reservation.reservationStatus === reservationStatus.APPROVED
                                    ? "reservationItemActionBoxItemStatus green"
                                    : reservation.reservationStatus === reservationStatus.REJECTED ||
                                    reservation.reservationStatus === reservationStatus.CANCELLED
                                    ? "reservationItemActionBoxItemStatus red"
                                    : "reservationItemActionBoxItemStatus"
                                }
                            >
                                {reservation.reservationStatus}
                            </span>
                            <FontAwesomeIcon
                                icon={
                                reservation.reservationStatus === reservationStatus.APPROVED
                                    ? faCircleCheck
                                    : reservation.reservationStatus === reservationStatus.REJECTED ||
                                    reservation.reservationStatus === reservationStatus.CANCELLED
                                    ? faCircleXmark
                                    : faPaperPlane
                                }
                                className={
                                reservation.reservationStatus === reservationStatus.APPROVED
                                    ? "statusWrapper green"
                                    : reservation.reservationStatus === reservationStatus.REJECTED ||
                                    reservation.reservationStatus === reservationStatus.CANCELLED
                                    ? "statusWrapper red"
                                    : "statusWrapper"
                                }
                            />
                            </div>
                        </div>
                        {(reservation.reservationStatus === reservationStatus.CANCELLED ||
                            reservation.reservationStatus === reservationStatus.REJECTED) && (
                            <>
                            <div className="reservationItemActionBoxItem">
                                <label>Remarks</label>
                                <span className="reservationRemarks">
                                {reservation.actionTaken.remarks}
                                </span>
                            </div>
                            </>
                        )}
                    </div>
                    {user?.permissions.isAdmin ? (
                        reservation.reservationStatus === reservationStatus.SUBMITTED ? (
                        <>
                            <button
                            name="approve"
                            className="reservationItemApproveBtn"
                            onClick={handleActionModal}
                            >
                            Approve
                            </button>
                            <button
                            name="reject"
                            className="reservationItemRejectBtn"
                            onClick={handleActionModal}
                            >
                            Reject
                            </button>
                        </>
                        ) : reservation.reservationStatus === reservationStatus.APPROVED ? (
                        <>
                            <button
                            name="cancel"
                            className="reservationItemRejectBtn"
                            onClick={handleActionModal}
                            >
                            Cancel
                            </button>
                        </>
                        ) : (
                        <></>
                        )
                    ) : (

                        reservation.reservationStatus === reservationStatus.SUBMITTED ? (
                        <button
                            name="cancel"
                            className="reservationItemDefaultBtn"
                            onClick={handleActionModal}
                        >
                            Cancel Reservation
                        </button>
                        )
                        :
                        (
                        <button
                            name="check in"
                            className="reservationItemDefaultBtn"
                            onClick={handleActionModal}
                        >
                            Check In
                        </button>
                        )
                    )}

                    <button className="reservationItemDefaultBtn" onClick={handleGoBack}>
                        Back
                    </button>
                </div>
                <div className="reservationItemRightPanel">
                    <div className="reservationItemPanelContainer">
                        <div className="reservationItemItemsWrapper">
                            <div className="reservationItemItemsColumn">
                                <ReservationRoomInfo reservationInfo={reservation} />
                            </div>
                            <div className="reservationItemItemsColumn">
                                <div className="reservationItemItem">
                                    <label>Date of request</label>
                                    <span>{`${format(start, "MMM dd yyyy")}`}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Start Time</label>
                                    <span>{`${format(start, "p")}`}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>End Time</label>
                                    <span>{`${format(end, "p")}`}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Duration</label>
                                    <span>{reservation.duration} hr/s</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Pax</label>
                                    <span>{reservation.pax}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Purpose</label>
                                    <span>{reservation.purpose}</span>
                                </div>
                            </div>
                            <div className="reservationItemItemsColumn">
                                <div className="reservationItemItem">
                                    <label>Requestor</label>
                                    <span>{reservation.requestor}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Position</label>
                                    <span>Engineer Sr</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Shift Schedule</label>
                                    <span>{reservation.shiftSchedule}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Tower/LOB</label>
                                    <span>{reservation.lineOfBusinessOrTower}</span>
                                </div>
                                <div className="reservationItemItem">
                                    <label>Occupants</label>
                                    <span>{reservation.occupants}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openActionModal && (
                <ActionModal
                    action={action}
                    openActionModal={setOpenActionModal}
                    handleActionReservation={handleActionReservation}
                    error={error}
                    passRemarks={(i) => handlePassRemarks(i)}
                />
            )}
        </div>
    )
}

export default ReservationItem
