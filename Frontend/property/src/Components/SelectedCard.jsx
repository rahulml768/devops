import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../Api/Api.jsx';
import "./PropertyCard.css"; 

const SelectedCard = () => {
  const { id } = useParams();
  console.log(id);

  // get the data of selected card
  const handleSelectcard = async () => {
    const res = await api.get(`/property/${id}`);
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: handleSelectcard,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="property-card">
      <h3 className="card-title">{data.title}</h3>
      <p className="card-desc line-clamp" title={data.description} >{data.description}</p>
      <p className="card-price">₹{data.price}</p>
      <p className="card-category"><strong>Category:</strong> {data.category}</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default SelectedCard;
