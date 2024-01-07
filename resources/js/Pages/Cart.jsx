import Default from "../Layout/Default";
import React from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

export default function Cart({ cart_count, data, discount, price, product_count }) {
  
  const [cart, setCart] = React.useState(data);

  console.log(cart);
  
  const handleIncrementCart = () => {
    setCart(cart + 1);
  }

  return (
    <Default cart_count={cart_count}>
      <div className="flex px-60 my-10 gap-20">
        <div className="w-8/12 flex flex-col gap-5">
          <h2 className="text-xl font-sans font-bold">Keranjang</h2>
          {/* barang */}
          {data.map((item, index) => (
            <div className="flex flex-col gap-4 border-b-4 border-second pb-3 px-5">
              {/* judul */}
              <div>
                <h3 className="font-bold text-sm font-sans">{item.product.shop.name}</h3>
                <p className="text-slate-500 text-xs">Kab. Tangerang</p>
              </div>
              {/* foto barang */}
              <div className="flex gap-3">
                <img src={item.product.image} alt="" className="w-20 h-20 rounded-md" />
                <div className="flex flex-col gap-2 justify-center">
                  <p className="line-clamp-1 text-sm">{item.product.name}</p>
                  <p className="line-clamp-1 text-xs text-slate-500">Stok {item.product.stock}</p>
                  <div className="flex justify-between w-full">
                    <p className="line-clamp-1 text-sm  font-bold"><FormatRupiah value={item.product.price} /></p>
                    <div className="flex justify-end items-center gap-5">
                      <FaRegTrashAlt size={18} className="text-slate-500 hover:text-slate-700 hover:cursor-pointer" />
                      <BiMinusCircle size={24} className="text-primary hover:text-green-700 hover:cursor-pointer" />
                      <p className="text-sm text-slate-500 ">{item.quantity}</p>
                      <BiPlusCircle size={24} className="text-primary hover:text-green-700 hover:cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* harga */}
        <div className="w-4/12 flex flex-col gap-5  border border-second rounded-md shadow-md h-fit p-5">
          <h2 className="text-md font-sans font-bold">Ringkasan Belanja</h2>
          <div className="border-b-2 border-second pb-4">
            <div className="flex justify-between">
              <p className="line-clamp-1 text-sm text-slate-500">Total Harga {product_count} Barang</p>
              <p className="line-clamp-1 text-sm text-slate-500"><FormatRupiah value={price} /></p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <p className="line-clamp-1 text-sm text-slate-500">Total Diskon Barang</p>
                <p className="line-clamp-1 text-sm text-slate-500"><FormatRupiah value={discount}/></p>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <h2 className="text-md font-sans font-bold">Total Harga</h2>
            <h2 className="text-md font-sans font-bold"><FormatRupiah value={price - discount}/></h2>
          </div>
          <button type="submit" className="bg-primary text-white py-2 rounded-md w-full font-bold">Bayar</button>
        </div>
      </div>
    </Default>
  )
}