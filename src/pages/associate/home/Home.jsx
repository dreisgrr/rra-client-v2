import './home.css'
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { format } from "date-fns";
import TitleImage from '../../../components/titleImage/TitleImage.jsx'
import { Link } from 'react-router-dom'
import AutoLogout from '../../../components/autoLogout/AutoLogout';

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <AutoLogout>
            <div className="assocHomeContainer">
                <TitleImage />
                <div className="assocHomeBody">
                    <div className="assocHomeTopSection">
                        <div className="assocHomeGreetings">
                            Good day, { user ? user.domainId : ''}!
                        </div>
                        <div className="assocHomeTimeNow">
                            It's { format(new Date(), "MMMM dd, yyyy") }
                        </div>
                    </div>
                    <div className="assocHomeLowerSection">
                        <div className="assocTiles awaiting">
                            <h3>Upcoming Booking</h3>
                            <div>No upcoming booking.</div>
                        </div>
                        <div className="assocTiles tasks">
                            <h3>Quick Tasks</h3>
                            <Link to='/reservations'>
                                <button className="homeBtn">My Reservations</button>
                            </Link>
                            <Link to='/search'>
                                <button className="homeBtn">Search Spaces</button>
                            </Link>
                        </div>
                        {/* <div className="assocTiles upcoming">
                            <h3>Upcoming Booking</h3>
                            <div>No upcoming booking.</div>
                        </div> */}
                    </div>
                    
                    
                </div>
            </div>
        </AutoLogout>
    )
}

export default Home
