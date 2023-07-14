import { BsPersonXFill } from "react-icons/bs"
import { useAuth, useAuthActions } from "../../context/AuthContext"
import { useRef, useState } from "react"
import { Button } from "flowbite-react"
import useClickOutside from "../../hooks/useClickOutside"
import Modal from "../../components/Modal"

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuth()
    const dispatch = useAuthActions()

    const modalRef = useRef(null);
    useClickOutside(modalRef, () => setShowModal(false));

    return (
        <>
            <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50 font-normal"  onClick={() => setShowModal(true)}>
                <BsPersonXFill />
                <h3>حذف حساب کاربری</h3>
            </div>
            {showModal && (
                <Modal reference={modalRef} title='حذف حساب کاربری' desc='با حذف حساب کاربری ، آگهی های شما نیز حذف می شود . آیا مطمئن هستید ؟'>
                    <Button fullSized color='failure' onClick={() => setShowModal(false)}>خیر</Button>
                    <Button fullSized color='success' onClick={() => dispatch({ type: 'DELETEUSER', payload: user?._id })}>بله</Button>
                </Modal>
            )}    
        </>
    )
}

export default DeleteAccount