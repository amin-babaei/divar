import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import moment from 'jalali-moment';
import { BsQuestionCircle } from 'react-icons/bs'
import { Breadcrumb, ShareLink, Bookmark, Contact } from './index';
import { toPersianDigits } from '../../utils/persianDigit';
import { usePost } from '../../hooks/fetchData';
import Helmet from 'react-helmet';
import ChatPost from '../../components/chat/ChatPost';

const PostDetail = () => {
  const { slug, hashId } = useParams()
  const { data, isLoading, error } = usePost(slug,hashId)
  if (isLoading) return <Loading />
  if (error) {
    toast.error(error.message)
  }
  return (
    <section className='font-Ilight mt-5 container mx-auto px-3 lg:px-[170px]'>
      {data && (
        <>
          <Helmet>
                <title>{data?.title}</title>
          </Helmet>
          <Breadcrumb data={data} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='mt-5 order-1 md:order-none'>
              <h2 className='text-xl'>{data.title}</h2>
              <p className='text-md mt-5 text-gray-500'>{moment(data.createdAt).locale('fa').fromNow()}</p>
              <div className='flex items-center justify-between mt-4 border-b py-3'>
                <h3>قیمت : </h3>
                <p className='text-gray-500'>
                  {data.price > 0 ? (
                    <>
                      {toPersianDigits(new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'IRR'
                      }).format(data.price).replace("IRR", ""))}
                      <span className='pr-1'>تومان</span>
                    </>
                  ) : 'توافقی'}
                </p>
              </div>
              <div className='flex items-center justify-between border-b py-3'>
                <h3>مایل به معاوضه : </h3>
                <p className='text-gray-500'>
                  {data.isNetting ? 'هستم' : 'نیستم'}
                </p>
              </div>
              <div className="flex justify-between mt-7">
                <div className='flex gap-x-2'>
                  <Contact info={data.creator} />
                  <ChatPost userId={data.creator._id}/>
                </div>
                <div className='flex items-center gap-x-2'>
                  <Bookmark postId={data._id} bookmarked={data.isBookmarked} />
                  <ShareLink slug={data.slug} hashId={data.hashId} />
                </div>
              </div>
              <h4 className='mt-8 mb-3'>توضیحات</h4>
              <div className='whitespace-pre-wrap text-[15px] leading-8' dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
            <div>
              <div className='relative overflow-hidden rounded-md w-full h-[26rem] bg-gray-300 aspect-w-10 aspect-h-9'>
                <img src={`${process.env.REACT_APP_BASE_API_URL}/images/${data.image.filename}`} className="absolute w-full h-full object-center" alt="test" />
              </div>
              <div className='flex items-center gap-x-2 mt-5 border-b py-5 cursor-pointer'>
                <BsQuestionCircle className='text-gray-500' />
                <p className='text-gray-500 text-sm'>راهنمای خرید امن</p>
              </div>
              <div className='flex items-center gap-x-2 border-b py-5 cursor-pointer'>
                <BsQuestionCircle className='text-gray-500' />
                <p className='text-gray-500 text-sm'>ثبت تخلف و مشکل آگهی</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default PostDetail