import Default from "../Layout/Default";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { PiTote } from "react-icons/pi";
import { FormatRupiah } from "@arismun/format-rupiah";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';

export default function Transaction({ cart_count, data, message }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  useEffect(() => {
    toast.success(message)
  }, [message])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSelectedTransaction = (Transaction) => {
    setSelectedTransaction(Transaction)
  }

  return (
    <Default cart_count={cart_count}>
      {message && (
        <Toaster />
      )}
      <div className="px-60 py-10 flex flex-col gap-5">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl transform  rounded-2xl bg-white pt-6 pl-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl border-b pb-3 leading-6 text-gray-900 flex justify-between items-center font-bold pr-5"
                    >
                      Detail Transaksi
                      <button onClick={closeModal} className=""><RxCross2 size={24} /></button>
                    </Dialog.Title>
                    <div className="flex mt-5">
                      <div className="w-8/12 h-[32rem] overflow-y-auto pr-5 flex flex-col gap-5">
                        {/* judul detail produk */}
                        <div className="flex flex-col gap-5">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-bold">Detail Produk</h3>
                            <h3 className="text-sm font-bold">Nama Tokonya</h3>
                          </div>
                          {/* produk */}
                          <div className="flex flex-col gap-3 ">
                            {selectedTransaction && selectedTransaction.detail_transactions.map((item, index) => (
                              <div key={index} className="flex gap-2 p-5 border rounded-md w-full">
                                <div className="flex gap-2 w-9/12">
                                  <img src={item.product.image} alt="" className="h-12 w-1h-12" />
                                  <div className="flex flex-col w-full">
                                    <p className="line-clamp-2 text-xs font-bold">{item.product.name}</p>
                                    <p className="text-xs text-slate-500">{item.quantity} x <FormatRupiah value={item.product.price} /></p>
                                  </div>
                                </div>
                                <div className="w-3/12">
                                  <p className="text-sm">Total Harga</p>
                                  <p className="text-sm font-bold"><FormatRupiah value={item.price} /></p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t-8 border-second"></div>
                        <div className="flex flex-col gap-3 mb-10">
                          <h3 className="text-sm font-bold">Rincian Pembayaran</h3>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="text-xs text-slate-500">Metode Pembayaran</p>
                              <p className="text-xs ">Cash</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-xs text-slate-500">Total Harga</p>
                              <p className="text-xs "><FormatRupiah value={(selectedTransaction && selectedTransaction.amount) + (selectedTransaction && selectedTransaction.voucher ? selectedTransaction.voucher.discount_amount : 0)} /></p>
                            </div>
                            {selectedTransaction && selectedTransaction.voucher_used != null && (
                              <div className="flex justify-between">
                                <p className="text-xs text-slate-500">Diskon</p>
                                <p className="text-xs "> - <FormatRupiah value={selectedTransaction && selectedTransaction.voucher_used.discount_amount} /></p>
                              </div>
                            )}
                          </div>
                          {/* total pembayaran */}
                          <div className="flex justify-between">
                            <p className="font-bold text-sm">Total Belanja</p>
                            {selectedTransaction && selectedTransaction.voucher_used && (
                              <p className="font-bold text-sm"><FormatRupiah value={selectedTransaction.amount - selectedTransaction.voucher_used.discount_amount} /></p>
                            )}
                            {selectedTransaction && selectedTransaction.voucher_generated && (
                              <p className="font-bold text-sm"><FormatRupiah value={selectedTransaction.amount} /></p>
                            )}
                          </div>
                        </div>
                        <div className="border-t-8 border-second"></div>
                        {selectedTransaction && selectedTransaction.voucher_generated && (
                          <div className="flex flex-col gap-3 mb-10">
                            <h3 className="text-sm font-bold">Kode Voucher</h3>
                            <div className="flex justify-between">
                              <p className="text-xs text-slate-500">Silahkan Tukarkan Kode</p>
                              <p className="text-xs">{selectedTransaction.voucher_generated.code}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-4/12 flex flex-col justify-end">
                        <img src="/assets/detail_transaction.png" alt="" draggable='false' />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <h2 className="text-xl font-sans font-bold">Detail Transaksi</h2>
        <div className="border border-second rounded-md p-3 flex flex-col gap-5">
          <div className='w-5/12 flex gap-3 items-center border px-4 py-2 rounded-md '>
            <IoIosSearch size={24} />
            <input type="text" placeholder='Cari' className='border-none rounded-md w-full focus:outline-none' />
          </div>
          <div className="flex flex-col gap-4">
            {data.map((item, index) => (
              <div className="w-full border rounded-md shadow-sm p-5 flex flex-col gap-2" key={index}>
                <div className="flex gap-5 items-center">
                  <PiTote size={24} className="text-slate-500" />
                  <h3 className="text-sm font-bold">Belanja</h3>
                  <p className="text-xs text-slate-500">{item.date_transaction}</p>
                  <p className="text-xs text-slate-500">{item.id}</p>
                </div>
                <div className="flex gap-10">
                  {/* gambar product */}
                  <div className="flex flex-col gap-2 w-10/12">
                    {/* nama toko */}
                    <p className="font-bold text-sm">{item.detail_transactions[0].product.shop.name}</p>
                    {/* gambar produk */}
                    <div className="flex gap-3 w-4/12 items-center">
                      <img src={item.detail_transactions[0].product.image} alt="" className="w-16 h-1w-16" />
                      <div className="flex flex-col gap-1">
                        <p className="line-clamp-1 font-bold text-sm">{item.detail_transactions[0].product.name}</p>
                        <p className="text-xs text-slate-500">{item.detail_transactions[0].quantity} barang x <FormatRupiah value={item.detail_transactions[0].product.price} /> </p>
                      </div>
                    </div>
                  </div>
                  {/* total belanja */}
                  <div className="border-l flex flex-col justify-center px-5 w-2/12">
                    <p className="text-xs text-slate-500">Total Belanja</p>
                    <p className="font-bold text-sm"><FormatRupiah value={(item.amount) - (item && item.voucher_used ? item.voucher_used.discount_amount : 0)} /></p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <p onClick={() => { handleSelectedTransaction(item); openModal() }} className="text-xs font-bold text-primary hover:cursor-pointer">Lihat Detail Transaksi</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Default>
  )
}