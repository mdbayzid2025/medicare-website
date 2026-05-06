import React, { useEffect, useState } from 'react'
import star from '../../assets/images/Star.png'
import { BsArrowRight } from 'react-icons/bs'
import { Link, useSearchParams } from 'react-router-dom'
import Testimonial from '../Home/Testimonial'
import Loader from 'component/Loader'
import { useGetDoctorsQuery } from 'features/doctor/doctorApiSlice'

const Doctors = () => {
  const [queryParams] = useSearchParams()
  const { data, isError, isLoading } = useGetDoctorsQuery()
  const [doctors, setDoctors] = useState(null)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    if (data) {
      localStorage.setItem("doctors", JSON.stringify(data.data))
      const filterDoctor = data.data.filter(
        doctor => doctor?.name?.toLowerCase().includes(searchInput.toLowerCase())
          || doctor?.specialization?.toLowerCase().includes(searchInput.toLowerCase())
      )
      setDoctors(filterDoctor)
    }
    if (queryParams.get("category")) {
      setSearchInput(queryParams.get("category"))
    }
  }, [searchInput, data, queryParams])



  console.log(queryParams.get("category"))
  return (
    <div className="flex-1 ">
      {(isError || isLoading) ? <> {isError ? <p className="text-center">Something Went Error</p>
        : <div className=' text-center pt-[10%]'> <Loader /> </div>}    </> :
        <>
          <section className="py-10 bg-[#fff9ea]">
            <div className="container text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-1">Find a doctor</h2>
              <div className="w-full md:max-w-[500px]  mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                <input type="search" onChange={(e) => setSearchInput(e.target.value)}
                  className="py-3 pl-4 pr-2 bg-transparent w-full text-slate-500  focus:outline-none cursor-pointer placeholder:text-textColor"
                  placeholder="Find doctor "
                  value={searchInput}
                  name="" />
                <button
                  className="py-3 px-8 bg-[var(--primary-color)] text-white mt-0 rounded-none rounded-r-md">
                  Search
                </button>

              </div>
            </div>
          </section>

          <section className='container mb-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
              {doctors && doctors.map((doctor, index) =>
                <div key={index} className="mx-auto rounded-lg bg-slate-100 w-full h-full flex flex-col  shadow-sm">
                  <div className='  '>
                    <img src={doctor?.photo} alt="" className="w-full h-[280px] object-cover rounded-t-lg" />
                  </div>
                  <div className='rounded-b-lg p-4 flex flex-col justify-between flex-1'>
                    <div>
                      <h3 className="text-2xl mb-1 font-bold">{doctor?.name}</h3>
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-irisBlueColor/20 font-bold text-[var(text-color)] text-lg">{doctor?.specialization}</span>
                        <div className="flex items-center gap-1">
                          <img src={star} alt="" />
                          <span className="font-semibold">{doctor?.avgRating}</span>
                          <span className="text-textColor">({doctor?.totalRating})</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/doctors/${doctor._id}`} > <div className="flex items-center justify-between mt-4 bg-[var(--primary-color)] p-2 rounded-md !text-white">
                      <p className="text-textColor">{doctor?.experience[0]?.hospital ?? 'Central Hospital'}</p>
                      <span className="flex items-center justify-center text-lg border-2 border-slate-400 hover:border-none hover:bg-[var(--primary-color)] hover:text-white w-10 h-10 rounded-full">
                        <BsArrowRight />
                      </span>
                    </div>
                    </Link>
                  </div>
                </div>)}
            </div>
          </section>
          {/* ===================== Petient Testimonial   ======================== */}
          <Testimonial />
        </>}
    </div>)
}

export default Doctors