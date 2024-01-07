import React, { useEffect, useState } from "react"
import Default from "../Layout/Default"
import { FormatRupiah } from "@arismun/format-rupiah";
import { CiShoppingCart } from "react-icons/ci";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import { router } from "@inertiajs/react";

export default function Product({ data, auth, message, cart_count }) {

  useEffect(() => {
    toast.success(message)
  }, [message])

  const handleCart = (product_id) => {
    router.post('/carts', {
      'product_id': product_id,
      'quantity': 1
    })
  }

  return (
    <Default cart_count={cart_count}>
      <div className="my-10 px-52 flex flex-col justify-center items-center">
        {message && (
          <Toaster />
        )}
        <div className="flex flex-wrap gap-5 justify-center rounded-xl">
          {/* ini bagian product */}
          {data.data.map((item, index) => (
            <div key={index} className="w-52 h-auto rounded-xl shadow-md ">
              <div className="bg-cover">
                <img src={item.image} alt="image_product" className="bg-cover h-56 rounded-t-xl" draggable="false" />
              </div>
              <div className="px-3 py-5 flex flex-col gap-1">
                <p className="line-clamp-2 text-xs font-sans">{item.name}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm">{<FormatRupiah value={item.price} />}</h3>
                    <p className="line-clamp-2 text-xs font-sans text-slate-500">{item.sold} terjual</p>
                  </div>
                  <div>
                    <button onClick={() => { handleCart(item.id) }} className="bg-primary text-white p-1 rounded-md w-full text-xs hover:cursor-pointer hover:scale-105 ease-in-out duration-150"><CiShoppingCart size={24} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* ini bagian pagination */}
        </div>
        <div className="flex w-full justify-end gap-5">
          {data.links.map((item, index) => (
            <div key={index}>
              {item.label === "&laquo; Previous" && (
                <a href={item.url} className="text-slate-500 hover:text-slate-800">
                  <GrFormPrevious size={24} className="text-slate-500 hover:text-slate-800" />
                </a>
              )}
              {item.label === "Next &raquo;" && (
                <a href={item.url} className="text-slate-500 hover:text-slate-800">
                  <GrFormNext size={24} className="text-slate-500 hover:text-slate-800" />
                </a>
              )}
              {item.label !== "&laquo; Previous" && item.label !== "Next &raquo;" && (
                <a href={item.url} className={`text-slate-500 hover:text-slate-800 ${item.active ? 'text-slate-900 border-b-2 border-black' : ''}`}>{item.label}</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Default>
  )
}