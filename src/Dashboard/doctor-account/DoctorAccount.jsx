import React, { useEffect, useState } from 'react'
import Overview from './Overview';
import DoctorAppointment from './DoctorAppointment';
import Profile from './Profile';
import { useGetDoctorProfileQuery } from 'features/doctor/doctorApiSlice';
import { useParams } from 'react-router-dom';
import Loader from 'component/Loader';


const DoctorAccount = () => {
  const [tab, setTab] =  useState("overview");
  const {id} = useParams()
  const {data, isError, isLoading} = useGetDoctorProfileQuery(id)  
  const [user, setUser] = useState(null)

  useEffect(()=>{
    if(data){
      setUser(data.data)      
    }
  },[data])
  
  return (
    <div className="container px-5 mx-auto flex-1 py-12">
      { isError || isLoading ? <>
        <p className="text-red-600">{isError.message}</p>
        : <Loader />
      </>:
      <div className="grid md:grid-cols-3 gap-10 items-start">
            
      <div className="p-3 bg-white rounded-md sticky top-0 shadow-xl w-1/2 md:w-full">      
        <div className="flex items-center justify-center">
          <figure className="w-36  rounded-full border-2 border-solid border-primaryColor">
            <img 
            src={user?.photo}
            alt=""
            srcset="" 
            className="w-full h-full rounded-md"
            />
          </figure>
        </div>
        
        <div className="text-center mt-4">
          <h3 className="text-lg leading-7 text-headingColor font-bold">
            {user?.name}
          </h3>
          <p className="text-textColor text-[16px] leading-6 font-medium mb-2">
            {user?.email}
          </p>        
          <hr className='w-full md:w-4/5 mx-auto' />
          </div>
      
        <button 
        onClick={()=>setTab("overview")}
        className={`${tab === "overview" ? "text-blue-500 bg-blue-200 font-semibold" :
         "text-[#121212] bg-white"} w-full  px-3 py-2`}>Overview</button>
        <button
        onClick={()=>setTab("appointment")}        
        className={`${tab === "appointment" ? "text-blue-500 bg-blue-200 font-semibold" :
        "text-[#121212] bg-white"} w-full px-3 py-2 `}>Appointment</button>
        <button
        onClick={()=>setTab("profile")}        
        className={`${tab === "profile" ? "text-blue-500 bg-blue-200 font-semibold" :
        "text-[#121212] bg-white"} w-full px-3 py-2 `}>Profile</button>
        </div>
        <div className="md:col-span-2" >
        {tab === "overview" && <Overview  user2={user}/>}
        {tab === "appointment" && <DoctorAppointment user={user} />}
        {tab === "profile" && <Profile setTab={setTab} user={user} />}
        </div>

      </div>}
    </div>
  )
}

export default DoctorAccount