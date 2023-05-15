import './topbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import carelonLogoSvg from '../../resources/carelon/carelon-logo-colored.svg'
import { Link } from 'react-router-dom'

const TopBar = ({toggleSideBar, toggleUserOptions}) => {
    return (
        <div className="topBarContainer">
            <div className="topBarMenuToggle" onClick={toggleSideBar}>
                <FontAwesomeIcon icon={faBars} className="topBarMenuToggleIcon" onClick={toggleSideBar} />
                <span onClick={toggleSideBar}>MENU</span>    
            </div>
            <div className="topBarTopBarWrapper">
                <Link to='/' className='topBarLink'>
                    <div className="topBarCompanyLogo">
                        <img src={carelonLogoSvg} alt="" className="companyLogo"/>
                    </div>
                </Link>
                <div className="topBarOptions" onClick={toggleUserOptions} >
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </div>
    )
}

export default TopBar
