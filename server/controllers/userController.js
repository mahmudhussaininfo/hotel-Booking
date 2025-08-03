//get user
export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchCities = req.user.recentSearchCities;
    res.status(200).json({ success: true, role, recentSearchCities });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user recent search cities
export const storeRecentSearchCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;
    const user = await req.user;
    if (user.recentSearchCities.length < 3) {
      user.recentSearchCities.push(recentSearchCity);
    } else {
      user.recentSearchCities.shift();
      user.recentSearchCities.push(recentSearchCity);
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "city added",
      recentSearchCities: user.recentSearchCities,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
