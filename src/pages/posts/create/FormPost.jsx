import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import http from "../../../services/httpService";

const FormPost = ({ setState, state, formik, pre }) => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate()
  const toggleChange = (e) => {
    setState({ ...formik.values,isNetting: e.target.checked });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = new FormData();
      data.append("title", formik.values.title);
      data.append("price", formik.values.price);
      data.append("category", formik.values.category);
      data.append("description", formik.values.description);
      data.append("image", event.target.image.files[0]);

      const { status } = await http.post(`${process.env.REACT_APP_BASE_API_URL}/api/posts/create`,data);
      if (status === 201) {
        toast.success("آگهی شما با موفقیت انتشار یافت");
        navigate('/profile/my-posts')
      }
    } catch (ex) {
      toast.error(ex?.response?.data?.message)
      console.log(ex);
    }
  }

  return (
    <form className='mt-5 flex flex-col gap-y-3' onSubmit={handleSubmit}>
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
            value={state.isNetting}
            onChange={(e)=>toggleChange(e)}
            name='isNetting'
          />
          <div onClick={() => { setEnabled(!enabled) }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-red-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
          ></div>
        </label>
      </div>
      <div className="my-3 flex border border-gray-300">
        <label htmlFor="files" className="flex items-center px-5 relative z-10 h-11 py-2 text-sm text-white bg-red-700 cursor-pointer">بارگذاری عکس</label>
        <input id="files" type="file" name="image" className="absolute pr-3" />
      </div>
      <div className='gap-3 flex justify-center items-center'>
        <button onClick={pre} className='py-2 w-full rounded text-white bg-red-700'>قبلی</button>
        <button disabled={!(formik.isValid)} className={`py-2 w-full rounded text-white ${(formik.isValid) ? 'bg-green-700 hover:hover:opacity-80' : 'bg-gray-500'}`} type="submit">انتشار</button>
      </div>
    </form>
  )
}

export default FormPost