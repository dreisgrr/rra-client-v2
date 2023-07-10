import './spaces.css'
import { useState } from 'react'
import FilterBarSpaces from '../../../components/filterBarSpaces/FilterBarSpaces'
import SpacesResult from '../spacesResult/SpacesResult'
import AutoLogout from '../../../components/autoLogout/AutoLogout'

const Spaces = () => {
    const [searchQuery, setSearchQuery] = useState({})
    const [urlCall, setUrlCall] = useState('/rooms')

    const handlePassFilter = (filter) => {
        setSearchQuery(filter)
        setUrlCall(`rooms?siteId=${filter?.state?.filterSite}&facilityType=${filter?.state?.filterType}`)
    }
    return (
        <AutoLogout>
            <div className='roomsContainer'>
                <div className="roomsHeader">
                    <h3>Space Management</h3>
                </div>
                <div className="roomsContent">
                    <div className="roomListFilterBarWrapper">
                        <FilterBarSpaces passFilter={(filter)=> handlePassFilter(filter)}/>
                    </div>
                    <div className="roomListResultWrapper">
                        <SpacesResult urlCall={urlCall}/>
                    </div>
                </div>
            </div>
        </AutoLogout>
    )
}

export default Spaces
