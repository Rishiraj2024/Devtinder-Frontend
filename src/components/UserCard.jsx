import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSLilce';

const UserCard = ({ user }) => {
  if (!user) return null;
 
  const dispatch=useDispatch()
const { firstName, lastName, photoUrl, about, _id } = user;
const toUserId=_id
  const handleSandRequest=async(status,toUserId)=>{
try{
 const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+toUserId,{},{withCredentials:true})
 dispatch(removeUserFeed(toUserId))
}
catch(err){
  console.log(err.response)
}
  }
  
  return (
    <div className='flex flex-wrap overflow-x-hidden '>
      <div className="w-64 bg-base-200 border rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center ">
      {/* Profile Image */}
      <img
        className="w-20 h-20 rounded-full object-cover border mb-3"
        src={photoUrl || "/default.png"}
        alt={`${firstName} ${lastName}`}
      />

      {/* Name */}
      <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
      
      {/* About */}
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{about}</p>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button onClick={()=>handleSandRequest("ignored",toUserId)} className="px-3 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
          Ignore
        </button>
        <button onClick={()=>handleSandRequest("interested",toUserId)}  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
          Interested
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserCard;
