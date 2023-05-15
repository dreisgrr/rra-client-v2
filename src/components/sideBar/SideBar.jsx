import './sideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFileSignature, faMagnifyingGlass, faPenToSquare, faBuilding, faPersonChalkboard, faFileLines } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

const SideBar = ({isSideBarOpen, toggleSideBar}) => {
    const { user } = useContext(AuthContext)
    return (
        <div className={`sideBar ${isSideBarOpen == true ? 'active' : ''}`} >
            <div className='sideBarContainer'>
                <div className='sideBarTopSection'>
                    <div className="sideBarTitle">
                        <h3>Menu</h3>
                    </div>
                    <div className='sideBarClose' onClick={toggleSideBar}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="sideBarContents">
                    <Link className="sideBarLink" to='/reservations' onClick={toggleSideBar}>
                        <div className="sideBarItem">
                            <div className='sideBarItemIcon'>
                                <FontAwesomeIcon icon={faFileSignature} />
                            </div>
                            <label>View Reservations</label>
                        </div>
                    </Link>
                    
                    <Link className="sideBarLink" to='/search' onClick={toggleSideBar}>
                        <div className="sideBarItem">
                            <div className='sideBarItemIcon'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <label>Search Spaces</label>
                        </div>
                    </Link>
                    {
                        user?.permissions?.isAdmin ? 
                            <Link className="sideBarLink" to='/sites' onClick={toggleSideBar}>
                                <div className="sideBarItem">
                                    <div className='sideBarItemIcon'>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                    <label>Manage Sites</label>
                                </div>
                            </Link>
                        :
                        ''
                    }
                    {
                        user?.permissions?.isAdmin ? 
                            <Link className="sideBarLink" to='/spaces' onClick={toggleSideBar}>
                                <div className="sideBarItem">
                                    <div className='sideBarItemIcon'>
                                        <FontAwesomeIcon icon={faPersonChalkboard} />
                                    </div>
                                    <label>Manage Spaces</label>
                                </div>
                            </Link>
                        :
                        ''
                    }
                    {
                        user?.permissions?.isAdmin ? 
                            <Link className="sideBarLink" to='/reports' onClick={toggleSideBar}>
                                <div className="sideBarItem">
                                    <div className='sideBarItemIcon'>
                                        <FontAwesomeIcon icon={faFileLines} />
                                        </div>
                                    <label>Generate Reports</label>
                                </div>
                            </Link>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar
