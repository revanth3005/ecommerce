import React from 'react';
import { useParams } from 'react-router-dom';
const DetailedProduct = () => {
    const {id}=useParams()
  return (
    <div>
      <h1>DetailedProduct</h1>
    </div>
  );
}

export default DetailedProduct;
