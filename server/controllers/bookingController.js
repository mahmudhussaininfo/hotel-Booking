import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import sendMail from "../utils/mail.js";
import { sendSms } from "../utils/sms.js";

// check availability room
export const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
}) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: {
        $lte: checkOutDate,
      },
      checkOutDate: {
        $gte: checkInDate,
      },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

export const checkAvailabilityApi = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    res.status(200).json({ success: true, isAvailable, message: "Available" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// creat booking
export const createBooking = async (req, res) => {
  try {
    const user = req.user._id;
    const { checkInDate, checkOutDate, room, guests } = req.body;

    // check romm is available or not
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Room is not available" });
    }

    // total price for room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    // calculate total based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24)); // in days
    totalPrice = totalPrice * nights;

    // crate booking
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      totalPrice,
      guests: Number(guests),
      paymentMethod: "Pay At Hotel",
    });

    // send sms to user
    const sms = await sendSms(
      "+8801623611233",
      `Your booking is confirmed for ${roomData.hotel.name}. Check-in: ${checkInDate}, Check-out: ${checkOutDate}. Total Price: $${totalPrice}.`
    );

    console.log(sms);

    //send mail to user
    const mail = await sendMail(
      req.user.email,
      "Hotel Booking",
      `  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background: #4CAF50; color: white; padding: 20px; text-align: center;">
            <h1>Welcome to Hotel Booking</h1>
        </div>
        <div style="padding: 30px;">
            <p>Hello <strong>${req.user.username}</strong>,</p>
            <p>Welcome to <strong>Hotel Booking</strong>! Your Booking has been booked successfully.</p>
            <p><strong>Here are your Booking Information:</strong></p>
            <ul>
            <li><strong>Booking ID:</strong> ${booking._id}</li>
            <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
            <li><strong>Location:</strong> ${roomData.hotel.address}</li>
            <li><strong>Check In Date:</strong> ${booking.checkInDate.toDateString()}</li>
            <li><strong>Check Out Date:</strong> ${booking.checkOutDate.toDateString()}</li>
            <li><strong>Total Price:</strong> ${booking.totalPrice}</li>
        
            </ul>
            <p>Please keep this information secure.</p>
            <br/>
            <p>Regards,<br/>Hotel Booking Mr. Mamu 😊</p>
        </div>
        </div>
    </div>`
    );

    res
      .status(200)
      .json({ success: true, message: "Booking created", booking, mail, sms });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user booking
export const getUsersBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user }).populate("room hotel");
    res
      .status(200)
      .json({ success: true, message: "User Bookings fetched", bookings });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get hotel booking
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel not found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id }).populate(
      "room hotel"
    );

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, curr) => acc + curr.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      message: "Hotel Bookings fetched",
      dashboardData: {
        bookings,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// booking update for paid
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user._id;

    const updateBooking = await Booking.findByIdAndUpdate(
      id,
      { isPaid: true },
      {
        new: true,
      }
    );

    if (!updateBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Booking is Paid", updateBooking });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
