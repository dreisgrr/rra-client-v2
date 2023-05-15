import { createContext, useReducer, useState, useEffect } from 'react'
import requestUrl from '../utils/requestMethods.js'

export const SitesContext = createContext();

export const SitesContextProvider = ({ children }) => {
    const [ sites, setSites ] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect( ()=> {
        console.log('sitesContext useEffect called')
        const fetchSites = async () => {
            console.log('sitesContext useEffect fetchSites')
            setLoading(true)
            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: 'same-origin'
                }
                const res = await requestUrl.get(`/sites`, config)
                console.log('sitesContext useEffect fetchSites response')
                setSites(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchSites()
    }, [])

    return (
        <SitesContext.Provider 
            value={
                sites
            }
        >
            {children}
        </SitesContext.Provider>
    )
}