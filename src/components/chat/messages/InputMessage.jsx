import { FiSend } from "react-icons/fi"

const InputMessage = ({ change, loading, newMessage, submit }) => {
    return (
        <div className="sticky bottom-0 bg-white border-t border-gray-100">
            <textarea maxLength={200} type='text' placeholder="متنی بنویسید ..." className='w-3/4 hide-scroll h-full py-2 outline-none border-none resize-none focus:ring-0 focus:border-gray-300 sm:w-5/6' onChange={change}
                value={loading ? "" : newMessage} />
            <button className='absolute top-4 left-5 rounded-xl w-16 flex justify-center duration-500 bg-red-700 hover:bg-red-500 p-3' 
            onClick={submit}>
                <FiSend className="text-white" size={24} fill='white' />
            </button>
        </div>
    )
}

export default InputMessage