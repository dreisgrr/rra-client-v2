import './modalUpdateSpace.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'

import { ReservationContext } from '../../context/ReservationContext';
import requestUrl from '../../utils/requestMethods.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ModalUpdateSpace = ({openSpaceUpdateModal, selectedSpace}) => {
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(ReservationContext);
    const [space, setSpace] = useState({
        name: selectedSpace.name,
        facilityType: selectedSpace.facilityType,
        description: selectedSpace.description,
        capacity: selectedSpace.capacity,
        floor: selectedSpace.floor,
        isRestricted: selectedSpace.isRestricted,
        features: {
            withCisco: selectedSpace.features.withCisco
        }
    })
    const [initSpace, setInitSpace] = useState({
        name: selectedSpace.name,
        facilityType: selectedSpace.facilityType,
        description: selectedSpace.description,
        capacity: selectedSpace.capacity,
        floor: selectedSpace.floor,
        isRestricted: selectedSpace.isRestricted,
        features: {
            withCisco: selectedSpace.features.withCisco
        }
    })
    const [isFormValidated, setIsFormValidated] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value)
        setSpace(prev => ({...prev, [e.target.id]: e.target.value }))
        validateForm();
    }
    const updateFeatures = (e) => {
        setSpace(prev => {
            const newSpace = {...prev}
            if(e.target.id === 'withCisco') {
                newSpace.features[e.target.id] = e.target.value
            }
            return newSpace
        })
        validateForm()
    }
    const validateForm = () => {
        if(space?.name?.trim() !== '' && 
        space?.description?.trim() !== '' && 
        space?.capacity !== '' && 
        space?.floor !== '' 
        && !_.isEqual(space, initSpace)
        
        ) setIsFormValidated(true)
        else setIsFormValidated(false) 
    }
    useEffect( ()=> {
        validateForm()
    },
    [space.facilityType, space.isRestricted, space.features.withCisco])
    const processUpdate = async e => {
        e.preventDefault();
        dispatch({type: 'SUBMIT_START'})
        try {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: 'same-origin'
            }
            const res = await requestUrl.put(`/rooms/${selectedSpace._id}`, space, config)
            console.log(res.data)
            dispatch({type:"SUBMIT_SUCCESS", payload: res.data})
            openSpaceUpdateModal(false)
            navigate('/spaces')
        } catch (error) {
            dispatch({type:"SUBMIT_FAILURE", payload: error.response.data})
        }
        window.location.reload()
    }
    return (
        <div className="updateRoomModal">
            <div className="updateRoomModalContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="closeModal"
                    onClick={ ()=> openSpaceUpdateModal(false)}
                />
                <div className="updateRoomModalTitle">
                    <h3>Update Space Details</h3>
                    { error && <span className="updateRoomError">{error.message}</span>}
                </div>
                <div className="updateRoomModalForm">
                    <div className="updateRoomModalFormColumn">
                        <div className="updateRoomModalFormItem">
                            <label>Name</label>
                            <input type="text" name="roomName" id="name" className="updateRoomInput" placeholder={selectedSpace.name} onKeyUp={handleChange} onChange={handleChange} value={space.name}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Facility Type</label>
                            <select className="updateRoomModalFormItemSelect" id="facilityType" onChange={handleChange}>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.facilityType === 'conference'} value="conference">Conference Room</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.facilityType === 'training'} value="training">Training Room</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.facilityType === 'gym'} value="gym">Gym</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.facilityType === 'sleeping'} value="sleeping">Sleeping Quarter</option>
                            </select>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Description</label>
                            <input type="text" name="roomDesc" id="description" className="updateRoomInput" placeholder={selectedSpace.description} onKeyUp={handleChange} onChange={handleChange} value={space.description}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Capacity</label>
                            <input type="number" min="1" max="35" name="roomCapacity" id="capacity" className="updateRoomInput" placeholder={selectedSpace.capacity} onKeyUp={handleChange} onChange={handleChange} value={space.capacity}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Floor</label>
                            <input type="number" min="1" max="50" name="roomFloor" id="floor" className="updateRoomInput" placeholder={selectedSpace.floor} onKeyUp={handleChange} onChange={handleChange} value={space.floor}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Restricted</label>
                            <select className="updateRoomModalFormItemSelect" id="isRestricted" onChange={handleChange }>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.isRestricted === false} value="false">No</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.isRestricted === true} value="true">Yes</option>
                            </select>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Cisco Equipped</label>
                            <select className="updateRoomModalFormItemSelect" id="withCisco" onChange={updateFeatures }>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.features.withCisco === false} value="false">No</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedSpace.features.withCisco === true} value="true">Yes</option>
                            </select>
                        </div>
                        <button disabled={!isFormValidated} className="updateRoomModalBtn" onClick={processUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUpdateSpace
