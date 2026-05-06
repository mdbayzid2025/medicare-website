import moment from 'moment';

import { selectCurrentUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SidePanel = ({ doctor }) => {

  const user = useSelector(selectCurrentUser)
  const { id } = useParams()


  const makePayment = async (e) => {
    e.preventDefault()

    const form = e.target;
    const selectedDate = new Date(form.date.value);
    const currentDate = new Date();

    const selectedTime = form.bookingTime.value
    const startingTime = doctor?.availableTime.startingTime;
    const endingTime = doctor?.availableTime.endingTime;

    // Extract year, month, and day from both dates
    var currentYear = currentDate.getFullYear();
    var selectedYear = selectedDate.getFullYear();

    if (currentYear <= selectedYear) {
      if (startingTime <= selectedTime && endingTime >= selectedTime) {
        axios.post('https://medicare-server-ashy.vercel.app/api/v1/book-appointment', {
          // axios.post('http://localhost:3000/api/v1/book-appointment', {
          id,
          doctorId: doctor._id,
          userId: user._id,
          date: form.date.value,
          time: form.bookingTime.value,
        })
          .then(res => {
            window.location.replace(res.data.url)
          })
          .catch(error => {
            console.log(error);
          })
      }
      else {
        toast.error("select available time")
      }

    } else {
      toast.error("Select date from today")
    }


  }

  return (
    <div className="px-8 md:w-96 w-full md:p-5 rounded-md shadow-xl border border-solid py-14">
      <form onSubmit={makePayment}>
        <h1 className="text-3xl font-extrabold text-center text-[var(--heading-color)] mb-3">Book Appointment</h1>
        <hr className="bg-[var(--primary-color)] w-12 h-1 mx-auto mb-3" />
        <input type="text" className="w-full px-4 py-3 border text-lg first-letter:uppercase rounded-full mb-3" value={doctor?.specialization} />
        <input type="text" className="w-full px-4 py-3 border text-lg first-letter:uppercase rounded-full mb-3" value={doctor?.name} />
        <input type="text" className="w-full px-4 py-3 border text-lg first-letter:uppercase rounded-full mb-3" value={user?.name} />
        <input type="date" name='date' className="w-full px-4 py-3 border text-lg first-letter:uppercase rounded-full mb-3" placeholder="Appointment Date" />
        <input type="time" name='bookingTime' className="w-full px-4 py-3 border text-lg first-letter:uppercase rounded-full mb-1" placeholder="Appointment Time" />
        {!doctor?.availableTime?.startingTime ? <p className="text-center text-sm mb-2 text-red-700 font-semibold">{!doctor?.availableTime?.startingTime && "Doctor not available"}</p> :
          <p className="text-center text-sm mb-2 text-[var(--primary-color)]">Available from <span className="text-red-600 font-bold">{moment(doctor?.availableTime?.startingTime, "HH:mm").format("hh:mm A")}</span> to  <span className="text-red-600 font-bold">{moment(doctor?.availableTime?.endingTime, "HH:mm").format("hh:mm A")} </span> </p>}

        <button
          className={`${!doctor?.availableTime?.startingTime ? "bg-blue-400" : "bg-[var(--primary-color)]"} text-white rounded-full text-center w-full py-3 px-3 font-semibold text-[24px] md:text-lg cursor-pointer`}>Book Appointment</button>

      </form>
    </div>
  );
}

export default SidePanel