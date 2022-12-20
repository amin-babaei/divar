import * as Yup from "yup";

const SUPPORT_FORMAT = ["image/jpg","image/png","image/jpeg","image/webp"]

export const validationSignin = Yup.object({
    email:Yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password:Yup.string().required('کلمه عبور الزامی است').min(8, 'کلمه عبور حداقل 8 کاراکتر باشد'),
})
export const validationSignup = Yup.object({
    name:Yup.string().required('نام و نام خانوادگی الزامی است').min(6,'حداقل 6 کاراکتر باشد'),
    email:Yup.string().required('ایمیل الزامی است').email('ایمیل نامعتبر است'),
    password:Yup.string().required('کلمه عبور الزامی است').min(8, 'کلمه عبور حداقل 8 کاراکتر باشد'),
    phoneNumber:Yup.string().required('شماره تلفن الزامی است').matches(/09([0-9])-?[0-9]{4}-?[0-9]{4}/,'شماره تلفن اشتباه است'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),""],'کلمه عبور همخوانی ندارد').required('تکرار کلمه عبور الزامی است'),
    token:Yup.string().required("شما ربات هستید !").nullable()
})
export const validationCreatePost = Yup.object({
    title:Yup.string().required('عنوان آگهی را وارد کنید'),
    price:Yup.string().required('قیمت محصول را وارد کنید'),
    description:Yup.string().required('توضیحات را وارد کنید'),
    image:Yup.mixed().required('بارگذاری عکس الزامی است').test("FILE_SIZE","حجم عکس شما بیش از حد مجاز است",
    value => value && value.size <= 1024 * 1024 ).test("FILE_FORMAT","این فرمت پشتیبانی نمی شود",
    value => value && SUPPORT_FORMAT.includes(value?.type))
})