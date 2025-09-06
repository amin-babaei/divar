import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import { useCreatePost } from "../../../hooks/api/usePostApi";

const FormPost = ({ isNetting, formik, pre, updatePost, id }) => {
  const [enabled, setEnabled] = useState(isNetting);
  const [preview, setPreview] = useState('')
  const mutation = useCreatePost()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (formik.values.image.filename) {
      setPreview(`${import.meta.env.VITE_BASE_API_URL}/images/${formik.values.image.filename}`)
    }
    }, [formik.values.image])

  const handleChangeImage = e => {
    formik.setFieldValue('image', e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("title", formik.values.title);
    data.append("price", formik.values.price);
    data.append("category", formik.values.category);
    data.append("description", formik.values.description);
    data.append("image", formik.values.image);
    mutation.mutate(data)
  }
  if (mutation.isSuccess) {
    toast.success('با موفقیت ساخته شد')
    navigate('/profile/my-posts')
  }
  if (mutation.isError) {
    toast.error('دوباره تلاش کنید')
  }
  if (mutation.isLoading) {
    return <Loading />
  }

  return (
    <form className='mt-5 flex flex-col gap-y-3'>
      <Input lable='عنوان آگهی' name='title' placeholder='مثلا سامسونگ' formik={formik} />
      <Input lable='قیمت' name='price' type='number' placeholder='قیمت به تومان می باشد' formik={formik} />
      <div className='flex flex-col'>
        <div className="flex items-center">
          <label className='text-slate-500 text-xs mb-1' htmlFor="description">توضیحات</label>
          {formik.touched.description && formik.errors.description ? (
            <div className="flex-1 ml-2 text-rose-500 text-left text-xs">{formik.errors.description}</div>
          ) : null}
        </div>
        <textarea rows="5" id='description' className="text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-white focus:border-red-700"
          placeholder="توضیحات مربوط به آگهی شما" value={formik.values.description} onChange={formik.handleChange}
          onBlur={formik.handleBlur} name='description' />
      </div>
      <div className="flex items-center">
        <label className='text-slate-500 text-xs' htmlFor="isNetting">مایل به معاوضه ؟</label>
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            readOnly
            value={enabled}
            onChange={() => formik.setFieldValue('isNetting', enabled)}
            name='isNetting'
            checked={enabled}
          />
          <div onClick={() => { setEnabled(!enabled) }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-red-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
          ></div>
        </label>
      </div>
      <div className="my-3 flex border border-gray-300">
        <label htmlFor="files" className="flex items-center px-5 relative z-10 h-11 py-2 text-sm text-white bg-red-700 cursor-pointer">بارگذاری عکس</label>
        {formik.touched.image && formik.errors.image ? (
          <div className="flex-1 ml-2 text-rose-500 text-left text-xs">{formik.errors.image}</div>
        ) : null}
        <input id="files" type="file" name="image" className="absolute pr-3" onChange={handleChangeImage} onBlur={formik.handleBlur} />
      </div>

          {preview && !formik.errors.image ? (
            <figure>
              <img src={preview} alt="" className="w-24 h-24 m-auto"/>
            </figure>
          ) : null}

      <div className='gap-3 flex justify-center items-center'>
        <button onClick={pre} className='py-2 w-full rounded text-white bg-red-700'>قبلی</button>
        {pathname.startsWith('/posts/edit') ?
          <button disabled={!(formik.isValid) || !formik.dirty} className={`py-2 w-full rounded text-white ${(formik.isValid && formik.dirty) ? 'bg-yellow-500 hover:hover:opacity-80' : 'bg-gray-500'}`} onClick={() => updatePost(id)} type="button">ویرایش</button>
          : <button disabled={!(formik.isValid)} className={`py-2 w-full rounded text-white ${(formik.isValid) ? 'bg-green-700 hover:hover:opacity-80' : 'bg-gray-500'}`} onClick={handleSubmit}>انتشار</button>}
      </div>
    </form>
  )
}

export default FormPost