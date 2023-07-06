import './filterBarReportSummary.css'
import { useState } from 'react'

import React from 'react'

const FilterBarReportSummary = ({passFilter}) => {
    const [filterSite, setFilterSite] = useState('63b56fea41184440f9f90696')
    const handleFilter = () => {
        passFilter({state: {filterSite}})
    }
    return (
        <div className="filterBarReportSummaryContainer">
            <div className="filterBarReportSummaryWrapper">
                <div className="filterBarReportSummaryItem">
                    <label>Site</label>
                    <select className="filterBarReportSummaryItemSelect" id="filterSite" onChange={(e) => setFilterSite(e.target.value) }>
                        <option defaultValue="true" className="filterBarReportSummaryItemOptions" value="63b56fea41184440f9f90696">AGT</option>
                        <option className="filterBarReportSummaryItemOptions" value="63b56f2241184440f9f90694">GLAS</option>
                        <option className="filterBarReportSummaryItemOptions" value="63b570b7b9b00d78455bf72d">OFT</option>
                        <option className="filterBarReportSummaryItemOptions" value="63b570f8b9b00d78455bf72f">SMS</option>
                    </select>
                </div>
                
                <div className="filterBarReportSummaryItem">
                    <button className="filterBarReportSummaryItemBtn" onClick={handleFilter}>Generate</button>
                </div>
            </div>
        </div>
    )
}

export default FilterBarReportSummary
