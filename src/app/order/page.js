"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const Order = () => {

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
    console.log(formData)
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className='min-h-screen max-w-4xl mx-auto p-6'>

      <h1 className='font-bold text-2xl mb-6'>Order</h1>

      <div className='border rounded-lg p-4 mb-6 shadow-sm'>
        <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
        <div className='flex justify-between text-sm mb-2'>
          <span>Subtotal</span>
          <span>$ {total.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-sm mb-2'>
          <span>Shipping</span>
          <span>$10</span> 
        </div>
        <div className='flex justify-between text-base font-bold'>
          <span>Total</span>
          <span>$ {finalTotal.toFixed(2)}</span> 
        </div>
      </div>

      <div className='border rounded-lg p-4 mb-6 shadow-sm'>
        <h2 className='text-lg font-semibold mb-3'>Delivery Address</h2>
        <form className='flex flex-col gap-3 text-sm mb-2' onSubmit={handleSubmit}>
          <input 
          className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500' 
          placeholder='Name' 
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          >
          </input>
          <input 
          className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500' 
          placeholder='Locality'
          name='address'
          type='text'
          value={formData.address}
          onChange={handleChange}
          >
            
          </input>
          <input 
          className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500' 
          placeholder='Pincode' 
          type='text'
          name='pincode'
          value={formData.pincode}
          onChange={handleChange}
          >
          </input>
          <input 
          className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500' 
          placeholder='Phone No' 
          type='text'
          name='phoneNo'
          value={formData.phoneNo}
          onChange={handleChange}
          ></input>

          <button 
           className={`w-full py-2 border rounded-lg text-white ${isFormValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
          type='submit'
          disabled={!isFormValid}
          >{isFormValid ? "Proceed To Pay" : "Enter Delivery Details"}</button>
        </form>
        
      </div>

    </div>
  )
}

export default Order