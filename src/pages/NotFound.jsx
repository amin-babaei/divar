import React from 'react'
import { Link } from 'react-router-dom'
import notfound from '../assets/404.png'
const NotFound = () => {
  return (
    <section className='flex flex-col items-center font-Ilight'>
      <img src={notfound} alt="not found" className='w-48 h-full' />
      <h1 className='text-3xl py-8 text-gray-500'>این راه به جایی نمی‌رسد!</h1>
      <p className='text-lg pb-5 text-gray-500'>به نظر آدرس را اشتباه وارد کرده‌اید.</p>
      <p className='text-lg text-gray-500'>برای پیدا کردن مسیر درست می‌توانید سری به
      {" "}
        <Link to={'/'} className='text-red-700'>صفحهٔ اول دیوار</Link>
        {" "}
        دیوار بزنید</p>
    </section>
  )
}

export default NotFound