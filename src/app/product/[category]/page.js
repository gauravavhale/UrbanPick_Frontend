"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductCard } from '@/Component/Card/Card'
import axios from 'axios'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { Loader } from '@/Component/Loader/Loader'

const Product = () => {
  const [products, setProducts] = useState([]) 
  const [loading, setLoading] = useState(true)
  const { category } = useParams()

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${apiUrl}/get-products/products-by-category/${category}`
        );
        setProducts(response.data);
      } catch (err) {
        if (err.response) {
          console.error(err.response.data.error || 'Failed to fetch products');
        } else if (err.request) {
          console.error('No response from server. Please try again later.');
        } else {
          console.error('Unexpected error occurred:', err.message);
        }
        setProducts([]); // clear products on error
      } finally {
        setLoading(false)
      }
    }
    if (category) {
      getProducts()
    }
  }, [category])

  if (loading){
    return <Loader/>
  }
  
  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[100vh]">
      <ProductCard Products={products} />
    </div>
  )
}

export default Product
