import axios from "axios";
import { removeUserRequest } from "../utils/requestSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const { firstName, lastName, _id, age, gender } = user;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-[400px] h-[300px] bg-base-300 rounded-2xl shadow-lg p-6 text-center mt-5">
        <div className="flex justify-center mb-4">
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="User Avatar"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          {firstName} {lastName}
        </h2>

        <p className="text-purple-500 mt-1 text-sm">
          Aspiring Web Developer
        </p>

        <h2 className="text-md font-medium text-gray-700">
          {age} • {gender}
        </h2>

        <div className="mt-4 flex gap-4 justify-center">
          <button
            className="w-[140px] py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            onClick={() => handleSendRequest("ignored")}
          >
            Ignore
          </button>

          <button
            className="w-[140px] py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            onClick={() => handleSendRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;