 import React, { useState } from 'react'
 import axios from "axios"
 import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'

 const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[firstName,setFirstName]=useState("")
  const[lastName,setLastName]=useState("")
  const[emailId,setEmailId]=useState("dharam@gmail.com")
  const[password,setPassword]=useState("Poone@123")
const[isLogin,setisLogin]=useState(true)
  const[err,setErr]=useState("")
  const handleLogin=async()=>{

  try {
    const res = await axios.post(
      "http://localhost:3000/login",
      { emailId, password },
      { withCredentials: true }
    );
    console.log(res);
    dispatch(addUser(res.data));
    navigate("/");
  } catch (err) {
    setErr(err?.response?.data || "Something1 went wrong");
  }
};
const handleSignup=async()=>{

  try {
    const res = await axios.post(
      "http://localhost:3000/signup",
      {firstName,lastName, emailId, password },
      { withCredentials: true }
    );
    // console.log(res);
    dispatch(addUser(res.data.data));
    navigate("/profile");
  } catch (err) {
    setErr(err?.response?.data || "Something1 went wrong");
  }
};

   return (
     <div className='flex justify-center my-10 '>
      <div className="card bg-base-300 w-96 shadow-sm ">
  <div className="card-body">
    <h2 className="card-title justify-center">{ isLogin ?"Login":"SignUp"}</h2>
    <div className=''>
       { !isLogin && <div>
        <fieldset className="fieldset my-4">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" className="input" onChange={(e)=>setFirstName(e.target.value)}  value={firstName}/>
  
</fieldset>
<fieldset className="fieldset my-4">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" className="input"  onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
  
</fieldset>
       </div>}
             <fieldset className="fieldset my-4">
  <legend className="fieldset-legend">Email Id</legend>
  <input type="text" className="input" onChange={(e)=>setEmailId(e.target.value)}  value={emailId}/>
  
</fieldset>
<fieldset className="fieldset my-4">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" className="input"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
  
</fieldset>
    </div>
    <p className='text-rose-500'>{err}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLogin?handleLogin:handleSignup}>{ isLogin ?"Login":"SignUp"}</button>
    </div>
   <p 
  onClick={() => setisLogin((set) => !set)} 
  className=" text-center text-rose-500 cursor-pointer"
>
  { isLogin ? "New User ? SignUp here" : "Existing User Login here" }
</p>
 </div>
</div>
     </div>
   )
 }
 
 export default Login