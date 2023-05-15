import "./timeBlock.css";
import useFetch from "../../hooks/useFetch";
import { SPACE_TYPES } from '../../utils/definitions.js'

const TimeBlock = ({item, roomId, timeBlockStartTime, requestDetails, userId}) => {
    let dfStartTime = new Date(requestDetails.date.date)
    dfStartTime.setMinutes(1);
    dfStartTime.setSeconds(0);
    dfStartTime.setHours(timeBlockStartTime);
    let endTime = Number(timeBlockStartTime) + Number(1);
    let dfEndTime = new Date(requestDetails.date.date)
    dfEndTime.setMinutes(0);
    dfEndTime.setSeconds(0);
    dfEndTime.setHours(endTime);

    dfStartTime = dfStartTime.getTime();
    dfEndTime = dfEndTime.getTime()

    let query = (requestDetails.search === SPACE_TYPES.GYM) || (requestDetails.search === SPACE_TYPES.SLEEPING_QUARTERS) ? `/reservations/countBookedSlots?roomId=${roomId}&requestStart=${dfStartTime}&requestEnd=${dfEndTime}&id=${userId}`
     : `/reservations/isavailable?roomId=${roomId}&requestStart=${dfStartTime}&requestEnd=${dfEndTime}&id=${userId}`
    let { data, loading, error } = useFetch(query);
    
    console.log(requestDetails.search)
    console.log(query)
    //if (data.length === 0) data = 'Available'
  return (
    <div className="timeBlock">
      <div className="timeBlockHours">{item}</div>
      {
          (requestDetails.search === SPACE_TYPES.GYM) || (requestDetails.search ===  SPACE_TYPES.SLEEPING_QUARTERS) ?
            <div className="timeBlockDetails">{10 - data.count } slots available</div>
          :
            data?.isBooked ?
                <div className="timeBlockDetails">Booked</div>
            :
                <div className="timeBlockDetails">Available</div>
      }
      
    </div>
  );
};

export default TimeBlock;
