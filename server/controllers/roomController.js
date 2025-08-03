import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

import { cloudMultipleUpload } from "../utils/cloudinary.js";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel not found" });
    }

    // upload imgs to cloudinary
    const uploadImg = await cloudMultipleUpload(req.files);

    const newHotel = await Room.create({
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: JSON.parse(amenities),
      images: uploadImg,
      hotel: hotel._id,
    });

    res
      .status(200)
      .json({ success: true, message: "Room created successfully", newHotel });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "image",
      },
    });

    res.status(200).json({ success: true, message: "Rooms fetched", rooms });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );

    res
      .status(200)
      .json({ success: true, message: "Rooms fetched for owner", rooms });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res
      .status(200)
      .json({ success: true, message: "Room availability toggled" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
