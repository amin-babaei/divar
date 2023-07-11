import { SiAparat } from "react-icons/si"
import { AiFillLinkedin, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'
import Image from "next/image"
import namad from '@/assets/namad.png'
import ecunion from '@/assets/ecunion-logo.png'

const SidebarFooter = () => {
  return (
    <footer className='hidden sm:block'>
      <div className="flex flex-wrap mt-3">
        <a className="text-xs text-gray-400 m-2" href="https://divar.ir">درباره دیوار</a>
        <a className="text-xs text-gray-400 m-2" href="https://divar.ir">دریافت برنامه</a>
        <a className="text-xs text-gray-400 m-2" href="https://divar.ir">بلاگ دیوار</a>
        <a className="text-xs text-gray-400 m-2" href="https://divar.ir">کسب و کار ها</a>
        <a className="text-xs text-gray-400 m-2" href="https://divar.ir">پشتیبانی و قوانین</a>
      </div>
      <div className="flex justify-center mt-5">
        <AiFillTwitterCircle size={18} className='text-gray-500 mx-2 hover:text-black' />
        <AiFillInstagram size={18} className='text-gray-500 mx-2 hover:text-black' />
        <AiFillLinkedin size={18} className='text-gray-500 mx-2 hover:text-black' />
        <SiAparat size={18} className='text-gray-500 mx-2 hover:text-black' />
      </div>
      <div className="flex mt-5">
        <Image src={namad} className="w-28 h-28" alt="namad" />
        <Image src={ecunion} className="w-28 h-28" alt="ecunion" />
      </div>
    </footer>
  )
}

export default SidebarFooter