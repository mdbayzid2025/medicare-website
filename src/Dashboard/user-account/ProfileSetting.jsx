import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import imgUploadToImgBB from 'utils/uploadImage'
import avatar from '../../assets/images/avatar-icon.png'
import { useUpdateUserMutation } from 'features/users/userApiSlice'

const initialFormData  =
  {
    id: "",
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",    
    bloodType: "",
  }


const ProfileSetting = ({user, tab, setTab}) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [previewUrl, setPreviewUrl] = useState("")
  const [formData, setFormData] = useState(initialFormData)
      
  useEffect(()=>{
    if(user){        
       setFormData({
        ...initialFormData,
        name: user?.name,
        email: user?.email,                
        gender: user?.gender,
        bloodType: user?.bloodType || "",        
      })
    }
  },[user])


  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFileInputChange = async e =>{    
    const file = e.target.files[0];
    const imgUrl = await imgUploadToImgBB(file) 
    setPreviewUrl(imgUrl);
  }
  
  const submitForm = async event => {    
    event.preventDefault()   
    setLoading(true)      

    const updatedData = {...formData, id:user._id, photo: previewUrl}    
        const result = await updateUser(updatedData)
        if(result.data){          
          toast.success("User Updated Success")   
          setTab("booking")
          setPreviewUrl("")  
          console.log("result", result.data)                          
          setFormData(initialFormData)
          setLoading(false)          
        }
        if(result.error){
          console.log("this is from patient", result.error)                        
         toast.error(result.error.data.message)          
         setLoading(false)
        }                
    }
      
  return (
    <div>
      <h2 className="text-2xl mt-8 font-bold">Profile Setting</h2>
      <form onSubmit={submitForm}>
        <div className="mb-5">
      <input
            type="text"
            name="name" required
            onChange={handleInputChange}
            value={formData.name}
            placeholder={formData.name}
          className="border-b border-[#0066ff61] border-solid w-full  py-2 text-[16px] leading-7 placeholder:text-textColor outline-none focus:outline-none focus:border-primaryColor" />
        </div>
        <div className="mb-5">
      <input
            type="email"
            name="email" required
            onChange={handleInputChange}
            value={formData.email}            
            className="border-b border-[#0066ff61] border-solid w-full  py-2 text-[16px] leading-7 placeholder:text-textColor outline-none focus:outline-none focus:border-primaryColor" />
        </div>
        <div className="mb-5">
      <input
            type="password"
            name="password" 
            onChange={handleInputChange}
            value={formData.password && formData.password}
            placeholder={formData.password ? formData.password : "Password"}            
            className="border-b border-[#0066ff61] border-solid w-full  py-2 text-[16px] leading-7 placeholder:text-textColor outline-none focus:outline-none focus:border-primaryColor" />
        </div>
        
        <div className="flex gap-12 w-full lg:w-3/4">
        <div className="flex mb-10">
          <label htmlFor="bloodType" className='whitespace-nowrap'>Blood Group</label>
          <select 
          name="bloodType"
          id="bloodType"
          onChange={handleInputChange}
          value={formData.bloodType}          
          className=" ml-2 text-center  text-[var(--my-color)] bg-[var(--primary-color)]"          >
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>      
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="flex mb-10">
        <label htmlFor="gender" className="mr-5">Gender</label>
        {/* background: "var(--primary-color)", */}
        <select         
        name="gender" id="gender" value={formData.gender} onChange={handleInputChange} className="w-3/4 text-center text-[var(--my-color)] bg-[var(--primary-color)]">
          <option value="male" className="" >Male</option>
          <option value="female" className="">Female</option>
          <option value="other" className="">Other</option>
        </select>
        </div>
        </div>
        
        {/* // image uploadImage */}
        <div className="flex gap-5 items-center">
        {previewUrl && <figure className="w-[75px]  h-[75px] rounded-md border-2 border-solid border-primaryColor/80">
              <img src={previewUrl ? previewUrl : avatar} alt="" className="w-full h-full rounded-md" />
            </figure>}
        
        <div className="relative w-[150px] h-[50px]">
        
            <input 
            onChange={handleFileInputChange}
            type="file"
            accept='.jpg, .png'
            name="" id="customFile"            
            className="absolute top-0 left-0 w-full h-full opacity-0 "
             />
             <label htmlFor="customFile"
             className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-[#0066ff46] text-textColor rounded-full cursor-pointer font-semibold px-2 py-1"
             >
              Upload Photo
             </label>
            </div>
            </div>                     
            <button  
            style={{background: 'var(--primary-color)', color:"white"}}          
            className="btn w-full px-5 py-2 mt-4 rounded-md">
              {isLoading ? <> <HashLoader size={20} color="#fffff" /> Updating </>: "Submit"}
            </button>  
      </form>
    </div>
  )
}

export default ProfileSetting