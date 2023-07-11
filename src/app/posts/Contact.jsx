'use client'
import { Modal } from "flowbite-react"
import { useState } from "react"

const Contact = ({info}) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <button className='rounded px-4 py-[10px] bg-red-700 text-white text-sm font-semibold hover:bg-red-600 duration-300'
                onClick={() => setShowModal(!showModal)}>
                اطلاعات تماس
            </button>
            <Modal
                show={showModal}
                onClose={() => setShowModal(!showModal)}
                size="md"
                popup={true}
                position="center"
            >
                <Modal.Header />
                <Modal.Body className="font-Ilight leading-8">
                    <p>ایمیل : {info.email}</p>
                    <p>شماره تماس : {info.phoneNumber}</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Contact