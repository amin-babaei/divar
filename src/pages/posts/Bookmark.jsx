import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { toast } from "react-toastify"
import { useAuth } from '../../context/AuthContext'
import { useBookmarked } from "../../hooks/fetchData"

const Bookmark = ({ postId, bookmarked }) => {
    const { user } = useAuth()
    const mutation = useBookmarked()

    const handleBookmark = async (postId) => {
        if (user)mutation.mutate(postId)
        else toast.error('لطفا وارد حساب کاربری خود شوید')
    }

    return (
        <button className='rounded-full duration-500 hover:bg-gray-200 p-3' onClick={() => handleBookmark(postId)}>
            {bookmarked ? <BsBookmarkFill className="text-blue-500" /> : <BsBookmark className="text-gray-500" />}
        </button>
    )
}

export default Bookmark