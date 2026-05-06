import React, { useState } from 'react'
import logo from '../assets/images/pluslogo.png'
import { Link, NavLink } from 'react-router-dom'

import { BiMenu } from 'react-icons/bi'
import Menu from './Menu'


import DropdownMenu from './DropdownMenu'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from 'features/auth/authSlice'
// import bg from '../assets/images/header-bg.png'

const navLinks = [
    {
        path: '/home',
        display: "Home",
    },
    {
        path: '/doctors',
        display: "Doctors",
    },
    {
        path: '/services',
        display: "Services",
    },
    {
        path: '/contact',
        display: "Contact",
    },
]

const Header = () => {
    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [scroll, setScroll] = useState(false)

    // change nav color when scroll
    const onChange = () => {
        if (window.scrollY >= 90) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }
    window.addEventListener("scroll", onChange)


    // const { theme, themeToggle } = useContext(ThemeContext)
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    return (
        <div className={` ${scroll ? "bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 fixed top-0 left-0" : "bg-white relative transform duration-200"}   header  z-[999] flex items-center md:py-4 py-3`}>
            <div className="container">
                <div className="flex justify-between items-center">

                    {/* ============= Logo ========== */}
                    <a href="/home" className="flex text-xl md:text-3xl items-center text-[var(--heading-color)] gap-3 font-extrabold">
                        <img src={logo} alt="Logo" className="cursor-pointer w-6 md:w-8" />
                        <p>Medicare</p>
                    </a>

                    {/* ================= Navigation ============== */}
                    <div className="navigation hidden md:block ">
                        <ul className="flex items-center justify-between gap-3 md:gap-8 mx-5">
                            {navLinks && navLinks.map((link, index) =>
                                <NavLink to={link.path} className={navClass => navClass.isActive ? "text-[var(--primary-color)] text-lg leading-7 font-[600]"
                                    : "text-lg text-textColor font-[500] leading-7"} key={index}>{link.display}</NavLink>)
                            }
                        </ul>
                    </div>


                    {/* ============= Nev Right ================= */}
                    <div className="flex items-center justify-between gap-2 md:gap-4">
                        {user && token ?
                            <>
                                <div className="mr-1 md:mr-3 flex gap-1 items-center cursor-pointer relative"
                                    onClick={() => setOpenMenu(!openMenu)}
                                >
                                    <figure className="w-8 h-8 ">
                                        <img src={user.photo} alt="" className={`w-full h-full outline-green-600 ${openMenu && "outline"} rounded-full`} />
                                    </figure>
                                    <div className='hidden md:block'>
                                        <p className=' text-sm font-semibold'>{user.name}</p>
                                        <p className='text-xs'>{user.email}</p>
                                    </div>
                                    {
                                        openMenu && <DropdownMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
                                    }
                                </div>

                            </>
                            : <div className='hidden md:flex items-center gap-5'> <Link to="/login" >
                                <button className="flex justify-center items-center min-w-[100px]  py-2 px-6 h-[40px] bg-slate-300 cursor-pointer text-[#121212] transition-all ease-in duration-75 hover:text-primaryColor  hover:underline font-[800] rounded-md group-hover:bg-opacity-0">Log In</button>
                            </Link>

                                <Link to="/signup">
                                    {/* <button style={{background: "var(--primary-color)"}} className="flex justify-center items-center py-2 px-6 min-w-[120px]  text-white h-[40px] rounded-full cursor-pointer">
                   Sign Up
                  </button> */}
                                    <button className="bg-[var(--primary-color)] text-white font-semibolds flex justify-center items-center rounded-lg cursor-pointer py-2 px-6  min-w-[120px] h-[40px] mt-0">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>}
                        {/* <button onClick={themeToggle} className="text-[16px] hover:bg-slate-300 rounded-full p-1">
                   {theme === "dark" ? <CiLight  className="text-[30px]"/>
                    : <CiDark className="text-[30px]"/>}

                </button>       */}
                        <div className="w-5">
                            {!open ? <BiMenu onClick={() => setOpen(!open)} className="text-[35px] cursor-pointer md:hidden" />
                                : <button onClick={() => setOpen(!open)} className='text-[30px] hover:text-red-600 md:hidden cursor-pointer'>X</button>}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`md:hidden  bg-white shadow-xl w-full max-w-[400px]  ${open ? "left-10" : "-z-20 -left-full"} top-0 absolute transition-all  duration-500 w-[75%] shadow-black shadow-xl`}>
                <Menu navLinks={navLinks} setOpen={setOpen} open={open} className="relative " />
            </div>

        </div>
    )
}

export default Header