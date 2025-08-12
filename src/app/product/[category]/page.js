"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductCard } from '@/Component/Card/Card'
import axios from 'axios'

const Product = () => {
  const [products, setProducts] = useState([]) // array because API returns products list
  const { category } = useParams()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
        setProducts(response.data.products) // use .products because API wraps it
        console.log(response.data.products) // log updated data
      } catch (error) {
        console.error("Error fetching products:", error)
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
