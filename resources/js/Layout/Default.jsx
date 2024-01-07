import React from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from '@inertiajs/react'

export default function Default({ children, cart_count }) {
  return (
    <div>
      <nav className='px-10 py-3 flex justify-center gap-5 w-full '>
        <Link href='/' className='w-2/12 flex items-center '>
          <img src="/assets/tokopedia.png" alt="" className='w-40' />
        </Link>
        <div className='w-8/12 flex gap-3 items-center border px-4 py-1 rounded-md '>
          <IoIosSearch size={24} />
          <input type="text" placeholder='Cari' className='border-none rounded-md w-full focus:outline-none' />
        </div>
        <div className='w-2/12 flex items-center gap-5 '>
          <Link href='/carts' className='static hover:bg-slate-200 hover:rounded-md hover:ease-in-out duration-100 hover:cursor-pointer h-8 w-8 flex items-center justify-center'>
            {cart_count && (
              <div className='absolute mb-5 ml-6 bg-red-500 rounded-full w-4 h-4 text-white text-xs flex items-center justify-center'>{cart_count}</div>
            )}
            <CiShoppingCart size={24} />
          </Link>
          <div className='border-r h-7'></div>
          <Popover className="py-5 h-8 w-8 flex items-center justify-start">
            <Popover.Button>
              <img src="/assets/avatar.png" alt="avatar" className='w-11' />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-36 border -translate-x-6 py-4 focus:outline-none transform rounded-md flex flex-col items-start gap-5">
                <Link href="transaction" method='get' as='button' type='button' className='px-4'>Detail Transaksi</Link>
                <Link href="logout" method='post' as='button' type='button' className='px-4'>Logout</Link>
              </Popover.Panel>
            </Transition>
          </Popover>
          {/* <div className='py-5 hover:bg-slate-200 hover:rounded-md hover:ease-in-out duration-100 hover:cursor-pointer h-8 w-24 flex items-center justify-start'>
          </div> */}
        </div>
      </nav>
      <main>{children}</main>
      <footer className='text-center'>
        {/* <p>ini footer</p> */}
      </footer>
    </div>
  )
}