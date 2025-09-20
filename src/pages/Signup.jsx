import { SEO } from '@/utils/SEO.js';
import SignupForm from '@/features/auth/SignupForm.jsx';

const Signup = () => {

    return (
        <>
            <SEO
                title="امین دیوار - ثبت نام"
                description="حساب کاربری بسازید و رایگان آگهی ثبت کنید"
                pageType="private"
                ogType="website"
            />
            <SignupForm />
        </>

    )
}

export default Signup