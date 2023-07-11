'use client'
import { useFormik } from 'formik';
import { validationSignin } from '@/utils/validation';
import { useAuthActions } from '@/context/AuthContext';
import Input from '@/components/Input';
import Loading from '@/components/Loading'
import Link from 'next/link';
import iranFont from '@/constants/localFont';
import { useMutation } from '@tanstack/react-query';
import http from '@/services/httpService';
import { toast } from 'react-toastify';

const initialValues = {email: '',password: ''}

const signinUser = async (data) => {
    return http.post("/api/user/signin", data).then(({ data }) => data);
}

const Signin = () => {
    const dispatch = useAuthActions()
    const {isLoading, mutateAsync} = useMutation({
        mutationFn: signinUser,
    });
     
    const onSubmit = async (values) => {
        try {
            const data = await mutateAsync(values);
            if(data){
                dispatch({ type: 'SIGNIN', payload: data })
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validationSignin,
        validateOnMount: true
    })

    if (isLoading) return <Loading />
    return (
        <form className={`flex flex-col gap-4 px-3 md:w-1/3 md:mx-auto mt-10 ${iranFont.variable} font-sans font-light`} onSubmit={formik.handleSubmit}>
            <h3 className='text-center text-gray-500 mb-5 font-medium'>
                ورود به حساب کاربری
            </h3>
            <Input lable='ایمیل' name='email' type='email' placeholder='aminbabaei_dev@yahoo.com' formik={formik} />
            <Input lable='کلمه عبور' name='password' type='password' placeholder='****' formik={formik} />
            <button type="submit" disabled={!(formik.isValid)} className={`font-medium py-3 text-sm w-full rounded text-white ${(formik.isValid) ? 'bg-red-700 hover:hover:opacity-80' : 'bg-gray-500'}`}>
                ورود به حساب کاربری
            </button>
            <Link href='/signup' className='text-sm cursor-pointer w-fit font-medium'>
                ثبت نام نکردید؟ ثبت نام
            </Link>
        </form>
    )
}

export default Signin