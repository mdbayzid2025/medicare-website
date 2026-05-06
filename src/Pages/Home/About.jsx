import React from 'react'
import img from '../../assets/images/about.png'
import card from '../../assets/images/about-card.png'

const About = ( ) => {
    
  return (
    <div className="container my-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 xl:gap-0 justify-between">

            {/* ==================== About Image ============ */}
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] order-2 lg:order-1">
                <img src={img} alt="" className="" />
                <div className="absolute w-48 md:w-80 z-20 bottom-4 right-[-30%] md:right-[-7%] lg:right-[12%]">
                    <img src={card} alt="" />
                </div>
            </div>

              {/* ==================== About Content ============ */}
            <div className="relative lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ">
                <h2 className="heading">Proud to be one of the nations best</h2>

                <p className="text-para text-justify">
                    For 30 years U.S News 6 World has recognized us as one of the best publics hospitals in the nations #1 in Taxed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusamus quisquam quae repudiandae illum laudantium numquam omnis minima qui ut.
                </p>
                <p className="text-para text-justify">
                    For 30 years U.S News 6 World has recognized us as one of the best publics hospitals in the nations #1 in Taxed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusamus quisquam quae repudiandae illum laudantium numquam omnis minima qui ut.
                </p>

                <button className="button">Learn More</button>
            </div>
        </div>
    </div>
  )
}

export default
 About