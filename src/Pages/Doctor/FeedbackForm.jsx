import { usePostReviewMutation } from 'features/doctor/doctorApiSlice';
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const FeedbackForm = ({showFeedbackForm, setShowFeedbackForm}) => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [postReview, { isLoading }] = usePostReviewMutation()    

    const [showFeedback, setShowFeedback] = useState("")
    const {id} = useParams()

    
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        
        if(showFeedback && rating){            
           
            const result = await postReview({id,  reviewText: showFeedback,
                rating,})
    
            if(result.data){
                console.log(result.data)
                toast.success("Thanks for your fedback")
                setRating(0)
                setShowFeedback("")
                setShowFeedbackForm(!showFeedback)
            }
            if(result.error){
                // toast.error(`${result.error?.data}`,)
                console.log(result.error)
            }
        }else{
            toast.error("Please give rating & feedback")
        }

    }

            
    
  return (
    <form onSubmit={handleFormSubmit}>
        <div>
            <p className="mb-2">How would you rate the overall experience?<span className="text-red-600">*</span></p>
        {
            [...Array(5).keys()].map((_, index)=>{
                index += 1;
                return (
                    <button 
                    key={index}
                    type="button"
                    className={`${index <= ((rating && hover) || hover)
                    
                    // className={`${index ==  hover
                        ? "text-yellow-400"
                        : "text-textColor"
                        } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                        onClick={()=> setRating(index)}
                        onMouseEnter={()=>setHover(index)}
                        onMouseLeave={()=> { console.log("this is from mouse leave"); setHover(rating)}}
                        onDoubleClick={()=> {
                            setHover(0);
                            setRating(0);
                        }}
                    >
                        <span> <AiFillStar /> </span>
                    </button>
                )
            })
        }

            <p className="my-3">Share your Feedback or Suggestion<span className="text-red-600">*</span></p>
            <textarea type="textarea"
            onChange={(e)=> setShowFeedback(e.target.value)}
            value={showFeedback}
            className="w-full border border-solid p-4 text-textColor"
            rows="5" placeholder="Write your feedback or suggestion here" name="" id="" required />

        </div>
    <button     
    className="px-5 py-2 bg-blue-800 bg-opacity-80 hover:bg-opacity-100 rounded-lg text-white mr-6">{isLoading ? <HashLoader size={20} color="#fffff" /> : "Submit"}</button>
    <button     
    onClick={()=>setShowFeedbackForm(!showFeedbackForm)}   
    className=" bg-red-700  border rounded-lg text-white px-5 py-2  mr-6 font-semibold">Cancel</button>

    </form>
  )
}

export default FeedbackForm