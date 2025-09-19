"use client"
import { Footer } from "@/Component/Footer/Footer";
import { usePathname } from "next/navigation";
import React from 'react'

const FooterWrapper = () => {

  const pathname = usePathname()
  const footerPages = ["/","/payments"]
  const showFooter = footerPages.includes(pathname)

  return showFooter ? <Footer/> : null;
}

export default FooterWrapper;