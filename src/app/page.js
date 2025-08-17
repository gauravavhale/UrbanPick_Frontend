"use client"
import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { ProductCard } from '@/Component/Card/Card'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getData()
  },[])
  
  const getData=async()=>{
    try{
      const response = await axios.get(`${apiUrl}/get-products/products`)
      setProducts(response.data)
    } catch (error) {
        if (error.response) {
            // Backend responded with an error status code
            console.error("Server Error:", error.response.status, error.response.data);
            alert(error.response.data.error || "Something went wrong on the server.");
        } else if (error.request) {
            // Request made but no response
            console.error("No response from server:", error.request);
            alert("Cannot reach server. Please try again later.");
        } else {
            // Error before request was made
            console.error("Error setting up request:", error.message);
            alert("Unexpected error. Please try again.");
        }
        setProducts([]); // clear products if error
    }
  }

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[100vh]">
      <ProductCard Products={products} />
    </div>
  )
}

export default App