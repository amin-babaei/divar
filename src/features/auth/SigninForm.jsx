import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useAuth, useAuthActions } from "@/context/AuthContext";
import { validationSignin } from "./validation/signinValidation";
import Input from "@/ui/Input";
import Loading from "@/ui/Loading";

const SigninForm = () => {
    const dispatch = useAuthActions()
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    const onSubmit = (values) => {
        dispatch({ type: 'SIGNIN', payload: values })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit,
        validationSchema: validationSignin,
        validateOnMount: true
    })

    useEffect(() => {
        if (user) navigate("/", { replace: true })
    }, [user])

    if (loading) return <Loading />

    return (
        <form className="flex flex-col gap-4 px-3 md:w-1/3 md:mx-auto mt-10 font-light" onSubmit={formik.handleSubmit}>
            <h3 className='text-center text-gray-500 mb-5 font-medium'>
                ورود به حساب کاربری
            </h3>
            <Input lable='ایمیل' name='email' type='email' placeholder='aminbabaei_dev@yahoo.com' formik={formik} />
            <Input lable='کلمه عبور' name='password' type='password' placeholder='****' formik={formik} />
            <button type="submit" disabled={!(formik.isValid)} className={`font-medium py-3 text-sm w-full rounded text-white ${(formik.isValid) ? 'bg-red-700 hover:hover:opacity-80' : 'bg-gray-500'}`}>
                ورود به حساب کاربری
            </button>
            <Link to='/signup' className='text-sm cursor-pointer w-fit font-medium'>
                ثبت نام نکردید؟ ثبت نام
            </Link>
        </form>
    );
}

export default SigninForm;