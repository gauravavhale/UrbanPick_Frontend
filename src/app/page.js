"use client"
import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { ProductCard } from '@/Component/Card/Card'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { toast} from "react-toastify";
import { Loader } from '@/Component/Loader/Loader';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/get-products/products`);
        setProducts(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error || "Something went wrong on the server.");
        } else if (error.request) {
          toast.error("Cannot reach server. Please try again later.");
        } else {
          toast.error("Unexpected error. Please try again.");
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
 
  if(loading){
    return <Loader/>
  }

  if (!loading && products.length === 0) {
  return (
    <div className="flex items-center justify-center w-full h-screen text-gray-500 font-semibold">
      No Products Found
    </div>
  );
  }

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[100vh]">
      <ProductCard Products={products} />
    </div>
  )
}

export default App