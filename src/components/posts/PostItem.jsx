import { toPersianDigits } from '../../utils/persianDigit'
import moment from 'jalali-moment'
import { Link, useLocation } from 'react-router-dom'
import ModalDelete from './ModalDelete'
import { Button } from 'flowbite-react'
import { AiFillEdit } from 'react-icons/ai'

const AdsItem = ({ data }) => {
    const { pathname } = useLocation()
    return (
        <>
            {data?.docs.map(post => (
                <div key={post._id} className='relative'>
                    {pathname === '/profile/my-posts' && <ModalDelete postId={post._id}/>}
                    <Link to={`/posts/edit/${post.hashId}/${post.slug}`}>
                        {pathname === '/profile/my-posts' && 
                        <Button color="warning" size='sm' className='absolute z-[1] left-11'>
                            <AiFillEdit />
                        </Button>}
                    </Link>
                    <Link to={`/posts/${post.hashId}/${post.slug}`}>
                        <article className="border gap-2 flex justify-between border-gray-200 rounded px-2 py-4">
                            <div className="flex flex-col h-auto justify-between md:w-1/2">
                                <h5 className='text-md break-words font-semibold max-w-[170px]'>{post.title}</h5>
                                <div>
                                    <h5 className='text-sm pb-4'>
                                        {post.price > 0 ? (
                                            <>
                                                {toPersianDigits(new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'IRR'
                                                }).format(post.price).replace("IRR", ""))}
                                                <span className='pr-1'>تومان</span>
                                            </>
                                        ) : 'توافقی'}
                                    </h5>
                                    <p className='text-xs text-gray-500'>{toPersianDigits(moment(post.createdAt).locale('fa').fromNow())}</p>
                                </div>
                            </div>
                            <div
                                className='relative overflow-hidden rounded-md w-36 h-36 bg-gray-300 aspect-w-16 aspect-h-9 aspect-none'>
                                <img src={`${process.env.REACT_APP_BASE_API_URL}/images/${post.image.filename}`} className="absolute w-full h-full object-center" alt="test" />
                            </div>
                        </article>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default AdsItem