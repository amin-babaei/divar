import signup from '../assets/01.png'
import management from '../assets/02.png'
import check from '../assets/03.png'
import phone from '../assets/phone.svg'
import warning from '../assets/warning-phone.svg'
import envelope from '../assets/envelope.svg'
import { SEO } from '../utils/SEO'

const Support = () => {
    return (
        <section className="font-light">
            <SEO 
                title="امین دیوار - پشتیبانی"
                description="پشتیبانی امین دیوار ، پاسخ به سوالات متداول و امکان تماس با پشتیبانی"
                pageType="public"
                ogType="website"
            />
            <h3 className='text-center mt-10 text-lg font-thin'>چطور می‌توانیم کمکتان کنیم؟</h3>
            <div className="relative mt-5">
                <input type="text" className="block w-3/4 md:w-1/3 m-auto text-md text-gray-900 border border-gray-300 rounded p-2 focus:outline-none focus:ring-white focus:border-red-700"
                 placeholder="جستجو در مقالات راهنما" />  
                <div className="absolute inset-y-0 left-[15%] md:left-[34%] flex items-center">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>
            <div className="container mx-auto px-3 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 mb-5">
                    <div className='flex flex-col items-center'>
                        <img src={signup} alt="" className='w-16 h-16'/>
                        <h3 className='mb-3 font-bold'>ورود و حساب کاربری</h3>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چگونه در دیوار حساب کاربری بسازم ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چگونه اپلیکیشن دیوار را دانلود کنم ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>آیا برای ثبت آگهی باید حساب کاربری بسازم ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چگونه وارد حساب کاربری خود بشوم ؟</p>  
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چگونه از حساب کاربری خود خارج بشوم ؟</p>
                        <button className='text-red-700 text-sm'>موارد بیشتر</button> 
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={management} alt="" className='w-16 h-16'/>
                        <h3 className='mb-3 font-bold'>ثبت و مدیریت آگهی</h3>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>شرایط ثبت آگهی در دیوار</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چگونه در دیوار آگهی ثبت کنم ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>دسته بندی های اصلی دیوار کدامند ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>آیا برای ثبت آگهی باید حساب کاربری بسازم ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چگونه آگهی های خود را مدیریت کنم ؟</p>
                        <button className='text-red-700 text-sm'>موارد بیشتر</button> 
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={check} alt="" className='w-16 h-16'/>
                        <h3 className='mb-3 font-bold'>بررسی و رد آگهی</h3>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چطور از علت حذف یا رد آگهی خود باخبر شوم ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چرا آگهی من به خاطر دسته‌بندی غیرمرتبط رد شده است ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چرا آگهی من منتشر نشده است ؟</p>
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>چرا آگهی من از روی دیوار حذف شده است ؟</p>  
                        <p className='text-gray-400 text-sm my-3 cursor-pointer'>پرتکرارترین دلایل رد عکس آگهی کدامند ؟</p>
                        <button className='text-red-700 text-sm'>موارد بیشتر</button> 
                    </div>
                </div>
                <hr className='text-gray-300'/>
                <h3 className='text-center my-5'>تماس با پشتیبانی</h3>
                <p className='text-gray-500 text-center'>در تمام ساعات شبانه روز و ایام هفته میتوانید با ما در ارتباط باشید.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 mt-10 mb-5">
                    <div className='flex flex-col items-center'>
                        <img src={phone} alt="" className='w-16 h-16'/>
                        <h3 className='my-3 text-gray-500'>تماس با پشتیبانی</h3>
                        <button className='text-red-700 text-xs p-2 px-3 font-semibold rounded border border-red-700 duration-300 hover:bg-red-50'>تماس تلفنی</button> 
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={warning} alt="" className='w-16 h-16'/>
                        <h3 className='my-3 text-gray-500'>تماس با واحد گزارش تخلف</h3>
                        <button className='text-red-700 text-xs p-2 px-3 font-semibold rounded border border-red-700 duration-300 hover:bg-red-50'>تماس تلفنی</button> 
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={envelope} alt="" className='w-16 h-16'/>
                        <h3 className='my-3 text-gray-500'>ارسال جزئیات پرسش به ایمیل پشتیبانی</h3>
                        <button className='text-red-700 text-xs py-2 px-3 font-semibold rounded border border-red-700 duration-300 hover:bg-red-50'>ارسال ایمیل</button> 
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Support