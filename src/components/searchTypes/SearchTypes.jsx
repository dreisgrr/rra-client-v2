import './searchTypes.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import SearchTypeItem from '../searchTypeItem/SearchTypeItem'
import { SPACE_TYPES_NAMES } from "../../utils/definitions.js"

const SearchTypes = ({activeIndex, setActiveIndex}) => {
    const { user } = useContext(AuthContext)
    const handleChangeType = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <SearchTypeItem active={activeIndex === 0} type={SPACE_TYPES_NAMES.GYM} changeType={ ()=> handleChangeType(0) }/>
            <SearchTypeItem active={activeIndex === 1} type={SPACE_TYPES_NAMES.SLEEPING_QUARTER} changeType={ ()=> handleChangeType(1) }/>
            {
                (user?.permissions?.isWorkforce || user?.permissions?.isFacility || user?.permissions?.isManager || user?.permissions?.isAdmin)  ?
                    <>
                        <SearchTypeItem active={activeIndex === 2} type={SPACE_TYPES_NAMES.TRAINING} changeType={ ()=> handleChangeType(2) }/>
                    </>
                :
                    ''
            }
            {
                (user?.permissions?.isManager || user?.permissions?.isAdmin) ?
                    <>
                        
                        <SearchTypeItem active={activeIndex === 3} type={SPACE_TYPES_NAMES.CONFERENCE} changeType={ ()=> handleChangeType(3) }/>
                        <SearchTypeItem active={activeIndex === 4} type={SPACE_TYPES_NAMES.SEAT} changeType={ ()=> handleChangeType(4) }/>
                    </>
                : 
                    ''
            }
        </>
    )
}

export default SearchTypes
