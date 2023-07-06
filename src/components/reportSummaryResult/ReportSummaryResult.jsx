import './reportSummaryResult.css'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'

import { DEFAULT_NAMES, ERROR_MESSAGE } from '../../utils/definitions'
import ReportSummarySpaceInfo from '../reportSummarySpaceInfo/ReportSummarySpaceInfo'
import { forwardRef } from 'react'
import { useContext } from 'react'
import { SitesContext } from '../../context/SitesContext'

const ReportSummaryResult = forwardRef( function ReportSummaryResult({selectedSite, urlCall}, ref) {
    const sitesCtx = useContext(SitesContext)
    const sitesMatch = sitesCtx?.find( (item)=> item._id===selectedSite)
    console.log(sitesMatch)
    const { data, loading, error } = useFetch(urlCall);
    const getPageMargins = () => {
        const marginTop = '50px';
        const marginBottom = '50px';
        const marginRight = '50px';
        const marginLeft = '50px';
        return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
    };
    const SITE_REPORT_VALUES = {
        "Alliance Global Tower": {
            utilization: 32,
            mostBookedTrainingRoom: 'Training Room 4',
            mostBookedConferenceRoom: 'F27-MTG-03',
        },
        "GLAS Tower": {
            utilization: 26,
            mostBookedTrainingRoom: 'Training Room 2',
            mostBookedConferenceRoom: '21F-MTGRM-8',
        },
        "One Fintech": {
            utilization: 23,
            mostBookedTrainingRoom: 'Mahamot',
            mostBookedConferenceRoom: 'Paminsar',
        },
        "SM Strata": {
            utilization: 19,
            mostBookedTrainingRoom: 'Bungyod',
            mostBookedConferenceRoom: 'Mapisan',
        },
    }
    console.log(SITE_REPORT_VALUES[sitesMatch?.name][`utilization`])
    return (
        <div className="rsrContainer" ref={ref}>
            <style>{getPageMargins()}</style>
            <div className="rsrWrapper">
                <h1 className="listTitle">Site Utilization Summary Report</h1>
                <h3>{sitesMatch.name}</h3>
                <div className="rsrSiteSection">
                    <div className="rsrSectionItem">
                        <label>Site Utilization: </label> <span>{SITE_REPORT_VALUES[sitesMatch?.name][`utilization`]}%</span>
                    </div>
                    <div className="rsrSectionItem">
                        <label>Most Booked Training Room: </label> <span>{SITE_REPORT_VALUES[sitesMatch?.name][`mostBookedTrainingRoom`]}</span>
                    </div>
                    <div className="rsrSectionItem">
                        <label>Most Booked Conference Room: </label> <span>{SITE_REPORT_VALUES[sitesMatch?.name][`mostBookedConferenceRoom`]}</span>
                    </div>
                </div>

                <div className="rsrList">
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
                                                        <ReportSummarySpaceInfo item={item} />                                                        
                                                    ))}
                                                </>
                    }
                </div>
            </div>
        </div>
    )
})

export default ReportSummaryResult
