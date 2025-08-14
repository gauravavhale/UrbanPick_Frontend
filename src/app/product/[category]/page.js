"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductCard } from '@/Component/Card/Card'
import axios from 'axios'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Product = () => {
  const [products, setProducts] = useState([]) 
  const { category } = useParams()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-products/products-by-category/${category}`)
        setProducts(response.data)
      } catch (err) {
            if (err.response) {
                // Backend responded with a status code not in 200-299
                setError(err.response.data.error || 'Failed to fetch products');
            } else if (err.request) {
                // Request made but no response received
                setError('No response from server. Please try again later.');
            } else {
                // Something else happened
                setError('Unexpected error occurred');
            }
            setProducts([]);
        }
    }

    if (category) {
      getProducts()
    }
  }, [category])

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[100vh]">
      <ProductCard Products={products} />
    </div>
  )
}

export default Product
