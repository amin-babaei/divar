import SigninForm from "@/features/auth/SigninForm"
import { SEO } from '@/utils/SEO';

const Signin = () => {

    return (
        <>
            <SEO
                title="امین دیوار - ورود به حساب کاربری"
                description="وارد حساب کاربری خود شوید و آگهی‌ها را مدیریت کنید"
                pageType='private'
                ogType='website'
            />
            <SigninForm />
        </>

    )
}

export default Signin