import { Spinner } from 'flowbite-react'
const Loading = () => {
    return ( 
        <div className="min-h-[90vh] flex flex-col items-center justify-center gap-y-3">
            <Spinner color="gray" />
            <p className="text-gray-500 text-sm font-Ilight">درحال دریافت اطلاعات</p>
        </div>
     );
}

export default Loading;