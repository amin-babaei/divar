import { Modal } from "flowbite-react"
import { useState } from "react"
import { BsShare } from 'react-icons/bs'
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon
} from 'react-share';
const ShareLink = ({ slug, hashId }) => {
    const [showModal, setShowModal] = useState(false)
    const url = `${import.meta.env.VITE_BASE_URL}/posts/${hashId}/${slug}`
    return (
        <div>
            <button className='rounded-full duration-500 hover:bg-gray-200 p-3' onClick={() => setShowModal(!showModal)}>
                <BsShare className='text-gray-500' />
            </button>
            <Modal
                show={showModal}
                onClose={() => setShowModal(!showModal)}
                size="md"
                popup={true}
                position="center"
            >
                <Modal.Header />
                <Modal.Body>
                    <p className="font-normal text-sm text-center">اشتراک گذاری در :</p>
                    <div className="space-y-6 flex gap-x-3 justify-center items-baseline">
                        <FacebookShareButton
                            url={url}
                        >
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton
                            url={url}
                        >
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                        <TelegramShareButton
                            url={url}
                        >
                            <TelegramIcon size={40} round={true} />
                        </TelegramShareButton>
                        <TwitterShareButton
                            url={url}
                        >
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                        <LinkedinShareButton
                            url={url}
                        >
                            <LinkedinIcon size={40} round={true} />
                        </LinkedinShareButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default ShareLink