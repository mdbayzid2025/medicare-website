import moment from 'moment'
import React from 'react'

const DoctorAppointment = ({user}) => {
  console.log(user.appointments)
  return (
    <div>DoctorAppointment
    <div className="relative overflow-x-auto w-full">
    <table className="w-full border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 text-center py-3">
                    Profile
                </th>
                <th scope="col" className="px-3   py-3">
                    Name
                </th>
                <th scope="col" className="px-3  py-3">
                    Gender
                </th>
                <th scope="col" className="px-3  py-3">
                    Appoint. Date
                </th>
                <th scope="col" className="px-3  py-3">
                  Appoint. Time
                </th>               
                <th scope="col" className="px-3  py-3">
                  Status
                </th>               
            </tr>
        </thead>
        <tbody>
        { user?.appointments && user?.appointments.map((data, index)=>  
         <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-2 px-2">
                  <div className=' h-20'>
                    <img src={data.user.photo} className="object-fill h-full w-full mx-auto" alt="Apple Watch"/>

                  </div>
                </td>
                <td className="px-3 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                    {data.user.name} <br />
                    {data.user.email}
                    
                </td>
                <td className="px-3 ">
                  {data.user.gender}
                </td>
                <td className="px-3 text-center ">
                    {data.appointmentDate}
                </td>
                <td className="px-3 ">
                {moment(data.time, "HH:mm").format("hh:mm A")}
                </td>
                <td className="px-3 ">
                Pending
                </td>
            </tr>)}
          
        </tbody>
    </table>
    {/* <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">${cart?.cartTotalAmount.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">${(cart?.cartTotalAmount * 0).toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">${(cart?.cartTotalAmount * 0 + cart?.cartTotalAmount).toFixed(2)}</p>
      </div>   */}
</div>
    </div>
  )
}

export default DoctorAppointment