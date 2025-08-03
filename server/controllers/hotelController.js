import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// regiter hotel
export const regiserHotel = async (req, res) => {
  try {
    const { name, city, address, contact } = req.body;
    const owner = req.user._id;
    const hotelExist = await Hotel.findOne({ owner });

    if (hotelExist) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel already exist" });
    }

    const hotel = await Hotel.create({ name, city, address, contact, owner });

    await User.findByIdAndUpdate(owner, {
      role: "owner",
    });
    res.status(200).json({ success: true, message: "Hotel created", hotel });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
