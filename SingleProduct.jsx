import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from "../assets/Loading4.webm";
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState("");
  const {addToCart} = useCart()

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
      const product = res.data; // ✅ API returns the object directly
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  return (
    <>
      {singleProduct ? (
        <div className='px-4 pb-4 md:px-0'>
          <Breadcrums title={singleProduct.title} />
          <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='w-full'>
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className='rounded-2xl w-300px object-cover px-20'
              />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{SingleProduct.title}</h1>
              <p className='text-gray-700 mb-4'>{singleProduct.description}</p>
              <p className='text-lg font-semibold'>${singleProduct.price}</p>

                

              <div className='flex gap-4 mt-4'>
                <button onClick={()=>addToCart(singleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'>
                    <IoCartOutline className='w-6 h-6'/>
                    Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
