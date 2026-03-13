import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {

  console.log("Body component loaded");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  useEffect(() => {
  if (!userData) {
    fetchUser();
  }
}, []);

const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "/profile/view", {
      withCredentials: true
    });

    dispatch(addUser(res.data.user));

  } catch (error) {
    navigate("/login");
  }
};

 useEffect(() => {
  fetchUser();
}, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;