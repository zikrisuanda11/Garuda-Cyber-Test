import React, { useEffect } from "react"
import { router, useForm } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    toast.error(errors.email)
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/register', data);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-28">
      {errors.email && (
        <Toaster />
      )}
      <div className="w-40 mt-5">
        <img src="/assets/tokopedia.png" alt="logo" />
      </div>
      <div className="flex gap-20  justify-center">
        <div className="flex flex-col text-center ">
          <img src="/assets/register_new.png" alt="image" className="w-96" />
          <h1 className="text-2xl font-bold font-sans">Jual Beli Mudah Hanya di Tokopedia</h1>
          <p className="text-gray-500 text-sm">Gabung dan rasakan kemudahan bertransaksi di Tokopedia</p>
        </div>
        <form onSubmit={handleSubmit} className="border shadow-xl flex flex-col gap-5 p-10 rounded-md w-96">
          <div className="text-center flex gap-2 flex-col">
            <h1 className="text-2xl font-bold font-sans">Daftar Sekarang</h1>
            <p className="font-sans text-sm text-gray-500">Sudah punya akun Tokopedia? <a className="text-primary" href="/login">Masuk</a></p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs text-gray-500 ">Nama</label>
            <input required onChange={e => setData('name', e.target.value)} type="text" className="px-3 py-2 text-slate-600  w-full rounded-md border ring-1 ring-gray-300 focus:outline-none focus:ring-primary text-sm" />
            <label className="font-sans text-xs text-gray-500 ">Email</label>
            <input required onChange={e => setData('email', e.target.value)} type="email" className="px-3 py-2 text-slate-600  w-full rounded-md border ring-1 ring-gray-300 focus:outline-none focus:ring-primary text-sm" />
            <label className="font-sans text-xs text-gray-500 ">Password</label>
            <input required onChange={e => setData('password', e.target.value)} type="password" className="px-3 py-2 text-slate-600  w-full rounded-md border ring-1 ring-gray-300 focus:outline-none focus:ring-primary text-sm" />
          </div>
          <div>
            <button type="submit" className="bg-primary text-white py-2 rounded-md w-full">Daftar</button>
          </div>
        </form>
      </div>
      <div className="font-sans text-sm text-gray-500 mt-8">© 2009-2024, PT Tokopedia</div>
    </div>
  )
}