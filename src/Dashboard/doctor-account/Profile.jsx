import React, { useEffect, useState } from 'react'

import {BsTrash} from 'react-icons/bs'
import Qualification from './Qualification'
import Experience from './Experience'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useUpdateDoctorMutation } from 'features/doctor/doctorApiSlice'
import { useNavigate } from 'react-router-dom'


const initialState = {
  startDate: "",
  endDate: "",
  degree: "",
  university: "",
}
const initialExp = {
  startDate: "",
  endDate: "",
  position: "",
  hospital: "",
}


const initialFormData = {
  name: "",
  email: "",
  gender:"",
}

const Profile = ({setTab, user}) => {

  // API
  const [updateDoctor] = useUpdateDoctorMutation()
  
  const [data, setData] = useState(initialState)
  const [expData, setExpData] = useState(initialExp)
  const [qualification, setQualification] = useState([{
    startDate : "", endDate: "", degree: "", university: "",
  }])
  const [formData, setFormData] = useState(initialFormData)
  const [experiences, setExperiences] = useState([{
    startDate : "", endDate: "", position: "", hospital: "",
  }])
  
  const [open, setOpen] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      gender: "male",
    })
  },[user.name, user.email, formData])
  

  const addQualification = () => {
    if(data.startDate && data.endDate && data.degree && data.university){
      const newQualification = {
        startDate: data.startDate,
        endDate: data.endDate,
        degree: data.degree,
        university: data.university,
      }
      if(qualification.length === 1 && Object.values(qualification[0]).every(value=> value === "")){
      setQualification([{...newQualification, id:qualification.length}])
      setOpen(false)
      setData(initialState)
      }else{
        setQualification([...qualification, {...newQualification, id:qualification.length + 1}])
      setOpen(false)
      }  
    }
    else{
      return toast.error("Please complete qualification")     
    }     
  }
  const addExperience = () => {
    if(expData.startDate && expData.endDate && expData.position && expData.hospital){
      const newExperiences = {
        startDate: expData.startDate,
        endDate: expData.endDate,
        position: expData.position,
        hospital: expData.hospital,
      }
      if(experiences.length === 1 && Object.values(experiences[0]).every(value=> value === "")){
      setExperiences([{...newExperiences, id:experiences.length}])
      setOpenExperience(false)
      setExpData(initialExp)
      }else{
        setExperiences([...experiences, {...newExperiences, id:experiences.length + 1}])
        setOpenExperience(false)
      }  
    }
    else{
     return toast.error("Please complete experience")
    }     
  }
  const handleOnChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const handleFormOnChange = e => {
    setFormData({...data, [e.target.name]: e.target.value})
  }
  const handleExpOnChange = e => {
    setExpData({...expData, [e.target.name]: e.target.value})
  }


 const formSubmitHandler = async (event) =>{
  event.preventDefault()
  setLoading(true)
  const form = event.target;

 console.log("Slot starting time", form.startTime.value)
 console.log("Slot ending time", form.endTime.value)

  if(Object.values(qualification[0]).every(value=> value !== "") && Object.values(experiences[0]).every(value=> value !== "")){
    const updateData = {      
      name: formData.name,
      email: formData.email,
      phone: form.phone.value,
      bio: form.bio.value,   
      gender: formData.gender,
      specialization: form.specialization.value,     
      ticketPrice: Number(form.ticketPrice.value),    
      about: form.about.value, 
      qualification: qualification,
      experience:experiences,
      availableTime:{
        startingTime : form.startTime.value,
        endingTime : form.endTime.value,
      },
    } 
    const  result = await updateDoctor({...updateData, id: user._id})
    console.log(result)

    if(result.success){
      console.log(console.log(result))
      setTab("overview")
    }
    if(result.error){
      console.log(result)
      toast.error(result.error.data.message)
    }
  }
  else{
    return toast.error("Please fillup the form")
  }
  
 }


  return (
    <div>
        <p className="bg-yellow-200 text-red-700 py-1 px-2 text-sm text-center">To get approval please complete your profile. We'll review manually and approve within 3 days</p>
      <h2 className="text-2xl text-[var(--text-color)] font-bold mt-3">Profile Information</h2>
      <form onSubmit={formSubmitHandler} className="my-3">
        <div className="mb-3">
        <label htmlFor="name" 
        className="text-[var(--text-color)]">Name <span className="text-red-500">*</span></label> <br />

        <input type="text"  name="name" id='name' required onChange={handleFormOnChange} value={formData.name}
        placeholder="Your Name" className="w-full border px-2 py-2 text-[18px] text-[#121212] rounded-lg mt-2" />
        </div>
        <div className="mb-3">
        <label htmlFor="email" 
        className="text-[var(--text-color)]">Email <span className="text-red-500">*</span></label> <br />

        <input type="email" name="email" id='email' required onChange={handleFormOnChange} value={formData.email}
        placeholder="Your Email" className="w-full border px-2 py-2 text-lg text-[#121212] rounded-lg mt-2" />
        </div>
        <div className="mb-3">
        <label htmlFor="phone" 
        className="text-[var(--text-color)]">Phone <span className="text-red-500">*</span></label> <br />
        <input type="number" name="phone" id="phone" required
        placeholder="Phone" className="w-full border px-2 py-2 text-lg text-[#121212] rounded-lg mt-2" />
        </div>
        <div className="mb-3">
        <label  htmlFor="bio" 
        className="text-[var(--text-color)] mb-4">Bio <span className="text-red-500">*</span></label> <br />
        <input type="text" name="bio" id="bio" required
        placeholder="Your Bio" className="w-full border px-2 py-2 text-[18px] text-[#121212] rounded-lg mt-2" />
        </div>
        <div className="flex items-center justify-between gap-8">
          {/* // Gender  */}
          <div className="flex flex-col w-full">
          <label className="mb-4" htmlFor="gender">Gender</label>
          <select name="gender" id="gender" onChange={handleFormOnChange} value={formData.gender} className="w-full p-3 border" required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          </div>
          {/* // Specialization  */}
          <div className="flex flex-col w-full">
          <label className="mb-4" htmlFor="specialization">Specialization</label>
          <select name="specialization" id="specialization" className="w-full p-3 border" required>
            <option value="">Select</option>
            <option value="immunologists">Immunologists</option>
            <option value="anesthesiologists">Anesthesiologists</option>
            <option value="cardiologists">Cardiologists</option>
            <option value="dermatologists">Dermatologists</option>
            <option value="gastroenterologists">Gastroenterologists</option>
            <option value="anesthesiologists">Anesthesiologists</option>
            <option value="hematologists">Hematologists</option>
            <option value="neurologists">Neurologists</option>
          </select>
          </div>
          {/* // Ticket Price  */}
          <div className="flex flex-col w-full">
          <label className="mb-4" htmlFor="ticketPrice">Ticket Price</label>
          <input type="number" name="ticketPrice" id="ticketPrice" className="numberInput appearance-none leading-tight w-full border p-3 focus:outline-none numberInput selection:focus:shadow-outline" required />
          </div>          
        </div>
        {/* ====== Qualification======== */}
        <div>
        {(Object.values(qualification[0]).every(value=> value !== "")) && 
        <Qualification  qualification={qualification} setQualification={setQualification}/>
        } 
        </div>
                
        {open ?  
        <div>
      <p className="my-3">Qualification</p>
        {/* ======= Starting date ===== */}
        <div className="flex justify-between items-center gap-10">
          <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="startDate">Starting Date</label>
          <input
          onChange={handleOnChange}
          type="date" name="startDate" id="startDate" className=" border px-5 py-3" required/>
          </div>
          <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="endDate">Ending Date</label>
          <input
          onChange={handleOnChange}          
          type="date" name="endDate" id="endDate" className=" border px-5 py-3" required/>
          </div>
        </div>
        {/* ========== Degree & University Name == */}
        <div className="flex items-center justify-between gap-10 mt-3">
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="degree">Degree</label>
          <input 
          onChange={handleOnChange}                    
          type="text" placeholder="Degree" name="degree" id="degree" className=" border px-5 py-3" required />
          </div>
          <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="university">University</label>
          <input 
          onChange={handleOnChange}                              
          type="text" placeholder="University Name" name="university" id="university" className=" border px-5 py-3" required />
          </div>
        </div>

        <div className="flex items-center mt-8 gap-5">
        <div  
        onClick={()=>addQualification()}  
        style={{marginTop: "0px"}}    
        className="btn ">Save</div>
   
   
        <div
        onClick={()=>setOpen(false)}
        className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer">
        <BsTrash className="text-2xl"/ >
        </div>
        </div>        
    </div>
        : 
        <p
        onClick={()=>setOpen(true)}
         className="px-2 border py-3 bg-[#121212]/90 hover:bg-[#121212] text-white w-[25%] text-center mt-3 cursor-pointer">Add Qualification</p> }

        {/* ====== Experience======== */}
        <div>
        <div>
        {(Object.values(experiences[0]).every(value=> value !== "")) && 
        <Experience  experiences={experiences} setExperiences={setExperiences}/>
        } 
        </div>
        
        {openExperience ? 
        <div>
      <p className="my-3">Experience</p>
        {/* ======= Starting date ===== */}
        <div className="flex justify-between items-center gap-10">
          <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="startDate">Starting Date</label>
          <input
          onChange={handleExpOnChange}
          type="date" name="startDate" id="startDate" className=" border px-5 py-3" required/>
          </div>
          <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="endDate">Ending Date</label>
          <input
          onChange={handleExpOnChange}          
          type="date" name="endDate" id="endDate" className=" border px-5 py-3" required/>
          </div>
        </div>
        {/* ========== Degree & University Name == */}
        <div className="flex items-center justify-between gap-10 mt-3">
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="position">Position</label>
          <input 
          onChange={handleExpOnChange}                    
          type="text" placeholder="position" name="position" id="position" className=" border px-5 py-3" required />
          </div>
          <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="hospital">Hospital</label>
          <input 
          onChange={handleExpOnChange}                              
          type="text" placeholder="Hospital Name" name="hospital" id="hospital" className=" border px-5 py-3" required />
          </div>
        </div>

        <div className="flex items-center mt-8 gap-5">
        <div  
        onClick={()=>addExperience()}  
        style={{marginTop: "0px"}}    
        className="btn ">Save</div>
      
        <div
        onClick={()=>setOpenExperience(false)}
        className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer">
        <BsTrash className="text-2xl"/ >
        </div>
        </div>        
    </div> 
    : <p
        onClick={()=>setOpenExperience(true)}
         className="px-2 border py-3 bg-[#121212]/90 hover:bg-[#121212] text-white w-[25%] text-center mt-3 cursor-pointer">Add Experience</p>}
        
        </div>

         {/*===========Add slot  section===========*/}
             
        <div>
        <p className="my-3">Available Time</p>
         <div className="flex items-center justify-between mt-3 gap-8">
         {/* // Day  */}        
         
         <div className="flex flex-col w-full">
         <label className="mb-4" htmlFor="specialization">Starting Time</label>    
         <input 
         type="time" 
         name="startTime"         
         className="numberInput appearance-none leading-tight w-full border p-3 focus:outline-none numberInput selection:focus:shadow-outline" />
         </div>
         {/* // Ticket Price  */}
         <div className="flex flex-col w-full">
         <label className="mb-4" htmlFor="ticket-price">Ending Time</label>
         <input 
         type="time"
         name="endTime"
         className="numberInput appearance-none leading-tight w-full border p-3 focus:outline-none numberInput selection:focus:shadow-outline" />
         </div>          
       </div>
       <div className="flex items-center mt-8 gap-5">
        </div>  
       </div>
           
          
          
          
        <div className="my-5">
        <label  htmlFor="about" 
        className="text-[var(--text-color)] mb-4">About <span className="text-red-500">*</span></label> <br />
        <textarea type="text" name="about" id="about" rows={3} required
        placeholder="About" className="w-full border px-2 py-2 text-[18px] text-[#121212] rounded-lg mt-2" />
        </div>
        <button className="btn bg-[var(--primary-color)]">{loading && <HashLoader color='#0067FF' size={25} />} Update</button>
      </form>
      
    </div>
  )
}

export default Profile