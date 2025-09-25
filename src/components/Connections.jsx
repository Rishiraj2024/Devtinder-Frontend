import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      // Make sure it's an array
      dispatch(addConnections(res.data.connectionRequest || []));
      console.log(res.data.connectionRequest);
    } catch (err) {
      console.error(err?.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return null;
  if (connection.length === 0) return <h1>No connection found</h1>;

  return (
   <div className="flex flex-col items-center my-10">
  <h1 className="font-bold text-2xl mb-6">Connections</h1>
  {connection.map((c, index) => {
    const { firstName, lastName, photoUrl, about } = c.fromUserId;

    return (
      <div
        key={index}
        className="flex flex-row items-center border rounded-lg border-gray-300 shadow-sm p-4 mb-4 w-96 hover:shadow-md transition-shadow"
      >
        {/* Image */}
        <img
          className="w-20 h-20 rounded-full object-cover mr-4"
          src={photoUrl || "/default.png"}
          alt={`${firstName} ${lastName}`}
        />

        {/* Text */}
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>
          <p className="text-gray-600 text-sm mt-1">{about}</p>
          <div>
            
          </div>
        </div>
        
      </div>
    );
  })}
</div>

  );
};

export default Connections;
