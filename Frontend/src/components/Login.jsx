import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user || res.data)); // 🔥 missing part
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const signupFrom = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true });

      dispatch(addUser(res.data.data))
      return navigate("/profile");
    }
    catch (error) {
      console.log(error.message || "Something went Wrong")
    }
  }
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="card w-96 bg-green-400 shadow-xl align-middle justify-center ">
        <div className="card-body items-start">

          <h2 className="text-gray-700 justify-center text-3xl">{isLoggedIn ? "Login" : "Sign Up"}</h2>

          {/* Email */}
          {!isLoggedIn && (
            <>
              <div className="form-control">
                <label className="label p-0 mb-1 justify-start items-start w-full">
                  <span className="label-text text-sm w-full text-left">
                    First Name
                  </span>
                </label>

                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter First Name"
                  className="input input-warning w-full h-11 rounded-lg"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label p-0 mb-1 justify-start items-start w-full">
                  <span className="label-text text-sm w-full text-left">
                    Last Name
                  </span>
                </label>

                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter Last Name"
                  className="input input-warning w-full h-11 rounded-lg"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-control">
            <label className="label p-0 mb-1 justify-start items-start w-full">
              <span className="label-text text-sm w-full text-left">
                Email
              </span>
            </label>

            <input
              type="email"
              value={email}
              placeholder="Enter email"
              className="input input-warning w-full h-11 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label p-0 mb-1 justify-start items-start w-full">
              <span className="label-text text-sm  w-full text-left">
                Password
              </span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
             className="input input-warning w-full h-11 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <p className='text-red-800 text-xl'>{error}</p>
          <div className="form-control mt-4" >
            <button className="btn btn-primary bg-blue-400 w-20" onClick={isLoggedIn ? handleLogin : signupFrom}>{isLoggedIn ? "Login" : "Sign Up"}</button>
          </div>
          <p
            className="cursor-pointer text-purple-400-300 hover:text-gray-600 font-semibold"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>

  )
}

export default Login