"use client"
import React from 'react';
import PaymentPage from '@/Component/Payments/Payments';
import { Suspense } from 'react';

const Payment = () => {
  return (
    <Suspense fallback={<div>Loading Payment...</div>}>
      <PaymentPage/>
    </Suspense>
  )
}

export default Payment