
import React from 'react'
import star from '../../assets/images/Star.png'
import DoctorAbout from 'Pages/Doctor/DoctorAbout'

const Overview = ({user2}) => {
  
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid gap-12 justify-between">
          <div className="">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px] overflow-hidden">
                <img src={user2?.photo} alt="" className="w-full object-cover" />
              </figure>
              <div>
              <span className="bg-[#CCF0F3] text-irisBlueColor py-1 lg:py-2 px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                {user2?.specialization}
              </span>
              <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                {user2?.name}
              </h3>
              <div className="flex items-center gap-2">
                <img src={star} alt="" className="w-6 h-6" />
                <span className="font-semibold">{(user2?.averageRating)} ({user2?.totalRating})</span>                
              </div>
              <p className="mt-3 text-para text-[14px] md:text-15 leading-6 lg:max-w-[390px]">{user2?.bio} </p>
            </div>
            </div>

   
            <div className="mt-12">              
              <DoctorAbout user2={user2}/>                                        
            </div>          
          </div>
          <div>          
          </div>
        </div>
      </div>
  )
}

export default Overview