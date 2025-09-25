import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import UserCardProfile from './UserCardProfile'
const EditProfile = ({ user }) => {

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [age, setAgeName] = useState(user.age)
  const [about, setAboutName] = useState(user.about)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [password, setPassword] = useState("Poone@123")
  const [showToast, setshowToast] = useState(false)
  const [err, setErr] = useState("")
  const dispatch = useDispatch()
  const saveProfilr = async () => {
    setErr("")
    try {
      const res = await axios.post(BASE_URL + "/profile/edit", { firstName, lastName, photoUrl, age, about }, { withCredentials: true })
      dispatch(addUser(res?.data?.data))
      setshowToast(true)
      const i = setTimeout(() => {
        setshowToast(false)
      }, 5000);
    } catch (err) {
      console.log(err.response.message)
    }
  }
  return (
    <div>
      <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10 '>
          <div className="card bg-base-300 w-96 shadow-sm ">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className=''>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">FirstName</legend>
                  <input type="text" className="input" onChange={(e) => setFirstName(e.target.value)} value={firstName} />

                </fieldset>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">LastName</legend>
                  <input type="text" className="input" onChange={(e) => setLastName(e.target.value)} value={lastName} />

                </fieldset>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">Age</legend>
                  <input type="text" className="input" onChange={(e) => setAgeName(e.target.value)} value={age} />

                </fieldset>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">About</legend>
                  <input type="text" className="input" onChange={(e) => setAboutName(e.target.value)} value={about} />

                </fieldset>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">PhotoUrl</legend>
                  <input type="text" className="input" onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl} />

                </fieldset>
              </div>
              <p className='text-rose-500'>{err}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfilr}>Save Profile</button>
              </div>
            </div>
          </div>
        </div>
        <UserCardProfile user={{ firstName, lastName, photoUrl, age, about }} />
      </div>
      {showToast && (<div className="toast toast-top toast-start">

        <div className="alert alert-success">
          <span>Profile saved sussefuly successfully.</span>
        </div>
      </div>)}
    </div>
  )
}

export default EditProfile