"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Order = () => {

  const router = useRouter()
  const searchParams = useSearchParams();
  const totalParams = searchParams.get("total");

  const total = totalParams ? parseFloat(totalParams) : 0;
  
  const shipping = 10
  const finalTotal = total + shipping

  const [formData,setFormData] = useState({
    name:"",
    address:"",
    pincode:"",
    phoneNo:""
  })

  const handleChange=(e)=>{
    const {name, value} = e.target;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null
    if(!user){
      toast.error('Login to Order');
      return;
    }

    if(user.email && user.fullName){
      router.push(`/payments?total=${finalTotal}`)
    }else{
      toast.error('Login to Order')
    }
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex justify-center items-start py-10 px-4'>

      <div className='w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-100'>

        {/* Page Heading */}
        <h1 className='font-bold text-3xl mb-8 text-center text-gray-800'>
          🛒 Place Your Order
        </h1>

        {/* Order Summary */}
        <div className='bg-gray-50 border rounded-xl p-6 mb-8 shadow-inner'>
          <h2 className='text-xl font-semibold mb-4 text-gray-700'>Order Summary</h2>
          <div className='flex justify-between text-sm mb-3 text-gray-600'>
            <span>Subtotal</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-sm mb-3 text-gray-600'>
            <span>Shipping</span>
            <span>$10</span> 
          </div>
          <div className='flex justify-between text-lg font-bold text-gray-800'>
            <span>Total</span>
            <span className='text-green-600'>$ {finalTotal.toFixed(2)}</span> 
          </div>
        </div>

        {/* Delivery Address */}
        <div className='bg-gray-50 border rounded-xl p-6 shadow-inner'>
          <h2 className='text-xl font-semibold mb-4 text-gray-700'>Delivery Address</h2>
          <form className='flex flex-col gap-4 text-sm' onSubmit={handleSubmit}>
            
            <input 
              className='border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition'
              placeholder='Full Name' 
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />

            <input 
              className='border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition' 
              placeholder='Locality / Address'
              name='address'
              type='text'
              value={formData.address}
              onChange={handleChange}
            />

            <input 
              className='border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition' 
              placeholder='Pincode' 
              type='text'
              name='pincode'
              value={formData.pincode}
              onChange={handleChange}
            />

            <input 
              className='border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition' 
              placeholder='Phone No' 
              type='text'
              name='phoneNo'
              value={formData.phoneNo}
              onChange={handleChange}
            />

            <button 
              className={`w-full py-3 rounded-lg text-white font-medium shadow-lg transition ${
                isFormValid
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              type='submit'
              disabled={!isFormValid}
            >
              {isFormValid ? "Proceed To Pay 💳" : "Enter Delivery Details ✏️"}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Order;
