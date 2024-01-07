import Default from "../Layout/Default";
import React, { useEffect } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { router } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function Cart({ cart_count, data, discount, price, product_count, message, error }) {

  // NOTE untuk increment dan decrement masih ada sedikit bug di controller tapi karena takut waktunya tidak cukup saya kerjakan sampai disini saja

  const [cart, setCart] = React.useState();
  const [voucher, setVoucher] = React.useState();

  useEffect(() => {
    if (message != null){
      toast.success(message)
    }
    if (error != null){
      toast.error(error)
    }
  }, [message, error])

  const handleCheckout = () => {
    router.post('/checkout', {
      'voucher_code': voucher
    });
  }

  const handleDeleteCart = (id) => {
    router.delete(`/carts/${id}`);
  }

  const handleIncrementCart = (product_id) => {
    setCart({
      'product_id': product_id,
      'quantity': 1,
    });

    router.post('/carts', cart);
  }

  const handleDecrementCart = (product_id, cart_id) => {
    let cartItem = data.find((item) => item.product.id === product_id && item.id === cart_id);

    if (cartItem.quantity > 1) {
      setCart({
        'product_id': product_id,
        'quantity': -1,
      });

      router.post('/carts', cart);
    }
  }

  return (
    <Default cart_count={cart_count}>
      {message && (
        <Toaster />
      )}
      {error && (
        <Toaster />
      )}
      <div className="flex px-60 my-10 gap-20">
        <div className="w-8/12 flex flex-col gap-5">
          <h2 className="text-xl font-sans font-bold">Keranjang</h2>
          {/* barang */}
          {data.map((item, index) => (
            <div className="flex flex-col gap-4 border-b-4 border-second pb-3 px-5" key={index}>
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
                      <FaRegTrashAlt onClick={() => handleDeleteCart(item.id)} size={18} className="text-slate-500 hover:text-slate-700 hover:cursor-pointer" />
                      <BiMinusCircle onClick={() => handleDecrementCart(item.product.id, item.id)} size={24} className="text-primary hover:text-green-700 hover:cursor-pointer" />
                      <p className="text-sm text-slate-500 ">{item.quantity}</p>
                      <BiPlusCircle onClick={() => handleIncrementCart(item.product.id)} size={24} className="text-primary hover:text-green-700 hover:cursor-pointer" />
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
              <p className="line-clamp-1 text-sm text-slate-500">Total Harga {cart_count} Barang</p>
              <p className="line-clamp-1 text-sm text-slate-500"><FormatRupiah value={price} /></p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <p className="line-clamp-1 text-sm text-slate-500">Total Diskon Barang</p>
                <p className="line-clamp-1 text-sm text-slate-500"><FormatRupiah value={discount} /></p>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <h2 className="text-md font-sans font-bold">Total Harga</h2>
            <h2 className="text-md font-sans font-bold"><FormatRupiah value={price - discount} /></h2>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs text-gray-500 ">Voucher</label>
            <input onChange={e => setVoucher(e.target.value)} type="text" className="px-3 py-2 text-slate-600  w-full rounded-md border ring-1 ring-gray-300 focus:outline-none focus:ring-primary text-sm" />
          </div>
          <button onClick={handleCheckout} className="bg-primary text-white py-2 rounded-md w-full font-bold">Bayar</button>
        </div>
      </div>
    </Default>
  )
}