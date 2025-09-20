import * as Yup from "yup";

const SUPPORT_FORMAT = ["image/jpg","image/png","image/jpeg","image/webp"]

export const validationCreatePost = Yup.object({
    category:Yup.mixed().required('لطفا دسته بندی مرتبط را وارد کنید'),
    title:Yup.string().required('عنوان آگهی را وارد کنید'),
    price:Yup.string().required('قیمت محصول را وارد کنید'),
    description:Yup.string().required('توضیحات را وارد کنید'),
    image:Yup.mixed().required('بارگذاری عکس الزامی است').test("FILE_SIZE","حجم عکس شما بیش از حد مجاز است",
    value => value && value.size <= 1024 * 1024 ).test("FILE_FORMAT","این فرمت پشتیبانی نمی شود",
    value => value && SUPPORT_FORMAT.includes(value?.type || value?.mimetype))
})