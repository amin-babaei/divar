import * as Yup from "yup";


export const validationSignin = Yup.object({
    email:Yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password:Yup.string().required('کلمه عبور الزامی است').min(8, 'کلمه عبور حداقل 8 کاراکتر باشد'),
})