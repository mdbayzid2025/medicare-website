import React from 'react'
import star from '../../assets/images/Star.png'
import { BsArrowRight } from 'react-icons/bs'
import { Link, } from 'react-router-dom'
// import { useGetDoctorsQuery } from '../../state/api'
import Loader from 'component/Loader'
import { useGetDoctorsQuery } from 'features/doctor/doctorApiSlice'


const Doctors = () => {
  const {data, isError, isLoading} = useGetDoctorsQuery()

  try {   
  } catch (error) {
    console.log(error)
  }
  

  
  if(isError)console.log(isError)

  if(data){
    console.log("data doctor",data)
  }
  
  

  return (
    <div className="container">
       
       <div className="xl:w-[470px] mx-auto">
      <h2 className="heading text-center">Our Great Doctors</h2>
      <p className="text-para text-center">World class care for everyone  Our health System offers unmatched export health care</p>
      </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
         { isError || isLoading ? <>
          
            <p className="text-red-600">{isError.message}</p>
           : 
            <Loader />          
         </> :<>         
        {data && data.data.map((doctor, index)=>
          <div key={index} className="mx-auto w-full">
              <div className="w-full h-[286px]">
              <img src={doctor.photo} alt="" className="w-full h-full rounded-xl" />
              </div>
              <h3 className="text-2xl mt-5 mb-3 font-bold">{doctor.name}</h3>
              <div className="flex items-center justify-between ">
              <span className="px-2 text-md rounded-md py-2 text-iris text-[#01B5D8] bg-[#01B5D8]/20 font-bold">{doctor.specialization}</span>
                <div className="flex items-center gap-2">
                <img src={star} alt="" />
                <span className="font-bold">{doctor?.averageRating.toFixed(2)}</span>
                <span className="text-textColor">({doctor?.totalRating})</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                  <p className="text-[var(--text-color)] text-lg">{doctor?.experience[0]?.hospital}</p>

                  <Link to={`/doctors/${doctor._id}`} className="flex items-center justify-center text-lg border-2 hover:border-none hover:bg-[var(--primary-color)] hover:text-white w-10 h-10 rounded-full">
                  <BsArrowRight />
                  </Link>
                </div>
          </div>)}
          </>} 
        </div>
                        
    </div>
  )}

export default Doctors

/*

{doctorsData && doctorsData.map((doctor, index)=>
          <div key={index} className="mx-auto p-3 lg:p-5">
              <div>
              <img src={doctor.photo} alt="" className="w-full" />
              </div>
              <h3 className="text-2xl mt-5 mb-3 font-bold">{doctor.name}</h3>
              <div className="flex items-center justify-between ">
              <span className="px-5 rounded-md py-2 text-iris text-irisBlueColor bg-irisBlueColor/20 font-bold">{doctor.specialization}</span>
                <div className="flex items-center gap-2">
                <img src={star} alt="" />
                <span className="font-bold">{doctor.avgRating}</span>
                <span className="text-textColor">({doctor.totalRating})</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                  <p className="text-textColor">{doctor.hospital}</p>

                  <Link to={`/doctors/${doctor.id}`} className="flex items-center justify-center text-lg border-2 hover:border-none hover:bg-primaryColor hover:text-white w-10 h-10 rounded-full">
                  <BsArrowRight />
                  </Link>
                </div>
          </div>)}
          */
