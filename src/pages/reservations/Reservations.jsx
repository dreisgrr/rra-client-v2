import './reservations.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch.js'
import ReservationsCard from '../reservationsCard/ReservationsCard'
import AutoLogout from '../../components/autoLogout/AutoLogout'

const Requests = () => {
    const { user } = useContext(AuthContext)
    const nonAdminFetchQuery = `/reservations?domainId=${user.domainId}&id=${user._id}`
    const adminFetchQuery = `/reservations?isAdmin=true&reservationStatus=ALL`
    const { data, loading, error } = useFetch(user?.permissions?.isAdmin ? adminFetchQuery : nonAdminFetchQuery)
    return (
        <AutoLogout>    
            <div className='reservationsContainer'>
                <div className="reservationsHeader">
                    <h3>View Reservations</h3>
                </div>
                <div className="reservationsContent">
                    <div className="reservationsContentWrapper">
                        <div className="reservationsContentList">
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
                                    (Object.keys(data).length === 0) ?
                                    "No Reservations"
                                    :
                                    <>
                                                {data.map( (item) => (
                                                    <ReservationsCard key={item._id} reservationInfo={item}/>
                                                    ))}
                                            </> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AutoLogout>
    )
}

export default Requests
