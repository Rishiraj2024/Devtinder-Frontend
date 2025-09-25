import React from 'react'

const UserCardProfile = ({ user }) => {
  if (!user) return null;
  const { firstName, lastName, photoUrl, about } = user;

  return (
    <div className="card bg-base-200 w-60 shadow-md rounded-xl hover:shadow-lg transition">
      {/* Image */}
      <figure className="pt-4">
        <img
          className="w-58 h-98  object-cover"
          src={photoUrl || "/default.png"}
          alt={`${firstName} ${lastName}`}
        />
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg">{firstName} {lastName}</h2>
        <p className="text-sm text-gray-600">{about}</p>

        {/* Buttons */}
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-sm btn-outline btn-secondary">Ignore</button>
          <button className="btn btn-sm btn-primary">Interested</button>
        </div>
      </div>
    </div>
  )
}



export default UserCardProfile