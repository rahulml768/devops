import React from "react";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { api } from "../Api/Api.jsx";
import {Link } from "react-router-dom";
import "./PropertyCard.css";
import { useSelector } from "react-redux";

// property card
export const PropertyCard = ({ data, queryKey, handleUpdate }) => {
  const queryClient = useQueryClient();
  // use reduc toolkit to get the category that was stored in store
  const selectedCategory = useSelector((state) => state.propCategory);
//  filter data according to category
        const filterData = selectedCategory == "" ? data 
         : data?.filter((item)=>{
          return item.category == selectedCategory
 });

//  method to delete the property using tanstack query use muattaion
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/property/${id}`);
      return res.data;
    },
    onSuccess: (data, id) => {
      alert(data.message || "Property deleted successfully!");
      // refecth the data using setQueryData after delete oroperty
      queryClient.setQueryData(queryKey, (curData) =>
        curData?.filter((post) => post._id !== id)
      );
    },
    onError: (err) => {
      console.error(err);
      alert("Something went wrong!");
    },
  });
  
  //  no property 
  if (!filterData?.length) {
    return <p className="text-center">No properties found.</p>;
       }

  return (
    <div className="card-grid">
      {filterData.map((item) => (
      
        <div key={item._id} 
        className="property-card"
        >
         <Link to={`/property/${item._id}`} className="card-link">
         <h3 className="card-title">{item.title}</h3>
         </Link>        
          <p className="card-desc line-clamp" title={item.description} >{item.description}</p>
          <p className="card-price"><strong>Price:</strong> ₹{item.price}</p>
          <p className="card-category"><strong>Category:</strong> {item.category}</p>
          <div className="card-actions">
            <button
              onClick={() => deleteMutation.mutate(item._id)}
              className="btn btn-delete"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(item)}
              className="btn btn-update"
            >
              Update
            </button>
          </div>
        </div>
      
      ))}
    </div>
  );
};
