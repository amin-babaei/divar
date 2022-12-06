import { toPersianDigits } from '../../utils/persianDigit'

const AdsItem = () => {
    return (
            <div className="border gap-2 flex flex-col justify-between border-gray-300 rounded px-2 py-4 md:flex-row">
                <div className="order-1 flex flex-col h-full justify-between md:order-none md:w-1/2">
                    <h3 className='text-sm break-words font-semibold'>گوشی سامسونگ</h3>
                    <h5 className='text-sm py-5'>{toPersianDigits('200,000')} تومان</h5>
                    <p className='text-xs text-gray-500'>{new Date(Date.now()).toLocaleDateString("fa-IR")}</p>
                </div>
                <div className="aspect-w-16 aspect-h-10 aspect-none">
                    <img src="/test1.webp" className="rounded-md md:h-40 w-full object-center object-cover" alt="test" />
                </div>
            </div>
    )
}

export default AdsItem