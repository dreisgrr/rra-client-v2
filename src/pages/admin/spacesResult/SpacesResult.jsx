import './spacesResult.css'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'

import { DEFAULT_NAMES, ERROR_MESSAGE } from '../../../utils/definitions'
import SpacesCard from '../spacesCard/SpacesCard'
import ModalUpdateSpace from '../../../components/modalUpdateSpace/ModalUpdateSpace'
import ModalSpaceUtilization from '../../../components/modalSpaceUtilization/ModalSpaceUtilization'


const SpacesResult = ({urlCall}) => {
    const { data, loading, error } = useFetch(urlCall);
    
    const [openSpaceUtilModal, setOpenSpaceUtilModal] = useState(false)
    const handleSpaceUtil = () => {
        setOpenSpaceUtilModal(true)
    }

    const [openSpaceUpdateModal, setOpenSpaceUpdateModal] = useState(false)
    const [selectedSpace, setSelectedSpace] = useState({});

    const handleUpdate = (item) => {
        setOpenSpaceUpdateModal(true)
        setSelectedSpace(item);
    }
    return (
        <div className="rlrContainer">
            <div className="rlrWrapper">
                <h1 className="listTitle">Spaces ({data.length})</h1>
                <div className="rlrList">
                    { 
                        loading ? 
                            <span>{DEFAULT_NAMES.LOADING_MESSAGE}</span> : 
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>{ERROR_MESSAGE.CONTACT}</span>
                                    </> :
                                        Object.keys(data).length === 0 ?
                                            "No matches found" :
                                                <> 
                                                    {data.map((item) => (
                                                        <SpacesCard 
                                                            key={item._id} 
                                                            item={item}
                                                            handleUpdate={handleUpdate}
                                                            handleSpaceUtil={handleSpaceUtil}
                                                        />
                                                    ))}
                                                </>
                    }
                </div>
            </div>
            {
                openSpaceUpdateModal && 
                <ModalUpdateSpace selectedSpace={selectedSpace} openSpaceUpdateModal={setOpenSpaceUpdateModal}/>
            }
            {
                openSpaceUtilModal && 
                <ModalSpaceUtilization openSpaceUtilModal={setOpenSpaceUtilModal}/>
            }
        </div>
    )
}

export default SpacesResult
