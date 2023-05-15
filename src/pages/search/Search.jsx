import './search.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 

import { useState} from "react";

import SearchTypes from '../../components/searchTypes/SearchTypes';
import SearchBar from '../../components/searchBar/SearchBar';
import SearchResult from '../searchResult/SearchResult';


const Search = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState({});
    return (
        <div className='searchContainer'>
            <div className="searchHeader">
                <h3>Search Spaces</h3>
            </div>
            <div className="searchContent">
                <div className="searchBarContainer">
                    <div className="searchTypeWrapper">
                        <SearchTypes activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    </div>
                    <div className="searchBarWrapper">
                        <SearchBar activeIndex={activeIndex} setSearchQuery={setSearchQuery}/>
                    </div>
                </div>
                {/* <div className="searchResultContainer">
                    <SearchResult searchQuery={searchQuery} />
                </div> */}
            </div>
        </div>
    )
}

export default Search
