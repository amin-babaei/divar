import * as Yup from "yup";

export const validationSignup = Yup.object({
    name:Yup.string().required('نام و نام خانوادگی الزامی است').min(6,'حداقل 6 کاراکتر باشد'),
    email:Yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password:Yup.string().required('کلمه عبور الزامی است').min(8, 'کلمه عبور حداقل 8 کاراکتر باشد'),
    phoneNumber:Yup.string().required('شماره تلفن الزامی است').matches(/09([0-9])-?[0-9]{4}-?[0-9]{4}/,'شماره تلفن اشتباه است'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),""],'کلمه عبور همخوانی ندارد').required('تکرار کلمه عبور الزامی است'),
    token:Yup.string().required("شما ربات هستید !").nullable()
})