import React from 'react'
import { useCart } from '../context/CartContext' // ✅ import useCart
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"

const Cart = () => {
  const { cartItem ,updatedQuantity, deleteItem } = useCart() // get cart items from context
  const navigate = useNavigate()
  console.log(cartItem)

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5'>
      {cartItem.length > 0 ? (
        <div>
          <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>
          <div className='mt-10'>
            {cartItem.map((item, index) => {
              return (
                <div key={index} className='bg-gray-100 rounded-md flex items-center justify-between mt-3 w-full'>
                  <div className='flex items-center gap-4'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md' />
                  
                  <div>
                    <h2 className='w-[300px] line-clamp-2'>{item.title}</h2>
                    <p className='text-red-500 font-semibold text-lg'>${item.price}</p>
                  </div>
                </div>
                <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-x1'>
                  <button onClick={()=> updatedQuantity(cartItem, item.id,"decrease")} className='cursor-pointer'>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={()=> updatedQuantity(cartItem, item.id,"increase")} className='cursor-pointer'>+</button>
                </div>
                <span onClick={()=>deleteItem(item.id)}>
                  <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer'/>
                </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="" className='w-[400px]'/>
          <button onClick={()=>navigate('/products')} className='bg-red-500 text-white px-3 rounded-md cursor-pointer'>Continue Shopping</button>
        </div>
      )}
    </div>
  )
}

export default Cart
