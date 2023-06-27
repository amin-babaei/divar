import { RiMore2Fill } from "react-icons/ri"
import Skeleton from "react-loading-skeleton"

const UserMessage = ({ loading, error, data, isTyping }) => {
    return (
        <div className="flex justify-between items-center py-[3px]">
            {loading ? <Skeleton count={1} width={150} height={30} className='mr-2' /> : (
                <h3 className="mr-4 border-r-2 pr-2 flex items-center">
                    {error?.response?.status === 404 ? 'حساب کاربری حذف شده' : data.data?.name}
                    {isTyping && <p className={`text-xs mr-1 text-gray-400 `}>(در حال نوشتن ...)</p>}
                </h3>
            )}
            <button className='rounded-full duration-500 hover:bg-gray-200 p-3 ml-4'>
                <RiMore2Fill className="text-gray-500" />
            </button>
        </div>
    )
}

export default UserMessage