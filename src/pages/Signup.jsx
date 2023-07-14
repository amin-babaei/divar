import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { validationSignup } from '../utils/validation.js'
import { useAuth, useAuthActions } from '../context/AuthContext';
import ReCAPTCHA from "react-google-recaptcha";
import Input from '../components/Input'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet';

const initialValues = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
    token: ''
}
const Signup = () => {
    const dispatch = useAuthActions()
    const { loading } = useAuth()
    const onSubmit = async (values) => {
        const { name, email, password, phoneNumber, token } = values
        dispatch({ type: 'SIGNUP', payload: { name, email, password, phoneNumber, token } })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validationSignup,
        validateOnMount: true
    })

    if (loading) return <Loading />

    return (
        <form className="flex flex-col gap-4 px-3 md:w-1/3 md:mx-auto mt-8 font-light" onSubmit={formik.handleSubmit}>
            <Helmet>
                <title>ثبت نام در دیوار</title>
            </Helmet>
            <h3 className='text-center text-gray-500 mb-5 font-medium'>
                ثبت نام
            </h3>
            <Input lable='نام و نام خانوادگی' name='name' placeholder='امین بابایی' formik={formik} />
            <Input lable='ایمیل' name='email' type='email' placeholder='aminbabaei_dev@yahoo.com' formik={formik} />
            <Input lable='شماره تلفن' name='phoneNumber' placeholder='09935679611' formik={formik} />
            <Input lable='کلمه عبور' name='password' type='password' placeholder='****' formik={formik} />
            <Input lable='تکرار کلمه عبور' name='confirmPassword' type='password' placeholder='****' formik={formik} />
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                hl='fa'
                onChange={value => {
                    formik.setFieldValue("token", value)
                }}
            />
            {formik.errors.token && formik.touched.token && (
                <lable className='text-red-500 text-xs'>
                    {formik.errors.token}
                </lable>
            )}
            <button type="submit" disabled={!(formik.isValid)} className={`font-medium py-2 w-full rounded text-white ${(formik.isValid) ? 'bg-red-700 hover:hover:opacity-80' : 'bg-gray-500'}`}>
                ثبت نام
            </button>
            <Link to='/signin' className='text-sm cursor-pointer w-fit mb-3 font-medium'>
                قبلا ثبت نام کردید ؟ وارد شوید
            </Link>
        </form>
    )
}

export default Signup