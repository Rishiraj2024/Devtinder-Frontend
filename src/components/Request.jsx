import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeREquest } from '../utils/requestSlice'

const Request = () => {
    const request=useSelector((store)=>store.request)
    const dispatch=useDispatch()
    const reviewRequest=async(status,requestId)=>{
        try{
             const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+requestId,{},{withCredentials:true})
             
             dispatch(removeREquest(requestId))
        }catch(err){

        }
    }
    const fetchRequest=async()=>{
        try{
 const res=await axios.get(BASE_URL+"/user/request/received",{withCredentials:true})
 console.log(res)
 dispatch(addRequest(res.data.data))
        }catch(err){
 console.log(err.response.data || "Something went wrong")
        }
    }
    useEffect(()=>{
fetchRequest()
    },[])
  if (!request) return null;
  if (request.length === 0) return <h1>No Request found</h1>;

  return (
   <div className="flex flex-col items-center my-10">
  <h1 className="font-bold text-2xl mb-6">Connections Request</h1>
  {request.map((c, index) => {
    const { firstName, lastName, photoUrl, about,_id } = c.fromUserId;

    return (
      <div
        key={index}
        className="flex flex-row items-center border rounded-lg border-gray-300 shadow-sm p-4 mb-4 w-96 hover:shadow-md transition-shadow"
      >
        {/* Image */}
        <img
          className="w-20 h-20 rounded-full object-cover mr-4"
          src={photoUrl || "/default.png"}
          alt={`${firstName} ${lastName}`}
        />

        {/* Text */}
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>
          <p className="text-gray-600 text-sm mt-1">{about}</p>
          
         <div className='flex gap-2 mt-2'>
          <button 
  className="btn btn-outline btn-primary" 
  onClick={() => reviewRequest("rejected", c._id)}
>
  Reject
</button>

<button 
  className="btn btn-outline btn-secondary" 
  onClick={() => reviewRequest("accepeted", c._id)}
>
  Accept
</button>
 </div>
        </div>
      </div>
    );
  })}
</div>

  );
};


export default Request