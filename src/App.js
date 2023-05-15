import { useState, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"
import { AuthContext } from "./context/AuthContext";

import Login from './pages/login/Login'
import AssocHome from './pages/associate/home/Home'
import AdminHome from './pages/admin/home/Home'
import TopBar from "./components/topBar/TopBar";
import SideBar from "./components/sideBar/SideBar";
import UserOptions from "./components/userOptions/UserOptions";
import Reservations from "./pages/reservations/Reservations";
import Search from "./pages/search/Search";
import Sites from "./pages/admin/sites/Sites";
import Reports from "./pages/admin/reports/Reports";
import SearchResult from "./pages/searchResult/SearchResult";
import ReservationItem from "./pages/reservationItem/ReservationItem";
import Spaces from "./pages/admin/spaces/Spaces";

function App() {
  const { user } = useContext(AuthContext)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const toggleSideBar = () => {
        console.log('toggleSideBar')
        isSideBarOpen === true ? setIsSideBarOpen(false) : setIsSideBarOpen(true)
    }
    const [isUserOptionsOpen, setUserOptionsOpen] = useState(false)
    const toggleUserOptions = () => {
        isUserOptionsOpen == true ? setUserOptionsOpen(false) : setUserOptionsOpen(true)
    }
  return (
    <>
      {
        user ? 
        <>
          <TopBar toggleSideBar={toggleSideBar} toggleUserOptions={toggleUserOptions}/>
          <SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
          <UserOptions isUserOptionsOpen={isUserOptionsOpen} toggleUserOptions={toggleUserOptions} />
        </>
        : 
        ''
      }
      
      {
        user?.permissions?.isAdmin ? 
        <>
          <Routes>
            <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
            <Route path="/spaces" element={user ? <Spaces /> : <Navigate to="/login" />} />
            <Route path="/sites" element={user ? <Sites /> : <Navigate to="/login" />} />
            <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
            <Route path="/searchResult" element={user ? <SearchResult /> : <Navigate to="/login" />} />
            <Route path="/reservations" element={user ? <Reservations /> : <Navigate to="/login" />} />
            <Route path="/reservations/:id" element={user ? <ReservationItem /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
            <Route path="/" element={user ? <AdminHome /> : <Navigate to="/login" /> } />
          </Routes>
        </>
        :
        <>
          <Routes>
            <Route path="/search" element={user ? <Search /> :  <Navigate to="/" />} />
            <Route path="/searchResult" element={user ? <SearchResult /> : <Navigate to="/login" />} />
            <Route path="/reservations" element={user ? <Reservations /> : <Navigate to="/login" />} />
            <Route path="/reservations/:id" element={user ? <ReservationItem /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login /> } />
            <Route path="/" element={user ? <AssocHome /> : <Navigate to="/login"/>} />
          </Routes>
        </>
      }
    </>
  );
}

export default App;
