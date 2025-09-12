"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const Cart = () => {
  const cartProducts = useSelector((state) => state.appReducer.cart) || [];
  const totalAmount = cartProducts.reduce((total, item) => total + item.price, 0);
  const dispatch = useDispatch()
  const [parsedUser, setParsedUser] = useState(null)

  const removeItem=(id)=>{
    toast.success('Item Removed')
    dispatch({type:'REMOVE_FROM_CART', payload:id})
  }

  useEffect(()=>{

    const user = typeof window !== "undefined" ? localStorage.getItem('user') : null;
    if(user){
      try{
        setParsedUser(JSON.parse(user));
      }catch{
        setParsedUser(null)
      }
    } else {
      setParsedUser(null)
      toast.info('Login To Proceed');
    }

  },[])

  const handleProceed = (e) => {
    if (!parsedUser) {
      e.preventDefault(); // stop navigation
      toast.error("Login to Proceed");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartProducts.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cartProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-stretch justify-between bg-white shadow-md rounded-xl p-4 gap-6"
                >
                  {/* Product Image */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1 text-center md:text-left md:flex md:flex-col md:justify-center">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <p className="text-gray-700 font-medium mt-1">
                      ${typeof product?.price === "number" ? product.price.toFixed(2) : "0.00"}
                    </p>
                  </div>

                  {/* Extra Info & Remove */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                      Free Delivery
                    </span>
                    <button 
                      onClick={()=>removeItem(product.id)} 
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount Section */}
            <div className="mt-8 bg-white shadow-lg rounded-xl p-4 flex justify-around items-center">
              <div>
                <span className="text-lg font-semibold">Total: </span>
                <span className="text-xl font-bold text-green-600">
                ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div>
                <Link 
                href={`/order?total=${totalAmount.toFixed(2)}`} 
                onClick={handleProceed}
                className={`font-bold text-white px-2 py-1 rounded-sm ${parsedUser ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"} `}
                >Proceed To Order
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
