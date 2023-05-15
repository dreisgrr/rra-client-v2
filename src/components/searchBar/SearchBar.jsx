import './searchBar.css'
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faCalendarDays, faClock, faHourglassHalf, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { Calendar } from "react-date-range"
import { format } from "date-fns"

import {SITE_DEFAULT_ID, DURATION_VALUES, SPACE_TYPES} from "../../utils/definitions.js"
import { SitesContext } from '../../context/SitesContext'
import { useNavigate } from 'react-router-dom';

const SearchBar = ({activeIndex, setSearchQuery}) => {
    const navigate = useNavigate();
    const sitesCtx = useContext(SitesContext)
    const sitesMatch = sitesCtx?.find( (item)=> item._id===SITE_DEFAULT_ID)
    const defaultSelectedSite = sitesMatch?._id
    const [site, setSite] = useState(SITE_DEFAULT_ID);
    const [time, setTime] = useState('');
    const [hours, setHours] = useState([]);
    const generateHours = () => {
        let hoursDef = [];
        let tempHours = '';
        for (let ctrHour = 0; ctrHour < 24; ctrHour++) {
            today.setMinutes("00")
            if (ctrHour < 13) {
                today.setHours(ctrHour)
                tempHours = (ctrHour < 10 ? '0' : '') + ctrHour;
                if (tempHours === "00") tempHours = '12'; 
                tempHours = ctrHour === 12 ? `${tempHours}:00 PM` : `${tempHours}:00 AM`
            }
            else {
                today.setHours(ctrHour-12)
                let pmHour = ctrHour-12;
                tempHours = (pmHour < 10 ? '0' : '') + pmHour;
                tempHours = `${tempHours}:00 PM`
            }
            hoursDef.push(`${tempHours}`)
        }
        setHours(hoursDef);
    }
    useEffect( () => {
        const onPageLoad = () => {
            generateHours();
        };
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, [])
    useEffect( () => {
        setTime(today.getHours() + 1)
    }, [hours])
    const [duration, setDuration] = useState(1);
    const today = new Date()
    const [date, setDate] = useState(
        {
            date: new Date(),
            key: 'selection'
        }
    );
    const [toggleDatePicker, setToggleDatePicker] = useState(false)
    const handleDatePicker = (name, value) => {
        setDate( prev => {
            return { ...prev,[name]: value}
        })
        setToggleDatePicker(!toggleDatePicker)
    }
    const [toggleOptions, setToggleOptions] = useState(false)
    const [options, setOptions] = useState({
        pax: 1
    });
    const handleOption = (name, operation) => {
        setOptions( prev => {
            return { ...prev, [name]: operation === "+" ? options[name] +1 : options[name] -1}
        })
    }
    useEffect( () => {
        if(activeIndex === 0 || activeIndex === 1) {
            setToggleOptions(false)
            setOptions( prev => {
                return { ...prev, pax: 1}
            })
        }
    }, [activeIndex])

    const handleSearch = () => {
        console.log("Searching...")
        let search = ''
        switch (activeIndex) {
            case 0: search = SPACE_TYPES.GYM 
                break;
            case 1: search = SPACE_TYPES.SLEEPING_QUARTERS
                break;
            case 2: search = SPACE_TYPES.TRAINING
                break;
            case 3: search = SPACE_TYPES.CONFERENCE
                break;
            case 4: search = SPACE_TYPES.SEAT
                break;
        
            default: search = SPACE_TYPES.CONFERENCE 
                break;
        }
        let requestStartTime = new Date(date.date);
        let requestEndTime = new Date(date.date);
        let endTime = Number(time) + Number(duration);
        let computedStartTime = Number(time) === 24 ? 0 : time

        requestStartTime.setMinutes(0);
        requestStartTime.setSeconds(0);
        requestStartTime.setHours(time);
        requestEndTime.setMinutes(0);
        requestEndTime.setSeconds(0);
        requestEndTime.setHours(endTime);

        requestStartTime = requestStartTime.getTime();
        requestEndTime = requestEndTime.getTime()

        setSearchQuery({state:{ site, date, computedStartTime, requestStartTime, requestEndTime, options, duration, search}})
        navigate("/searchResult", {state:{ site, date, computedStartTime, requestStartTime, requestEndTime, options, duration, search}})
    }
    return (
        <>
            <div className="searchBarParams">
                <div className="searchBarItem">
                    <FontAwesomeIcon icon={ faLocationDot } className="searchBarIcon" />
                    <div className="searchBarItemWrapper">
                        <label>Site</label>
                        <select className="searchBarSelect" id="selectSite" onChange={(e) => setSite(e.target.value) }>
                            {
                                sitesCtx && sitesCtx.map( (item) => 
                                    (
                                        <option key={item._id} className="searchBarOptions" value={item._id} selected={defaultSelectedSite === item._id ? true : false}>{item.title}</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>
                <div className="searchBarItem">
                    <FontAwesomeIcon icon={ faCalendarDays } className="searchBarIcon" />
                    <div className="searchBarItemWrapper">
                        <label>Date</label>
                        <span className="searchBarText" onClick={()=> setToggleDatePicker(!toggleDatePicker)} >{`${format(date.date, "dd MMM yyyy")}`}</span>    
                    </div>          
                </div>
                { toggleDatePicker && 
                    <Calendar 
                        date={date.date}
                        minDate={new Date()}
                        onChange={(e) => handleDatePicker("date", e )}
                        editableDateInputs={true}
                        className="searchBarDateRange"
                    />
                }
                <div className="searchBarItem">
                    <FontAwesomeIcon icon={ faClock } className="searchBarIcon" />
                    <div className="searchBarItemWrapper">
                        <label>Start Time</label>
                        <select 
                            className="searchBarSelect" 
                            id="selectFromTime" 
                            onLoadedData={(e) => setTime(e.target.value)} 
                            onChange={(e) => setTime(e.target.value) }
                        >
                            {
                                hours ? 
                                    hours.map((item, i) => (
                                        <option className="searchBarOptions" key={i} value={i} selected={ (today.getHours() + 1) === i} >{item}</option>
                                    ))
                                : 
                                ''
                            }
                        </select>
                    </div>
                </div>
                {
                    (activeIndex === 0 || activeIndex === 1)  ? 
                    ''
                    :
                    <>
                        <div className="searchBarItem">
                            <FontAwesomeIcon icon={ faHourglassHalf } className="searchBarIcon" />
                            <div className="searchBarItemWrapper">
                                <label>Duration</label>
                                <select className="searchBarSelect" id="selectDuration" onChange={(e) => setDuration(e.target.value)}> 
                                    {
                                        DURATION_VALUES.map( (item, i) => (
                                            <option className="searchBarOptions" value={item} key={i}>{item} {Number(item) > 1 ? 'hours' : 'hour'}</option>
                                        )) 
                                    }
                                </select>
                            </div>
                        </div>
                    </>
                }
                {
                    (activeIndex === 0 || activeIndex === 1 || activeIndex === 4) ?
                    ''
                    :
                    <>
                        <div className="searchBarItem">
                            <FontAwesomeIcon icon={ faUserGroup } className="searchBarIcon" />
                            <div className="searchBarItemWrapper">
                                <label>Pax</label>
                                <span onClick={ ()=> setToggleOptions(!toggleOptions)} className="searchBarText pax">{`${options.pax}`}</span>
                                { toggleOptions && 
                                    <div style={ activeIndex === 0 || activeIndex === 1  ? {display: 'none'} : {display: 'flex'}}  className="options"onBlur={()=> setToggleOptions(!toggleOptions)}>
                                        <div className="optionItem">
                                            <div className="optionCounter">
                                                <button disabled={options.pax <= 1} className="optionCounterButton" onClick={ ()=> handleOption("pax", "-")}>-</button>
                                                {/* <span className="optionCounterNumber">{options.pax}</span> */}
                                                <button disabled={options.pax >= 35}className="optionCounterButton" onClick={ ()=> handleOption("pax", "+")}>+</button>
                                            </div>
                                        </div>
                                    </div> 
                                }
                            </div>
                        </div>
                    </>
                }
                        
                
            </div>
            <div className="searchBarButton">
                <button className="searchBtn" onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}

export default SearchBar
