import React, { useState } from 'react';
import FilterDrop from './FilterDrop';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../Api/Api.jsx';
import {PropertyCard} from './PropertyCard';
import './PropertyForm.css';
import {useDispatch}  from "react-redux"
import { filterproperty } from '../Features/filter/FilterSlice';


// main page
const PropertyForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  // method to handle update after clicking on card update
  const handleUpdate = (item) => {
    setProperty({
      id: item._id || "",
      title: item.title || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || ""
    });
    setEdit(true);
  };

  // update method to update the card
  const updateMutuate = useMutation({
    mutationFn: async (id) => {
      const res = await api.put(`/property/${id}`, property);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["properties"], (oldData) => {
        return oldData.map((item) =>
          item._id === data.property._id ? data.property : item
        );
      });
      setProperty({ title: "", description: "", price: "", category: "" });
      setEdit(false);
    }
  });

  // get all properties from the database
  const getProperties = async () => {
    try {
      const res = await api.get("/property");
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // method to addd the property
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/property", property);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["properties"], (oldData = []) => [
        ...oldData,
        data.property
      ]);
      setProperty({ title: "", description: "", price: "", category: "" });
    },
    onError: (err) => {
      console.error(err);
      alert("Something went wrong!");
    }
  });

  // method to get the all details of property from server
  const {
    data: properties = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties
  });

  // handling form
  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (
      property.title.trim() &&
      property.description.trim() &&
      property.price.trim() &&
      property.category.trim()
    ) {

      // use native event to check wheather it is update or add
      const action = e.nativeEvent.submitter.value;
      if (action === "Add") {
        mutation.mutate();
      } else {
        updateMutuate.mutate(property.id);
      }
    } else {
      alert("Please fill all the fields.");
    }
  };

  // loading
  if (isLoading) return <p className="text-center">Loading properties...</p>;
  
// ui
  return (
    <>
      <form onSubmit={handleFormSubmission} className="property-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter the title of property"
            value={property.title}
            onChange={(e) => setProperty({ ...property, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter the description"
            value={property.description}
            onChange={(e) => setProperty({ ...property, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter the price"
            value={property.price}
            onChange={(e) => setProperty({ ...property, price: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <FilterDrop property={property} setProperty={setProperty} />
        </div>

        <button type="submit" value={isEdit ? "Update" : "Add"} className="submit-btn">
          {isEdit ? "Update" : "Add"}
        </button>
        <button
        type="button"
          className="filter-btn"
            onClick={() => dispatch(filterproperty(property.category))}>                
                   Filter
                </button>
      </form>

      <div className="property-list">
        <PropertyCard
          data={properties}
          queryKey={["properties"]}
          property={property}
          setProperty={setProperty}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default PropertyForm;
