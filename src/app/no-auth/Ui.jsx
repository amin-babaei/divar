'use client'
import { Button } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import loginPic from "@/assets/login_state.svg"

const NeedToLogin = () => {
  return (
    <section className="flex flex-col items-center min-h-[90vh]">
    <Image src={loginPic} alt="" width={200} height={250}/>
    <h3 className='text-center px-2 font-normal'>برای ادامه کار لازم است که وارد حساب کاربری خود شوید</h3>
    <Link href='/signin'>
        <Button color='failure' className="mt-5">
            <h4>ورود / ثبت نام</h4>
        </Button>
    </Link>
</section>
  )
}

export default NeedToLogin