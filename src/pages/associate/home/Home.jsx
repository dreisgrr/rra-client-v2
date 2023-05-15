import './home.css'
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { format } from "date-fns";
import TitleImage from '../../../components/titleImage/TitleImage.jsx'

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
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
                        <h3>Awaiting Action</h3>
                        <div>Show List</div>
                    </div>
                    <div className="assocTiles tasks">
                        <h3>Quick Tasks</h3>
                        <button>Reports</button>
                        <button>Reserve</button>
                    </div>
                    <div className="assocTiles upcoming">
                        <h3>Upcoming Booking</h3>
                        <div>No upcoming booking.</div>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Home
