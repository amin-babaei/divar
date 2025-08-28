import { useFormik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { SEO } from '../../../utils/SEO';
import { toast } from 'react-toastify';
import { validationCreatePost } from '../../../utils/validation';
import FormPost from './FormPost';
import SelectCategory from './SelectCategory';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useUpdatePost, usePost } from '../../../hooks/api/usePostApi';
import Loading from '../../../components/Loading';
import { toPersianDigits } from '../../../utils/persianDigit';

const CreatePost = () => {
  const formArray = [1, 2, 3];
  const initialState = { title: '', description: '', price: 0, category: '', isNetting: false, image: '' }
  const [stepForm, setStepForm] = useState(formArray[0])
  const [post, setPost] = useState(initialState)
  const [categoryName, setCategoryName] = useState('')
  const { slug, hashId } = useParams()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const { isFetching, data, error } = usePost(slug, hashId)

  useEffect(() => {
    if (data && pathname.startsWith('/posts/edit')) {
      setPost({title: data.title,description: data.description,price: data.price,category: data.category,isNetting: data.isNetting,image: data.image});
      setCategoryName(data.category.title);
    } else {
      setPost({ ...initialState });
      setCategoryName('');
      setStepForm(1);
    }
  }, [data]);
  
  useEffect(() => {
    if (!data && pathname.startsWith('/posts/edit')) {
      setPost({ ...initialState });
      setCategoryName('');
      setStepForm(1);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith('/posts/edit') && error?.response?.status === 404) {
      navigate("/not-found", { replace: true });
    }
  }, [pathname, error]);

  const formik = useFormik({
    initialValues: post,
    validationSchema: validationCreatePost,
    enableReinitialize: true,
    validateOnMount: true,
  })
  
  const next = () => {
    if (stepForm === 1) {
      setStepForm(stepForm + 1)
    }
    else if (stepForm === 2 && formik.values.category) {
      setStepForm(stepForm + 1)
    }
    else if (stepForm === 3 && formik.isValid && formik.dirty) {
      setStepForm(stepForm + 1)
    } else {
      toast.error('دسته بندی آگهی خود را مشخص کنید')
    }
  }
   const pre = () => setStepForm((prev) => prev - 1);

  const mutation = useUpdatePost()
  const handleUpdate = (postId) => {
    let data = new FormData();
    data.append("title", formik.values.title);
    data.append("price", formik.values.price);
    data.append("category", typeof formik.values.category === 'string' ? formik.values.category : formik.values.category._id);
    data.append("description", formik.values.description);
    data.append("isNetting", formik.values.isNetting);
    data.append("image", formik.values.image);
    mutation.mutate({ postId, data });
  };
  
  if (mutation.isSuccess) {
    toast.success('تغیرات اعمال شد')
    navigate('/profile/my-posts')
  }
  if (mutation.isError) {
    toast.error('دوباره تلاش کنید')
  }
  if (mutation.isLoading || isFetching) return <Loading />

  return (
    <section className={`container mx-auto p-3 font-light`}>
      <SEO 
        title={`امین دیوار - ${pathname.startsWith('/posts/edit') ? 'ویرایش' : 'ثبت'} آگهی`}
        description="آگهی خود را رایگان ثبت کنید و در مشهد دیده شوید"
        pageType='private'
        ogType='website'
      />
      <div className='md:w-2/3 mx-auto'>
        <div className='flex items-center mt-5'>
          {formArray.map((v, i) => <Fragment key={i}><div className={`w-24 my-3 text-white rounded-full ${stepForm - 1 === i || stepForm - 1 === i + 1 || stepForm === formArray.length ? 'bg-red-500' : 'bg-gray-400'} h-[35px] flex justify-center items-center`}>
            {toPersianDigits(v)}
          </div>
            {i !== formArray.length - 1 && <div className={`w-full h-[2px] ${stepForm === i + 2 || stepForm === formArray.length ? 'bg-red-500' : 'bg-gray-400'}`}></div>
            }
          </Fragment>)
          }
        </div>
        {stepForm === 1 && <div>
          <div className='flex flex-col mb-2'>
            <h3 className='my-3 font-medium'>قوانین و مقررات</h3>
            <p className='text-justify leading-8 max-w-2xl'>ثبت آگهی در دیوار نیازمند در نظر گرفتن شرایطی است که باید از سوی کاربران رعایت شود. به مجموعهٔ این موارد، شرایط ثبت آگهی در دیوار گفته می‌شود.
              به منظور بهبود تجربهٔ کاربری، شرایط زیر برای ثبت آگهی در «دیوار» وضع شده‌ است. رعایت این موارد، علاوه بر افزایش رضایت کاربران، منجر به اثربخشی هرچه بیشتر آگهی‌ها نیز می‌گردد.</p>
            <h4 className='pt-10 mb-3 font-light'>
              آگهی ایجاد شده شما بعد از تأیید توسط ناظران ، در سایت به نمایش گذاشته خواهد شد
            </h4>
            <h4 className='mb-3 font-light'>آگهی شما به مدت نامعلومی در سایت منتشر می شود و ما هیچ مسعولیتی در قبال آن نداریم</h4>
            <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={next} className='py-2 w-full sm:w-1/4 ml-auto rounded text-white bg-green-700'>موافقم</button>
            </div>
          </div>
        </div>}

        {stepForm === 2 && <div className='flex flex-col md:flex-row justify-between gap-x-10'>
          <SelectCategory formik={formik} setCategoryName={setCategoryName} />
          <div className='mt-4 flex-1'>
            <h3 className='text-center text-sm my-2 font-medium'>انتخاب دسته بندی{categoryName === '' ? null : `: ${categoryName}`}</h3>
            <button onClick={next} className='py-2 my-5 w-full rounded text-white bg-green-700'>ادامه</button>
            <button onClick={pre} className='py-2 w-full rounded text-white bg-red-700'>قبلی</button>
          </div>
        </div>}
        {stepForm === 3 && <FormPost formik={formik} isNetting={post?.isNetting} pre={pre} updatePost={handleUpdate} id={data?._id}/>}
      </div>
    </section>
  );
}

export default CreatePost;