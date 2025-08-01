const { Booking } = require("../model/Booking.model");
const {Car} = require("../model/car.model"); 
// Function to Check Availability of Car for a given Date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
    });
    return bookings.length === 0;
};

const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;
        // fetch all available cars for the given location
        const cars = await Car.find({ location, isAvaliable: true });
        // check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(
                car._id,
                pickupDate,
                returnDate
            );
            return { ...car._doc, isAvailable: isAvailable };
        });

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter((car) => car.isAvailable === true);
        res.json({ success: true, availableCars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;
        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable)
            return res.json({ success: false, message: "Car is not available" });

        const carData = await Car.findById(car);
        if (!carData) return res.json({ success: false, message: "Car not found" });
        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noofDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noofDays;

        await Booking.create({
            car,
            user: _id,
            owner: carData.owner,
            pickupDate,
            returnDate,
            price,
        });

        res.json({ success: true, message: "Booking created successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id })
            .populate("car")
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== "owner")
            return res.json({ success: false, message: "Unauthorized" });
        const bookings = await Booking.find({ owner: req.user._id })
            .populate("car user")
            .select("-user.password")
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;
        const booking = await Booking.findById(bookingId);
        if (booking.owner.toString() !== _id.toString())
            return res.json({ success: false, message: "Unauthorized" });
        booking.status = status;
        await booking.save();
        res.json({ success: true, message: "Booking status updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

module.exports = { checkAvailabilityOfCar, createBooking, createBooking,    
    getUserBookings, getOwnerBookings, changeBookingStatus };
