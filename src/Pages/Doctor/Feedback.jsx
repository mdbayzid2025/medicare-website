import React, { useEffect, useState } from 'react'
import { formateDate } from '../../utils/formateDate'
import  {AiFillStar} from 'react-icons/ai'
import FeedbackForm from './FeedbackForm'
import { useParams } from 'react-router-dom'
import { useGetSingleDoctorQuery } from 'features/doctor/doctorApiSlice'

const Feedback = () => {
  const {id} = useParams()
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [reviews, setReviews] = useState(null)
  const {data } = useGetSingleDoctorQuery(id)
              

    useEffect(()=>{
      if(data){
        console.log(data)
        // const doctor = data.data.reviews.map((review)=> doctor._id === id)
        // console.log(doctor)
        setReviews(data.data.reviews);  
      }
    },[data])  
    
    
  return (
    <div>
      <div className="mb-12">
        <p className="text-lg leading-7 mb-7 font-semibold text-textColor">
          All reviews ({reviews?.length})
        </p>
        <div className="flex flex-col gap-4 mb-7">
          
       {/* ---------- Given reviews ------------- */}
      
       {reviews && reviews.map((review, index)=><div key={index} className="flex items-center justify-between gap-5">
        <div  className="flex gap-5">
          
            <img src={review.user?.photo} alt="" className="w-16 h-14 rounded-full" />
          
          <div className="">
            
            <h3 className="font-bold text-[16px] leading-7 text-primaryColor">{review.user?.name}</h3>
            
            <div className="flex items-center gap-3">
               {/* // rating  */}
            <div className="flex gap-1">
            {
            [...Array(5).keys()].map((_, index)=>{
                index += 1;
                return (
                    <button 
                    key={index}
                    type="button"
                    className={`${index <= review?.rating
                    
                    // className={`${index ==  hover
                        ? "text-yellow-400"
                        : "text-textColor"
                        } bg-transparent border-none outline-none text-[13px] cursor-pointer`}                       
                    >
                        <span> <AiFillStar /> </span>
                    </button>
                )
            })
        }

            {/* {[...Array(5).keys()].map((_, index)=>(
              <AiFillStar key={index} className="text-[#515152] text-[16px]text-[var(--primary-color)]" />
            ))} */}
          </div>
            <p className="text-[14px]"> {formateDate("06-08-2023")} </p>
            </div>
       
          <p className="text-md mt-1">{review?.reviewText} </p>
          </div>
        </div>          
        </div>)}              
        </div>
        <div className="">
          {!showFeedbackForm &&  <button style={{background: "var(--primary-color)"}} onClick={()=> setShowFeedbackForm(!showFeedbackForm)} className="btn block text-white mx-auto">Give  Feedback</button>}
          {showFeedbackForm && <FeedbackForm showFeedbackForm={showFeedbackForm} setShowFeedbackForm={setShowFeedbackForm} />}
        </div>
      </div>
    </div>
  )
}

export default Feedback