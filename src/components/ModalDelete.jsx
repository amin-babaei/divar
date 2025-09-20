import { Button } from "flowbite-react"
import { useRef, useState } from "react"
import { BsTrashFill } from "react-icons/bs"
import { toast } from "react-toastify"
import { useDeleteMyAd } from "@/features/ads/hooks/api/useAdsApi"
import Loading from "@/ui/Loading"
import useClickOutside from "@/hooks/useClickOutside"
import Modal from "@/ui/Modal"

const ModalDelete = ({ postId }) => {
    const [showModal, setShowModal] = useState(false)
    const mutation = useDeleteMyAd()

    const modalRef = useRef(null);
    useClickOutside(modalRef, () => setShowModal(false));

    const handleDeletePost = (id) => {
        mutation.mutate(id)
    }
    if (mutation.isSuccess) {
        toast.success('با موفقیت حذف شد')
    }
    if (mutation.isError) {
        toast.error('دوباره تلاش کنید')
    }
    if (mutation.isLoading) {
        return <Loading />
    }
    return (
        <>
            <Button color="red" size='sm' className='absolute z-1 left-0' onClick={() => setShowModal(true)}><BsTrashFill /></Button>
            {showModal && (
                <Modal reference={modalRef} title='حذف آگهی' desc='آیا از حذف آگهی خود مطمئن هستید ؟'>
                    <Button fullSized color='red' onClick={() => setShowModal(false)}>خیر</Button>
                    <Button fullSized color='green' onClick={() => handleDeletePost(postId)}>بله</Button>
                </Modal>
            )}
        </>
    )
}

export default ModalDelete