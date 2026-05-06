import { authContext } from 'context/AuthContext'
import { logOut, selectCurrentRole, selectCurrentUser } from 'features/auth/authSlice'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const DropdownMenu = ({ openMenu, setOpenMenu, }) => {
  // const {dispatch, user, role} = useContext(authContext)
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const role = useSelector(selectCurrentRole)
  const dispatch = useDispatch()
  const signUp = () => {
    setOpenMenu(!openMenu)
    dispatch(logOut())
  }
  return (
    <div
      className={"top-14  bg-slate-100 opacity-1 right-0 absolute  rounded-lg shadow-black/40 shadow-lg px-2 w-56 transition-all duration-500 "}>

      {/* <!-- Dropdown menu --> */}
      <div className="px-4 py-3">
        <span className="block font-bold text-lg text-gray-900 dark:text-white">{user.name}</span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
      </div>
      <ul className="">
        <li>
          <a href={`${role == "patient" ? "/users" : "/doctors"}/profile/${user._id}`} className="block px-4 py-2 mb-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
        </li>
      </ul>
      <button
        onClick={signUp}
        className="text-center text-lg block mb-3 w-full bg-[var(--primary-color)] text-white py-1.5 rounded-md font-semibold" >Sign Out</button>
    </div>
  )
}

export default DropdownMenu
/*
<div
style={{lineHeight: "100%"}}
className={`${!openMenu ? "-top-full  " : "top-28  opacity-1 "} absolute bg-[var(--my-color)] rounded-lg shadow-md px-2 w-full transition-all duration-500 `}>
    <p>Th is imenu bar</p>
    <button
    onClick={()=>signUp()}
    className="text-center text-lg block my-3 w-full bg-[var(--primary-color)] py-1.5 rounded-md" >Sign Out</button>
</div>
*/