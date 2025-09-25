import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Prism from './Jj'
const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()   // ✅ gives current path
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) return
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })
      dispatch(addUser(res.data))
    } catch (err) {
      navigate("/login")
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <NavBar />
      <div className="w-full">
        {location.pathname === "/" ? (
        <div>
         
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Prism
    animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0.5}
    glow={1}
  />
</div>
        </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Body
