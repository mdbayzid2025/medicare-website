import React, { useState } from 'react'
import avatar from '../../assets/images/avatar-icon.png'
import signUpImg from '../../assets/images/signup.gif'
import imgUploadToImgBB from 'utils/uploadImage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { useCreateUserMutation } from 'features/auth/authApiSlice'



const initialFormData  =
  {
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "",
  }



const Signup = () => {
  const [ createUser] = useCreateUserMutation()
 const [loading, setLoading] = useState(false)
  
  const [previewUrl, setPreviewUrl] = useState("")
  
  const [formData, setFormData] = useState(initialFormData)  

  const navigate = useNavigate()


  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFileInputChange = async e =>{
    
    const file = e.target.files[0];
    const imgUrl = await imgUploadToImgBB(file)
    
    setPreviewUrl(imgUrl);
    setFormData({...formData, photo:imgUrl})
    
  }

  
  

  const submitForm = async event => {
    setLoading(true)
    event.preventDefault()            
        const result = await createUser(formData)

        if(result.data){
          toast.success("Create Account Success")          
          setPreviewUrl("")
          setFormData(initialFormData)
          navigate("/login")
          setLoading(false)
        }
        if(result.error){
         toast.error(result.error.data.message)  
        //  setLoading(false)
        }
    }
  
  return (
    <section className="px-5 xl:px-0 lg:py-10">
      <div className="max-w-[1170px] md:w-[80%] lg:w-2/3 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ================ Img Box =========== */}
          <div className="hidden  lg:flex items-center bg-primaryColor rounded-l-lg">
            <figure className="rounded-r-lg">
              <img src={signUpImg} alt="" className=" w-full rounded-l-lg" />
            </figure>
          </div>

          {/* ================ Sign Up Form =========== */}
          <div className="lg:pl-16 rounded-l-lg py-5">
            <h2 className="text-headingColor text-[25px] leading-9 font-semibold mb-3">
              Create an <span className="text-primaryColor">account</span>
            </h2>
            
            <form onSubmit={submitForm }>
            <div className="mb-1">
              <input
              value={formData.name}
              onChange={handleInputChange}
              name='name'
              type="text" 
              placeholder="Your Name" 
              className="w-full border-b border-solid outline-none focus:border-primaryColor text-[16px]  px-3 py-2 leading-7" required />
            </div>
            <div className="mb-1">
              <input
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Your Email" 
              className="w-full border-b border-solid outline-none focus:border-primaryColor text-[16px]  px-3 py-2 leading-7" required />
            </div>
            <div className="mb-1">
              <input
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              type="password" 
              placeholder="Your Password" 
              className="w-full border-b border-solid outline-none focus:border-primaryColor text-[16px]  px-3 py-2 leading-7" required />
            </div>
            <div className="mb-5 flex items-center justify-between">
            <label
            className="text-textColor font-bold text-[16px] leading-7"
            >
              Are you a: 
              <select 
               onChange={handleInputChange}
               name="role" 
               id="role"
               required
               value={formData.role}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>
            <label
            className="text-textColor font-bold text-[16px] leading-7"
            >
              Gander: 
              <select 
              onChange={handleInputChange}
              name="gender" 
              id="gender" 
              required             
              value={formData.gender}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-3 mb-2">
           {previewUrl && <figure className="w-[50px]  h-[50px] rounded-full border-2 border-solid border-primaryColor/80">
              <img src={previewUrl ? previewUrl : avatar} alt="" className="w-full h-full rounded-full" />
            </figure>}

            <div className="relative w-[150px] h-[50px]">
            <input 
            onChange={handleFileInputChange}
            type="file"
            accept='.jpg, .png'
            name="" id="customFile"
            required            
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
            className="btn w-full px-5 py-2 mt-2 rounded-md">
              { loading && <HashLoader size={30} color={"#ffffff"} />} Submit
            </button>          
          </form>   
            <p className="mt-3 text-center">Already have an account? <a href="/login" className="text-primaryColor font-semibold">Log In</a></p>
          </div>
          
        </div>
      </div>
      
    </section>
  )
}

export default Signup;