import './sites.css'
import { useState } from 'react'

import { DEFAULT_NAMES, ERROR_MESSAGE } from '../../../utils/definitions.js'
import useFetch from '../../../hooks/useFetch'
import SitesCard from '../sitesCard/SitesCard'
import ModalUpdateSite from '../../../components/modalUpdateSite/ModalUpdateSite'

const Sites = () => {
    const [openSiteUpdateModal, setOpenSiteUpdateModal] = useState(false)
    const [selectedSiteToUpdate, setSelectedSiteToUpdate] = useState({});
    const handleUpdate = (item) => {
        setOpenSiteUpdateModal(true)
        setSelectedSiteToUpdate(item);
    }

    const { data, loading, error } = useFetch(`/sites`)
    return (
        <div className='sitesContainer'>
            <div className="sitesHeader">
                <h3>Sites Management</h3>
            </div>
            <div className="sitesWrapper">
                <div className="sitesList">
                    {
                        loading ? 
                            <span>{ DEFAULT_NAMES.LOADING_MESSAGE }</span> :
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>{ERROR_MESSAGE.CONTACT}</span>
                                    </> :
                                        (Object.keys(data).length === 0) ?
                                            DEFAULT_NAMES.NO_SITES :
                                                <>
                                                    {data.map( (item) => (
                                                        <SitesCard key={item._id} item={item} handleUpdate={handleUpdate}/>
                                                    ))}
                                                </> 
                    }
                </div>
            </div>
            { openSiteUpdateModal && 
                <ModalUpdateSite selectedSite={selectedSiteToUpdate} openSiteUpdateModal={setOpenSiteUpdateModal}/>
            }
        </div>
    )
}

export default Sites
