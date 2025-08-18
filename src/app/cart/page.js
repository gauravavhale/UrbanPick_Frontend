"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const cartProducts = useSelector((state) => state.appReducer.cart) || [];
  const totalAmount = cartProducts.reduce((total, item) => total + item.price, 0);
  const dispatch = useDispatch()

  const removeItem=(id)=>{
    dispatch({type:'REMOVE_FROM_CART', payload:id})
  }


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
                    <p className="text-gray-700 font-medium mt-1">${typeof product?.price === "number" ? product.price.toFixed(2) : "0.00"}</p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">
                      Qty: 1
                    </span>
                    <button onClick={()=>removeItem(product.id)} className="text-red-500 hover:underline text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount Section */}
            <div className="mt-8 bg-white shadow-lg rounded-xl p-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-green-600">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
