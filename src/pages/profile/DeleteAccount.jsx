import { BsPersonXFill } from "react-icons/bs"
import { useAuth, useAuthActions } from "../../context/AuthContext"
import { useState } from "react"
import { Button, Modal } from "flowbite-react"

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuth()
    const dispatch = useAuthActions()

    return (
        <>
            <div className="flex gap-x-2 border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:hidden"  onClick={() => setShowModal(true)}>
                <BsPersonXFill />
                <h3>حذف حساب کاربری</h3>
            </div>
            <div className="hidden border-b py-5 sm:flex items-center gap-x-2 text-[15px] cursor-pointer hover:bg-gray-50 mb-10"  onClick={() => setShowModal(true)}>
                <BsPersonXFill />
                <h3>حذف حساب کاربری</h3>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(!showModal)}
                size="md"
                position="center"
            >
                <h3 className="p-5 leading-10">
                    با حذف حساب کاربری ، آگهی های شما نیز حذف می شود . آیا مطمئن هستید ؟
                </h3>
                <hr />
                <Modal.Body className="flex justify-around">
                    <Button color='failure' onClick={() => setShowModal(false)}>خیر</Button>
                    <Button color='success' onClick={() => dispatch({ type: 'DELETEUSER', payload: user?._id })}>بله</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteAccount