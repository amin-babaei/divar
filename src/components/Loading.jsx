import { Spinner } from 'flowbite-react'
const Loading = ({height}) => {
    return ( 
        <div className={`${height ? height : 'min-h-[90vh]'} flex flex-col items-center justify-center gap-y-3`}>
            <Spinner color="gray" />
            <p className="text-gray-500 text-sm font-light">درحال دریافت اطلاعات</p>
        </div>
     );
}

export default Loading;