import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaLaptopMedical } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { logOut, selectCurrentRole, selectCurrentUser } from 'features/auth/authSlice';
import logo from '../assets/images/pluslogo.png'
import { MdClose } from "react-icons/md";


  
const navLinks = [
  {
      path: '/home',
      display: "Home",
      icon: <IoHomeOutline />
  },  
  {
      path: '/doctors',
      display: "Doctors",
      icon: <FaRegUser />
  },
  {
      path: '/services',
      display: "Services",
      icon: <FaLaptopMedical />
  },
  {
      path: '/contact',
      display: "Contact",
      icon: < RiLogoutBoxLine />
  },
]

const Menu = ({setOpen,  open}) => {
  const user =  useSelector(selectCurrentUser)
  const role =  useSelector(selectCurrentRole)

  return ( <>

     <div className='h-[100svh] relative'>
      <div className="flex  px-5 pt-10  items-center justify-between">
              <a href="/home" className="flex text-2xl md:text-3xl items-center text-[var(--heading-color)] gap-3 font-extrabold">
                <img src={logo} alt="Logo" className="cursor-pointer  w-6 md:w-8"/>
                <p>Mediplus</p>
                </a>
                <MdClose onClick={()=>setOpen(!open)} className='text-4xl ' />
      </div>
     
            <ul className="gap-6  flex flex-col justify-center  mx-5 ml-4 pt-12">
                    { navLinks && navLinks.map((link, index)=>
                    <NavLink to={link.path} onClick={()=>setOpen(!open)} className={navClass => navClass.isActive ? "text-[var(--primary-color)] text-lg  font-[600] text-center  flex items-center gap-12 py-3 px-2 bg-blue-200"
                    : "px-2 text-lg text-textColor font-[500]  text-center flex items-center gap-12 hover:bg-blue-200 py-3 hover:blue-200" } key={index}>
                      <span>{link.icon}</span>
                      <span>{link.display}</span>
                      
                      </NavLink>)
                    }
                </ul>
                {user && role ? 
                <>

                <NavLink  
                onClick={()=>setOpen(!open)}
                to={`${role == "patient" ? "/users" : "/doctors" }/profile/${user._id}`} className={navClass => navClass.isActive ? "text-[var(--primary-color)] text-lg  font-[600] text-center  flex items-center gap-2 py-3 px-2 bg-blue-200 mx-5"
                    : "px-2 text-lg text-textColor font-[500]  text-center flex items-center gap-12 hover:bg-blue-200 py-3 hover:blue-200 mx-5" } >
                      <span><CgProfile /></span>
                      Profile
                      </NavLink>

                <Link

                 onClick={()=>{logOut(); setOpen(!open)}}
                to={"/login"}><button className='w-[90%] text-white text-xl bg-blue-700 py-2  ml-3 mr-3 rounded-full mt-10'>Log Out</button></Link> </>

                :  <> <Link  to={"/login"}><button onClick={()=>setOpen(!open)} className='w-[90%] text-white text-xl bg-blue-700 py-2  ml-3 mr-3 rounded-full mt-3'>Login</button></Link>
                <Link  to={"/signup"}><button onClick={()=>setOpen(!open)} className='w-[90%] text-white text-xl bg-gray-600 py-2  ml-3 mr-3 rounded-full mt-3'>Signup</button></Link> </>}
      
      </div>

      {/* ------------- User Email & Logout ----------- */}
    {user &&  <div className='absolute left-0 bottom-0 pl-2 bg-slate-500  w-full flex items-center justify-between'>
        <div className='flex '>
        <img src={user.photo} alt="" className='w-10 rounded-md mr-3' />
        <div>
          <p className='text-white text-lg'>{user.name}</p>
          <p className='text-white'>{user.email}</p>
        </div>
        </div>
        
        <p
        onClick={()=>{logOut(); setOpen(!open)}}
        className='bg-red-600 px-3 py-6 h-full cursor-pointer '>

        < RiLogoutBoxLine className='text-2xl text-white' />
        </p>
      </div>}
    </>
  )
}

export default Menu