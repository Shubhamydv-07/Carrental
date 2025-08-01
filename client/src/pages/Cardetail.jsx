import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react'
const Cardetail = () => {

  const { id } = useParams();

  const { cars, currency, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()

  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      })
      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id])

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 x1:px-32 mt-16'>

      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="image" className='rotate-180 opacity-65' />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 1g:gap-12'>
        {/* Left: Car Image & Details */}
        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='lg:col-span-2'>
          <motion.img initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}

            src={car.image} alt="logo" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='space-y-6'>
            <div>
              <h1 className='text-3x1 font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg'>{car.category} - {car.year}</p>
            </div>
            <hr className='border-borderColor my-6' />



            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[{ icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location }].map(({ icon, text }) => (
                <motion.div initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}

                  key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt=" " className='h-5 mb-2' />
                  {text}
                </motion.div>
              ))}
            </div>



            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Descriptions</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear ViewMirror"].map((items) => (
                  <li key={items} className='flex items-center text-gray-500'>
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />{items}
                  </li>
                ))
                }
              </ul>
            </div>

          </motion.div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.form initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6,delay:0.3 }}

          onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center  justify-between text-2xl text-gray-800 
  font-semibold'>{currency} {car.pricePerDay}<span className='text-lg text-gray-400  font-normal'>per day</span></p>

          <hr className='border-borderColon my-6' />
          <div className='flex flex-col gap-2'>
            <label htmlFort="pickup-date" >Pickup Date</label>
            <input value={pickupDate} onChange={e => setPickupDate(e.target.value)}
              type="date" className=" pl-4 border-gray-300  border h-10 px-3 py-2 rounded-lg"
              required id="pickup-date" min={new Date().toISOString().split('T')[0]} />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFort="return-date" >Return Date</label>
            <input value={returnDate} onChange={e => setReturnDate(e.target.value)}
              type="date" className="border pl-4 border-borderColor h-10  px-3 py-2 rounded-lg"
              required id="pickup-date" min={new Date().toISOString().split('T')[0]} />
          </div>

          <button className='w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300'
            type="submit">
            Book Now
          </button>

          <p className="text-center text-sm">No credit required</p>
        </motion.form>
      </div>
    </div>
  ) : <Loader />;
}

export default Cardetail