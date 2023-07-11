import notfound from '@/assets/404.png'
import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <section className='flex flex-col items-center font-Ilight'>
      <Image src={notfound} alt="not found" className='w-48 h-full' />
      <h1 className='text-3xl py-8 text-gray-500'>این راه به جایی نمی‌رسد!</h1>
      <p className='text-lg pb-5 text-gray-500'>به نظر آدرس را اشتباه وارد کرده‌اید.</p>
      <p className='text-lg text-gray-500 text-center px-2'>برای پیدا کردن مسیر درست می‌توانید سری به
        {" "}
        <Link href={'/'} className='text-red-700'>صفحهٔ اول دیوار</Link>
        {" "}
        بزنید</p>
    </section>
  )
}

export default NotFoundPage