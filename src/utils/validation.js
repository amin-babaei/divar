import * as Yup from "yup";

export const validationSignin = Yup.object({
    email:Yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password:Yup.string().required('کلمه عبور الزامی است').min(8, 'کلمه عبور حداقل 8 کاراکتر باشد'),
})
export const validationSignup = Yup.object({
    name:Yup.string().required('نام و نام خانوادگی الزامی است').min(6,'حداقل 6 کاراکتر باشد'),
    email:Yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password:Yup.string().required('کلمه عبور الزامی است').min(8, 'کلمه عبور حداقل 8 کاراکتر باشد'),
    phoneNumber:Yup.string().required('شماره تلفن الزامی است').matches(/09([0-9])-?[0-9]{4}-?[0-9]{4}/,'شماره تلفن اشتباه است'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),""],'کلمه عبور همخوانی ندارد').required('تکرار کلمه عبور الزامی است')
})
export const validationCreatePost = Yup.object({
    title:Yup.string().required('عنوان آگهی را وارد کنید'),
    price:Yup.string().required('قیمت محصول را وارد کنید'),
    description:Yup.string().required('توضیحات را وارد کنید')
})