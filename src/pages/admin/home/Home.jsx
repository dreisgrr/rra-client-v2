import './home.css'
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { format } from "date-fns";
import TitleImage from '../../../components/titleImage/TitleImage.jsx'

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="adminHomeContainer">
            <TitleImage />
            <div className="adminHomeBody">
                <div className="homeTopSection">
                    <div className="homeGreetings">
                        Good day, { user ? user.domainId : ''}
                    </div>
                    <div className="homeTimeNow">
                        It's { format(new Date(), "MMMM dd, yyyy") }
                    </div>
                </div>
                <div className="homeLowerSection">
                    <div className="tiles awaiting">
                        <h3>Awaiting Action</h3>
                        <div>Show List</div>
                    </div>
                    <div className="tiles tasks">
                        <h3>Quick Tasks</h3>
                        <button>Reports</button>
                        <button>Reserve</button>
                    </div>
                    <div className="tiles upcoming">
                        <h3>Upcoming Booking</h3>
                        <div>No upcoming booking.</div>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Home
