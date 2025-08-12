"use client"
import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { ProductCard } from '@/Component/Card/Card'

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getData()
  },[])
  
  const getData=async()=>{
    const response = await axios.get('https://dummyjson.com/products')
    setProducts(response.data.products)
  }

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[100vh]">
      <ProductCard Products={products} />
    </div>
  )
}

export default App