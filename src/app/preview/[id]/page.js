"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { appStore } from '@/redux/store/store'

const Preview = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (id) getData()
    }, [id])

    const getData = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        )
    }

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        )
    }

    const addToCart=()=>{
        appStore.dispatch({type:'Cart_Products', payload:product})
    }

    if (!product) return <div className='min-h-[100vh]'><p className="text-center mt-10">Loading...</p></div>

    return (
        <div className="max-w-6xl mx-auto p-6 ">
            {/* Image Section */}
            <div className="relative w-full overflow-hidden rounded-xl shadow-xl bg-white border border-gray-200">
                <img
                    src={product.images[currentIndex]}
                    alt={product.title}
                    className="w-full h-96 object-contain bg-white p-4"
                />

                {product.images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
                        >
                            &#8592;
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
                        >
                            &#8594;
                        </button>
                    </>
                )}
            </div>

            {/* Product Details */}
            <div className="mt-6 bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800">{product.title}</h1>
                <p className="text-gray-600 mt-2">{product.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700">
                    <p><span className="font-semibold">Category:</span> {product.category}</p>
                    <p><span className="font-semibold">Brand:</span> {product.brand}</p>
                    <p className="text-green-600 font-bold text-lg">
                        Price: ${product.price}
                    </p>
                    <p className="text-red-500">
                        Discount: {product.discountPercentage}%
                    </p>
                    <p><span className="font-semibold">Rating:</span> ⭐ {product.rating}</p>
                    <p><span className="font-semibold">Stock:</span> {product.stock}</p>
                    <p className={product.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-500"}>
                        <span className="font-semibold">Availability:</span> {product.availabilityStatus}
                    </p>
                    <p><span className="font-semibold">Shipping:</span> {product.shippingInformation}</p>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-8">
                    <button
                    onClick={addToCart}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg shadow-md transition transform hover:scale-105"
                    >
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Preview
