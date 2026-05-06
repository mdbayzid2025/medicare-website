import React, {useState, useEffect} from 'react'
import img from '../../assets/images/faq-img.png'
import faqData from '../../assets/data/faqData'
import { BiPlus,  BiMinus } from 'react-icons/bi'


const initialState = [
    {
        question: "",
        answer: ""
    }
]


const FAQ = () => {

const [items, setItems] = useState(initialState)

useEffect(()=>{
    if(faqData){
        setItems(faqData)
    }
},[])

    const handleSeeAnswer = (id, isSelect) => {

        const updateData = items.map((item)=>{
            if(item.id === id){
                return {...item, isSelect: isSelect}
            }
            return item
        })
        setItems(updateData)
    }


  return (
    <div className="container mx-auto my-32">  
        <div  className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 xl:gap-0">
            <div className="lg:w-1/2 xl:w-[770px]">
                <div>
                    <img src={img} alt="" />
                </div>                
            </div>
            <div className="lg:w-1/2">
                <h2  className="heading mb-5">Most questions by our beloved patients</h2>
                
                
                {items && items.map((data, index)=>

                 <div key={index} className={`${data.isSelect ? "h-40" : "h-[70px]"} bg-[var(--menu-bg)] transition-all overflow-hidden duration-700  w-full p-3 border-2 mb-3`}>
                    <div onClick={()=> handleSeeAnswer(data.id,!data.isSelect)}  className=" cursor-pointer  flex items-center justify-between ">
                    <p className="font-semibold">{data.question}</p>     
                    <div className={`${data.isSelect && "bg-primaryColor"} border-2 p-2 text-2xl`}>                    
                    {!data.isSelect ? <BiPlus   /> : <BiMinus   />}
                    </div>             
                    </div>
                    
                    {data.isSelect && <p> {data.answer}</p>}
                </div>                   

                )}                                                  
            </div>
        </div>

    </div>
  )
}

export default FAQ