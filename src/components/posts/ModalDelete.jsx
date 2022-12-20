import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { BsTrashFill } from "react-icons/bs"
import { toast } from "react-toastify"
import { useDeleteMyPost } from "../../hooks/fetchData"
import Loading from "../Loading"

const ModalDelete = ({ postId }) => {
    const [showModal, setShowModal] = useState(false)
    const mutation = useDeleteMyPost()

    const handleDeletePost = (id) => {
        mutation.mutate(id)
    }
    if (mutation.isSuccess) {
        toast.success('با موفقیت حذف شد')
      }
      if (mutation.isError) {
        toast.error(mutation.error.message)
      }
      if (mutation.isLoading) {
        return <Loading />
      }
    return (
        <>
            <Button color="failure" size='sm' className='absolute z-10 left-0' onClick={() => setShowModal(true)}><BsTrashFill /></Button>
            <Modal
                show={showModal}
                onClose={() => setShowModal(!showModal)}
                size="md"
                position="center"
            >
                <h3 className="p-5">
                    آیا از حذف آگهی خود مطمئن هستید ؟
                </h3>
                <hr />
                <Modal.Body className="flex justify-around">
                    <Button color='failure' onClick={() => setShowModal(false)}>خیر</Button>
                    <Button color='success' onClick={() => handleDeletePost(postId)}>بله</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalDelete