import React from 'react'

const Category = () => {
  return (
    <div className="flex justify-start p-4 text-sm">
      <div className="bg-black bg-opacity-25 text-white font-semibold p-2 mr-2 rounded-lg cursor-pointer hover:bg-opacity-50">
        All
      </div>
      <div className="bg-black bg-opacity-25 text-white font-semibold p-2 mr-2 rounded-lg cursor-pointer hover:bg-opacity-50">
        Mental Therapy
      </div>
      <div className="bg-black bg-opacity-25 text-white font-semibold p-2 mr-2 rounded-lg cursor-pointer hover:bg-opacity-50">
        Adventure
      </div>
      <div className="bg-black bg-opacity-25 text-white font-semibold p-2 rounded-lg cursor-pointer hover:bg-opacity-50">
        Cutie Pets
      </div>
  </div>
  )
}

export default Category