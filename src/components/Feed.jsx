import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { addUserFeed } from '../utils/feedSLilce'
import UserCard from './UserCard'

const Feed = () => {
    
const dispatch=useDispatch()
  const getFeed=async()=>{
    // if(feed || feed>0)return
try{
   const res=await axios.get("http://localhost:3000/userfeed",{withCredentials:true})
  //  console.log(res.data)
   dispatch(addUserFeed(res.data))
}catch(err){
  console.log(err.message)
}
  }
   useEffect(()=>{
 getFeed()
   },[])
   const feed=useSelector((store)=>store.feed1)
  
  return  (
  
 <div className='flex flex-wrap justify-center my-10'>
  {feed && feed.length > 0 ? (
    feed.map((k, index) => (
      <UserCard key={index} user={k} />
    ))
  ) : (
    <p>Loading feed...</p>
  )}
</div>

)

}

export default Feed