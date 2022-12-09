import { Button } from 'flowbite-react'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { validationSignin } from '../utils/validation';
import { useEffect } from 'react';
import { useAuth, useAuthActions } from '../context/AuthContext';

import Input from '../components/Input';
import Loading from '../components/Loading'
const initialValues = {
    email: '',
    password: '',
}
const Signin = () => {
    const dispatch = useAuthActions()
    const { user,loading } = useAuth()
    const navigate = useNavigate()
    const onSubmit = (values) => {
        dispatch({ type: 'SIGNIN', payload: values })
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validationSignin,
        validateOnMount: true
    })
    useEffect(() => {
        if (user) navigate("/", { replace: true })
    }, [user])
    if(loading)return <Loading/>
    return (
        <form className="flex flex-col gap-4 px-3 md:w-1/3 md:mx-auto mt-10 font-Imedium" onSubmit={formik.handleSubmit}>
            <h3 className='text-center text-gray-500 mb-5'>
                ورود به حساب کاربری
            </h3>
            <Input lable='ایمیل' name='email' type='email' placeholder='aminbabaei_dev@yahoo.com' formik={formik} />
            <Input lable='کلمه عبور' name='password' type='password' placeholder='****' formik={formik} />
            <Button type="submit" color="failure">
                ورود به حساب کاربری
            </Button>
            <Link to='/signup' className='text-sm underline cursor-pointer w-fit'>
                ثبت نام نکردید؟ ثبت نام
            </Link>
        </form>
    )
}

export default Signin