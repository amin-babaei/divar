'use client'
import Link from 'next/link'
import notfound from '@/assets/404.png'
import Image from 'next/image'

export default function Error({ reset }) {

  return (
    <section className='flex flex-col items-center font-Ilight'>           
        <Image src={notfound} alt="not found" className='w-48 h-full' />
        <h1 className='text-3xl py-8 text-gray-500'>به نظر مشکلی پیش آمده</h1>
        <p className='text-lg text-gray-500'>برای رفع مشکل سری به
            {" "}
            <Link href={'/'} className='text-red-700' onClick={()=> reset()}>صفحهٔ اول دیوار</Link>
            {" "}
        بزنید</p>
    </section>
  )
}