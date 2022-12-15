import { toPersianDigits } from '../../utils/persianDigit'
import moment from 'jalali-moment'
import { Link } from 'react-router-dom'

const AdsItem = ({ data }) => {

    return (
        <>
            {data?.docs.map(post => (
                <Link key={post._id} to={`/posts/${post.slug}/${post.hashId}`}>
                    <article className="border gap-2 flex justify-between border-gray-200 rounded px-2 py-4">
                        <div className="flex flex-col h-auto justify-between md:w-1/2">
                            <h5 className='text-md break-words font-semibold'>{post.title}</h5>
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
                                <p className='text-xs text-gray-500'>{moment(post.createdAt).locale('fa').fromNow()}</p>
                            </div>
                        </div>
                        <div
                            className='relative overflow-hidden rounded-md w-36 h-36 bg-gray-300 aspect-w-16 aspect-h-9 aspect-none'>
                            <img src={`${process.env.REACT_APP_BASE_API_URL}/${post.image}`} className="absolute w-full h-full object-center" alt="test" />
                        </div>
                    </article>
                </Link>
            ))}
        </>
    )
}

export default AdsItem