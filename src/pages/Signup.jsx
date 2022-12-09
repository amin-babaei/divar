import { Button } from 'flowbite-react'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {validationSignup} from '../utils/validation.js'
import { useAuth, useAuthActions } from '../context/AuthContext';

import Input from '../components/Input'
import Loading from '../components/Loading'
const initialValues = {
    name:'',
    email:'',
    password:'',
    phoneNumber:'',
    confirmPassword:''
}
const Signup = () => {
    const dispatch = useAuthActions()
    const { loading } = useAuth()
    const onSubmit = (values) => {
        const {name,email,password,phoneNumber} = values
        dispatch({type:'SIGNUP',payload:{name,email,password,phoneNumber}})
        
      }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:validationSignup,
        validateOnMount:true
    })
    if(loading)return <Loading/>
    return (
        <form className="flex flex-col gap-4 px-3 md:w-1/3 md:mx-auto mt-10 font-Imedium" onSubmit={formik.handleSubmit}>
            <h3 className='text-center text-gray-500 mb-5'>
                ثبت نام
            </h3>
                <Input lable='نام و نام خانوادگی' name='name' placeholder='امین بابایی' formik={formik}/>
                <Input lable='ایمیل' name='email' type='email' placeholder='aminbabaei_dev@yahoo.com' formik={formik}/>
                <Input lable='شماره تلفن' name='phoneNumber' placeholder='09935679611' formik={formik}/>
                <Input lable='کلمه عبور' name='password' type='password' placeholder='****' formik={formik}/>
                <Input lable='تکرار کلمه عبور' name='confirmPassword' type='password' placeholder='****' formik={formik}/>
            <Button type="submit" color="failure">
                ورود به حساب کاربری
            </Button>
            <Link to='/signin' className='text-sm underline cursor-pointer w-fit'>
                قبلا ثبت نام کردید ؟ وارد شوید
            </Link>
        </form>
    )
}

export default Signup