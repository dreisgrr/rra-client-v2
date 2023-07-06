import './modalMessage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ModalMessage = ({title, message, openModalMessage}) => {
    return (
        <div className="modalMessage">
            <div className="modalMessageContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="actionCloseModal"
                    onClick={ ()=> openModalMessage(false)}
                />
                <div className="modalMessageTitle">
                    <h3>{title}</h3>
                </div>
                <div className="modalMessageForm">
                    <div className="modalMessageFormItem">
                        <span>{message}</span>
                    </div>
                    <div className="actionModalFormItem">
                        <button className="modalMessageBtn" onClick={ ()=> openModalMessage(false)}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalMessage
