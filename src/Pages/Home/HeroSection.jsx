import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdStar } from "react-icons/io";

import drbox from '../../assets/images/drbox.png'
import secondBox from '../../assets/images/secondbox_1.png'
import thumbstar from '../../assets/images/thumbstar.png'
import sati from '../../assets/images/sati_3.png'

const 
HeroSection = () => {
  return (
    <section className=" py-[30px] md:py-[25px]">
        <div className="container">
            <div className="flex flex-col md:flex-row gap-16 ">
                {/* ================== Hero Section ================== */}
                <div className="lg:w-[570px]">
                    <h1 className="text-[var(--heading-color)] text-[44px] lg:text-[65px] font-[800] ">
                    We help patients  
                    live a healthy, 
                    longer life
                    </h1>
                    <p className="text-para text-justify">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse earum quidem corrupti, soluta dolores suscipit fuga blanditiis. Amet, asperiores deserunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto soluta, perferendis veniam commodi porro corrupti.
                    </p>
                    <Link to={"/doctors"}>
                        <button className='button'>Request an Appointment
                        </button> 
                        </Link>

                    <div className="flex items-center mt-12 gap-5">
                        <div>
                            <h1 className="text-4xl font-bold ">30+</h1>
                            <hr className="h-2 w-[100px] mt-[-10px]  bg-[var(--secondary-color)]"></hr>
                            <p className="text-para">Years of Experience</p>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold ">30+</h1>
                            <hr className="h-2 w-[100px] mt-[-10px]  bg-[var(--purple-color)]"></hr>
                            <p className="text-para">Years of Experience</p>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold ">30+</h1>
                            <hr className="h-2 w-[100px] mt-[-10px]  bg-[var(--iris-color)]"></hr>
                            <p className="text-para">Years of Experience</p>
                        </div>
                    </div>
                </div>

                {/* ================== Hero Content ================== */}

<div className="md:w-1/2 relative">
    <div>        
    <img src="https://kamleshyadav.com/html/healthcare/bootstrap5/demo9/assets/images/banner_right.png" alt="" className='w-4/5 ml-auto' />
    </div>

    <div className="absolute hidden top-[40%] md:flex gap-4 border bg-white px-3 py-1">
  <div>
    <h3 className="text-xl md:text-2xl font-bold">3.5k Plus</h3>
    <p className="font-semibold text-gray-600">Satisfied Patients</p>
  </div>
  <div className=" mb-3 flex -space-x-5 md:-space-x-3 rtl:space-x-reverse">
    <img
      className="h-12 w-12 rounded-full border-2 border-white dark:border-gray-800"
      src={sati}
      alt=""
    />
    <img
      className="h-12 w-12 rounded-full border-2 border-white dark:border-gray-800"
      src={sati}
      alt=""
    />
    <img
      className="h-12 w-12 rounded-full border-2 border-white dark:border-gray-800"
      src={sati}
      alt=""
    />
    <a
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-400 text-xs font-medium text-white hover:bg-gray-500 dark:border-gray-800"
      href="/#"
    >
      +3
    </a>
  </div>
</div>

<div className='absolute -right-2 top-[20%] md:top-[30%] md:right-0 shadow-black bg-white rounded-md'>
  <img src={secondBox} alt="" class="border-6 border-gray-100 shadow" />
</div>

<div className="flex justify-between">
<div class="relative md:left-20 -top-5 md:-top-14">
<div class="bg-white w-32 md:w-48 shadow   mx-auto px-0 md:px-5 py-2 ">
  <img src={drbox} alt="" class="absolute left-0 right-0 -top-16 mx-auto  border-gray-100" />
  <p class="text-center leading-0  pt-2 md:pt-5 text-xl md:text-3xl font-bold">200+</p>
  <p class="text-xs md:text-[14px] text-center text-gray-600 font-semibold">World’s Top Doctors Consultation</p>
  
</div>
</div>
<div class="relative -top-5 md:-top-14 md:left-10">
<div class="bg-white w-32 md:w-48 shadow   mx-auto px-0 md:px-2 py-2">
  <img src={thumbstar} alt="" class="absolute left-0 right-0 -top-14 mx-auto  border-gray-100" />
  <p className='flex justify-center gap-0 md:gap-1 pt-4 md:pt-8'>
    <IoMdStar className='text-orange-600' />
    <IoMdStar className='text-orange-600' />
    <IoMdStar className='text-orange-600' />
    <IoMdStar className='text-orange-600' />
    <span className='text-sm'>4.5</span>
  </p>
  
  <p class="text-center text-xs text-gray-700 font-bold"> Mark A. Wilson </p>
  <p className='text-xs text-center'>Heart Patient</p>
  
</div>
</div>
</div>
</div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection