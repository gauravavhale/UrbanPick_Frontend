"use client"
import Order from "@/Component/Order/Order"
import { Suspense } from "react";

const OrderPage = () => {
  return (
    <Suspense fallback={<div>Loading order...</div>}>
      <Order />
    </Suspense>
  )
}

export default OrderPage