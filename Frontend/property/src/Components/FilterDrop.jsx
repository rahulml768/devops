import React, { useState } from 'react';

// drop down category componenet
const FilterDrop = ({ property, setProperty }) => {
  const [category] = useState(["Apartment", "Villa", "Studio"]);

  return (
    <div>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={property.category}
        onChange={(e) =>
          setProperty({ ...property, category: e.target.value })
        }
      >
        <option value="">Select a category</option>
        {category.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDrop;
