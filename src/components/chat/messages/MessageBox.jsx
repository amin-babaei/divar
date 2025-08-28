import moment from "jalali-moment"
import { toPersianDigits } from "../../../utils/persianDigit"

const MessageBox = ({ loading, messages, scrollRef, user, loadingMsg, newMessage }) => {
    return (
        <div>
            {loading === 'idle' && messages?.map(m => (
                <div key={m._id} ref={scrollRef} className={`p-3 rounded-2xl w-2/5 m-3 ${m.sender === user ? 'bg-blue-100 rounded-br-none' : 'bg-gray-100 mr-auto rounded-bl-none'}`}>
                    <p className='text-sm'>{m.text}</p>
                    <p className="text-xs mt-5">{toPersianDigits(moment(m.createdAt).locale('fa').fromNow())}</p>
                </div>
            ))}

            {loadingMsg ? (
                <div ref={scrollRef} className={`p-3 rounded-2xl rounded-br-none w-2/5 m-3 bg-blue-50 ml-auto rounded-bl-none'}`}>
                    <p className='text-sm'>{newMessage}</p>
                </div>
            ) : null}

        </div>
    )
}

export default MessageBox