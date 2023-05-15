import "./searchTypeItem.css"
import { SPACE_TYPES_NAMES } from "../../utils/definitions.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumbbell, faBed, faUsersBetweenLines, faPersonChalkboard, faComputer } from "@fortawesome/free-solid-svg-icons"

const SearchTypeItem = ({active, type, changeType}) => {
    return (
        <div className={active === true ? "searchTypeItem active" : "searchTypeItem" } 
            onClick={ changeType } >
            <FontAwesomeIcon icon={ type === SPACE_TYPES_NAMES.CONFERENCE ? faUsersBetweenLines : type === SPACE_TYPES_NAMES.TRAINING ? faPersonChalkboard : type === SPACE_TYPES_NAMES.GYM ? faDumbbell : type === SPACE_TYPES_NAMES.SLEEPING_QUARTER ? faBed : faComputer} />
            <span>{type}</span>
        </div>
    )
}

export default SearchTypeItem
