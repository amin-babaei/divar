import { toPersianDigits } from '../../utils/persianDigit'
import moment from 'jalali-moment'
const AdsItem = () => {
    return (
        <>
            <div className="border gap-2 flex justify-between border-gray-300 rounded px-2 py-4">
                <div className="flex flex-col h-full justify-between md:w-1/2">
                    <h3 className='text-sm break-words font-semibold'>گوشی سامسونگ</h3>
                    <div>
                        <h5 className='text-sm pb-4'>{toPersianDigits('200,000')} تومان</h5>
                        <p className='text-xs text-gray-500'>{moment("2022-12-08T22:54:53.702+00:00").locale('fa').fromNow()}</p>
                    </div>
                </div>
                <div className='relative overflow-hidden rounded-md w-36 h-36 bg-gray-300 aspect-w-16 aspect-h-9 aspect-none'>
                    <img src="/test3.jpg" className="absolute w-full h-full object-center" alt="test" />
                </div>
            </div>
            <div className="border gap-2 flex justify-between border-gray-300 rounded px-2 py-4">
                <div className="flex flex-col h-full justify-between md:w-1/2">
                    <h3 className='text-sm break-words font-semibold'>موتور هندا مدل 1394</h3>
                    <div>
                        <h5 className='text-sm pb-4'>{toPersianDigits('200,000')} تومان</h5>
                        <p className='text-xs text-gray-500'>{new Date(Date.now()).toLocaleDateString("fa-IR")}</p>
                    </div>
                </div>
                <div className='relative overflow-hidden rounded-md w-36 h-36 bg-gray-300 aspect-w-16 aspect-h-9 aspect-none'>
                    <img src="/test1.webp" className="absolute w-full h-full object-center" alt="test" />
                </div>
            </div>
        </>
    )
}

export default AdsItem