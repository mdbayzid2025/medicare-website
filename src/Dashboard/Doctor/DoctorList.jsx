import { useGetDoctorsQuery } from 'features/doctor/doctorApiSlice'
import React from 'react'


const DoctorList = () => {

    const {data} = useGetDoctorsQuery()
    console.log(data)
  return (
    <div className="container">
        <h1 className="heading text-center">Doctors List</h1>

        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Profile Photo
                </th>
                <th scope="col" className="px-6 py-3">
                    Doctor Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {data.data && data.data.map((doctor, index)=> <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <figure className="w-16 h-16">
                    <img src={doctor.photo} alt="profile" className="w-full" />
                    </figure>
                </th>
                <td className="px-6 py-4">
                {doctor.name}
                </td>
                <td className="px-6 py-4">
                    {doctor.email}
                </td>
                <td className="px-6 py-4">
                    {doctor.isApproved}
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-transparent border-none p-0 cursor-pointer">Edit</button>
                </td>
            </tr>)}
                  
        </tbody>
    </table>
</div>

    </div>
  )
}

export default DoctorList