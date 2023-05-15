import './userOptions.css'
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { ROLES } from "../../utils/definitions"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const UserOptions = ({isUserOptionsOpen, toggleUserOptions}) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log(user)
    const handleAction = (action) => {
        if (action === 'logout') {
            window.localStorage.clear();
        }
        navigate('/')
        window.location.reload();
    }

    return (
        <div className={`userOptionsContainer ${isUserOptionsOpen == true ? 'active' : ''}`}>
            <div className="userInfo">
                <div className='userOptionsClose' onClick={toggleUserOptions}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className="userInfoIcon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <span>{ user ? user.domainId : ''}</span>
                <span>{ user ? user.email : ''}</span>
                <span>{ user ? user.permissions.isAdmin ? ROLES.ADMIN : user.permissions.isFacility ? ROLES.FACILITY : user.permissions.isWorkforce ? ROLES.WORKFORCE : user.permissions.isManager ? ROLES.MANAGER : ROLES.ASSOC : '' }</span>
                </div>
            <div className="options">
            </div>
            <div className="logout">
                <button className="logoutBtn" onClick={() => handleAction('logout')}>Log Out</button>
            </div>
        </div>
    )
}

export default UserOptions
