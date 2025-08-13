"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.replace("/admin-login"); 
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null; 
  }

  return (
    <div className="flex">
      <ToastContainer theme="dark" />
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
          <h3 className="font-medium">Admin Panel</h3>
          <Image
  src={'/author_img.png'}
  width={40}
  height={40}
  alt="Author"
  className="rounded-full border border-gray-300 shadow-md object-cover transition-transform duration-300 hover:scale-110"
/>

        </div>
        {children}
      </div>
    </div>
  );
}
