
import { useContext, useEffect, useState } from 'react';
import MyBooking from './MyBooking';
import ProfileSetting from './ProfileSetting';
import Loader from 'component/Loader';
import { useDispatch } from 'react-redux';
import { logOut } from 'features/auth/authSlice';
import { useParams } from 'react-router-dom';



const MyAccount = () => {
  const {id} = useParams()  
  const {data, isError, isLoading} = useGetSingleUserQuery(id)
  const [tab, setTab] = useState("booking")
  const [user, setUser] = useState(null)

const dispatch = useDispatch()

const signUp = () =>  {  
  dispatch(logOut())
}

useEffect(()=>{
  if(data){
    setUser(data.data)
  }
},[data])



  return (
    <div className="max-w-[1770px] px-5 mx-auto flex-1 mt-10">
      { isError || isLoading ? <>          
          <p className="text-red-600">{isError.message}</p>
         : <Loader />          
       </> : 
      <div className="grid md:grid-cols-3 gap-2">
      <div className="md:col-span-1 pb-12 px-2 rounded-md">
        <div className="flex items-center justify-center">
          <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
            <img 
            src={user?.photo}
            alt=""
            srcset="" 
            className="w-full h-full rounded-full"
            />
          </figure>
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg leading-7 text-headingColor font-bold">
            {user?.name}
          </h3>
          <p className="text-textColor text-[16px] leading-6 font-medium">
            {user?.email}
          </p>
          <p className="text-textColor text-[16px] leading-6 font-medium">
            Blood Type: 
            <span className="ml-2 text-red-600 text-[22px] leading-8 font-bold">
              {user?.bloodType ? user?.bloodType : "(-)"}
            </span>
          </p>
          </div>

          <div className="mt-12 md:mt-24">
            <button
            onClick={()=>signUp()}
            className="w-full bg-[var(--primary-color)] p-3 text-lg leading-7 rounded-md text-white mb-3">
            Logout
            </button>
            <button className="w-full bg-[#181A1E] p-3 text-lg leading-7 rounded-md text-white">
            Delete account
            </button>
          </div>
        
      </div>
      <div className="md:col-span-2 md:px-7">
      {(isError || isLoading) ? <> {isError ? <p className="text-center">Something Went Error</p>  
      : <div className=' text-center pt-[10%]'> <Loader/> </div>}    </> :       
        <div>
          <button
          onClick={()=>setTab("booking")}
          className="p-2 px-5 mr-5 rounded-md text-headingColor font-semibold text-lg leading-7 border border-solid border-primaryColor  cursor-pointer"
          
          style={{              
            background: tab === "booking" && "var(--primary-color)",
            color: tab === "booking" && "var(--my-color)"              
            }}>
            My Booking
          </button>
          <button
          onClick={()=>setTab("setting")}
          className={` ${tab === "setting" && 'bg-primaryColor text-white'} p-2 px-5 mr-5 rounded-md text-headingColor font-semibold text-lg leading-7 border border-solid border-primaryColor  cursor-pointer`}
          style={{
            background: tab === "setting" && "var(--primary-color)",
            color: tab === "setting" && "var(--my-color)"
          }}>
            Profile Setting
          </button>
          {
            tab === "booking" ? <MyBooking user={user} /> 
            : <ProfileSetting user={user} tab={tab} setTab={setTab} />
          }
        </div>}
      </div>
    </div>
      }      
    </div>
  )
}

export default MyAccount