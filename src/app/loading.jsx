import Image from "next/image";
import logo from '@/assets/logo.svg'

export default function Loading() {
    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all sm:my-8 sm:max-w-sm">
                        <div className="p-3 flex flex-col items-center justify-center gap-5 sm:px-6">
                            <Image src={logo} alt="logo" width={48} height={48}/>
                            <p>درحال بارگذاری ...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}