import { useEffect, useState } from "react"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { toast } from "react-toastify"
import { useAuth } from '../../context/AuthContext'
import http from "../../services/httpService"

const Bookmark = ({ postId, bookmarked }) => {
    const { user } = useAuth()
    const [active, setActive] = useState(bookmarked)

    useEffect(() => {
        setActive(bookmarked)
    }, [bookmarked])
    
    const handleBookmark = async () => {
        try {
            const res = await http.put(`/api/posts/bookmark/${postId}`)
            if (res.status === 200) {
                toast.success(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    const handleClick = (id) => {
        if (user) setActive(prevActiv => !prevActiv)
        handleBookmark(id)
    }
    return (
        <button className='rounded-full duration-500 hover:bg-gray-200 p-3' onClick={() => handleClick(postId)}>
            {active ? <BsBookmarkFill className="text-blue-500" /> : <BsBookmark className="text-gray-500" />}
        </button>
    )
}

export default Bookmark