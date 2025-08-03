import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "USD";
  const BaseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [searchCity, setSearchCity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roomData, setRoomData] = useState([]);

  // fetch user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setIsOwner(data.role === "owner");
        setSearchCity(data.recentSearchCities);
      } else {
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // fetch rooms
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(`/room/rooms`);

      if (data.success) {
        setRoomData(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    user,
    getToken,
    isOwner,
    setIsOwner,
    searchCity,
    setSearchCity,
    showModal,
    setShowModal,
    navigate,
    BaseURL,
    currency,
    roomData,
  };
  return <AppContext value={value}>{children}</AppContext>;
};

export default AppProvider;
