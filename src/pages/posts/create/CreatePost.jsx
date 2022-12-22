import { useFormik } from 'formik';
import React, { Fragment, useState } from 'react';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { validationCreatePost } from '../../../utils/validation';
import FormPost from './FormPost';
import SelectCategory from './SelectCategory';

const CreatePost = () => {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0])
  const [state, setState] = useState({ title: '', description: '', price: 0, category: ''})
  const [categoryName, setCategoryName] = useState('')

  const formik = useFormik({
    initialValues: state,
    validationSchema: validationCreatePost,
    enableReinitialize: true,
    validateOnMount: true,
  })

  const next = () => {
    if (formNo === 1) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && state.category) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 3 && formik.isValid && formik.dirty) {
      setFormNo(formNo + 1)
    } else {
      toast.error('مقادیر خواسته شده را پر یا انتخاب کنید')
    }
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }

  const selectCategory = (id, name) => {
    setState({ category: id })
    setCategoryName(name)
  }

  return (
        <section className={`container mx-auto p-3 font-Ilight`}>
          <Helmet>
                <title>ثبت آگهی</title>
          </Helmet>
          <div className='md:w-2/3 mx-auto'>
            <div className='flex items-center mt-5'>
              {formArray.map((v, i) => <Fragment key={i}><div className={`w-24 my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? 'bg-red-500' : 'bg-gray-400'} h-[35px] flex justify-center items-center`}>
                {v}
              </div>
                {i !== formArray.length - 1 && <div className={`w-full h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                }
              </Fragment>)
              }
            </div>
            {formNo === 1 && <div>
              <div className='flex flex-col mb-2'>
                <h3 className='my-3'>قوانین و مقررات</h3>
                <p className='text-justify leading-8'>ثبت آگهی در دیوار نیازمند در نظر گرفتن شرایطی است که باید از سوی کاربران رعایت شود. به مجموعهٔ این موارد، شرایط ثبت آگهی در دیوار گفته می‌شود.
                  به منظور بهبود تجربهٔ کاربری، شرایط زیر برای ثبت آگهی در «دیوار» وضع شده‌ است. رعایت این موارد، علاوه بر افزایش رضایت کاربران، منجر به اثربخشی هرچه بیشتر آگهی‌ها نیز می‌گردد.</p>
                <h4 className='pt-10 mb-3'>آگهی شما به مدت نامعلومی در سایت منتشر می شود و ما هیچ مسعولیتی در قبال آن نداریم</h4>
                <div className='mt-4 gap-3 flex justify-center items-center'>
                  <button onClick={next} className='py-2 w-full rounded text-white bg-green-700'>ادامه</button>
                </div>
              </div>
            </div>}

            {formNo === 2 && <div className='flex flex-col md:flex-row justify-between gap-x-10'>
              <SelectCategory selectCategory={selectCategory} />
              <div className='mt-4 flex-1'>
                <h3 className='text-center text-sm my-2'>انتخاب دسته بندی{categoryName === '' ? null : `: ${categoryName}`}</h3>
                <button onClick={next} className='py-2 my-5 w-full rounded text-white bg-green-700'>ادامه</button>
                <button onClick={pre} className='py-2 w-full rounded text-white bg-red-700'>قبلی</button>
              </div>
            </div>}
            {formNo === 3 && <FormPost formik={formik} state={state} setState={setState} pre={pre} />}
          </div>
        </section>
  );
}

export default CreatePost;