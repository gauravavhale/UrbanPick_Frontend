import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const [user,setUser] = useState(null)

  const searchParams = useSearchParams();
  const totalParam = searchParams.get("total");
  const total = totalParam ? parseFloat(totalParam) : 0;
  
  useEffect(()=>{
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
    } else{
      toast.error('Login to Make Order')
    }
  },[])

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center w-full max-w-md border border-gray-100">
        
        {/* Greeting */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hey <span className="text-blue-600">{user?.fullName || "Guest"}</span> 👋
        </h2>
        
        {/* QR Code */}
        <div className="p-4 bg-gray-50 rounded-xl shadow-inner flex flex-col items-center">
          <QRCodeCanvas
            value="https://portfolioo-gaurav-avhales-projects.vercel.app/"
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        <h6 className="mt-4 text-2xl font-bold text-green-600 text-center">
          ${total.toFixed(2)}
        </h6>
        </div>
        
        {/* Instructions */}
        <p className="text-center text-gray-600 mt-6 leading-relaxed">
          📲 Scan the QR code to make your payment <br />
          ✅ Wait for confirmation to place the order
        </p>

      </div>
    </div>
  );
};

export default PaymentPage;
