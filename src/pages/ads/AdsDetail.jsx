import { useParams } from 'react-router'
import Loading from "@/ui/Loading";
import moment from 'jalali-moment';
import { BsQuestionCircle } from 'react-icons/bs'
import { toPersianDigits } from '@/utils/persianDigit';
import { useAd } from '@/features/ads/hooks/api/useAdsApi';
import { SEO } from '@/utils/SEO';
import ButtonChat from '@/features/chat/components/ButtonChat';
import { Button } from 'flowbite-react';
import NotFound from '../NotFound';
import Breadcrumb from '@/features/ads/components/Breadcrumb';
import Contact from '@/features/ads/components/Contact';
import Bookmark from '@/features/ads/components/Bookmark';
import ShareLink from '@/features/ads/components/ShareLink';

const AdsDetail = () => {
  const { slug, hashId } = useParams()
  const { data, isLoading, isError, refetch, error } = useAd(slug, hashId)
  if (isLoading) return <Loading />
  if(error?.response?.status === 404){
    return <NotFound/>
  }

  return (
    <section className='font-light mt-5 container mx-auto px-3 lg:px-[170px]'>
      {isError && <Button color="red" onClick={refetch} size='md' className='m-auto'>
        تلاش مجدد
      </Button>}
      {data && (
        <>
          <SEO 
            title={data.title}
            description={`${data.title} | ${data.category.title} | ${data.description.substring(0, 100)}`}
            ogUrl={`${import.meta.env.VITE_BASE_URL}/posts/${hashId}/${slug}`}
            ogType="article"
            ogTitle={data.title}
            ogDescription={`${data.title} | ${data.category.title} | ${data.description.substring(0, 100)}`}
            ogImage={`${import.meta.env.VITE_BASE_API_URL}/images/${data.image.filename}`}
            pageType='public'
          />
          <Breadcrumb postCategory={data.category} title={data.title}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='mt-5 order-1 md:order-0'>
              <h2 className='text-xl font-medium'>{data.title}</h2>
              <p className='text-md mt-5 text-gray-500'>{toPersianDigits(moment(data.createdAt).locale('fa').fromNow())}</p>
              <div className='flex items-center justify-between mt-4 border-b border-gray-300 py-3'>
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
              <div className='flex items-center justify-between border-b border-gray-300 py-3'>
                <h3>مایل به معاوضه : </h3>
                <p className='text-gray-500'>
                  {data.isNetting ? 'هستم' : 'نیستم'}
                </p>
              </div>
              <div className="flex justify-between mt-7">
                <div className='flex gap-x-2'>
                  <Contact info={data.creator} />
                  <ButtonChat userId={data.creator._id} />
                </div>
                <div className='flex items-center gap-x-2'>
                  <Bookmark postId={data._id} bookmarked={data.isBookmarked} />
                  <ShareLink slug={data.slug} hashId={data.hashId} />
                </div>
              </div>
              <h4 className='mt-8 mb-3 font-medium'>توضیحات</h4>
              <div className='whitespace-pre-wrap text-[15px] leading-8' dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
            <div>
              <div className='relative overflow-hidden rounded-md w-full h-104 bg-gray-300 aspect-w-10 aspect-h-9'>
                <img src={`${import.meta.env.VITE_BASE_API_URL}/images/${data.image.filename}`} className="absolute w-full h-full object-center" alt={data.title} />
              </div>
              <div className='flex items-center gap-x-2 mt-5 border-b border-gray-300 py-5 cursor-pointer'>
                <BsQuestionCircle className='text-gray-500' />
                <p className='text-gray-500 text-sm'>راهنمای خرید امن</p>
              </div>
              <div className='flex items-center gap-x-2 border-b border-gray-300 py-5 cursor-pointer'>
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

export default AdsDetail