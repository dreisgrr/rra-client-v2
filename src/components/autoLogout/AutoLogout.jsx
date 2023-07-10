import { useEffect } from 'react'
import { GLOBAL } from "../../utils/definitions.js"

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress"
]

const AutoLogout = ({children}) => {
    let timer

    const handleLogoutTimer = () => {
        timer = setTimeout( ()=> {
            // resetTimer()
            // Object.values(events).forEach((item) => {
            //     window.removeEventListener(item, resetTimer)
            // })
            logoutAction()

        }, GLOBAL.SESSION_DURATION)
    }

    const resetTimer = () => {
        if(timer) clearTimeout(timer)
    }

    const logoutAction = () => {
        localStorage.clear()
        window.location.pathname = '/login'
    }

    const checkCookie = () => {
        
    }

    useEffect( ()=> {
        Object.values(events).forEach((item) => {
            window.addEventListener(item, ()=> {
                resetTimer()
                handleLogoutTimer()
            })
        })
    }, [])

    return children
}

export default AutoLogout
