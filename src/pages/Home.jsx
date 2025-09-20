import Ads from "@/features/ads/Ads";
import HomeLayout from "@/layouts/HomeLayout";
import { SEO } from "@/utils/SEO";

const Home = () => {
    return (
        <HomeLayout>
            <SEO
                title="امین دیوار"
                description="در امین دیوار رایگان آگهی ثبت کنید و صدها آگهی و نیازمندی را در شهر مشهد مشاهده کنید"
                ogUrl={import.meta.env.VITE_BASE_URL}
                ogType="website"
                ogTitle="امین دیوار | مرجع آگهی و نیازمندی‌های نو و دست دو در مشهد"
                ogDescription="امین دیوار بستری برای ثبت و مشاهده آگهی‌های خرید و فروش کالا و خدمات در مشهد."
                ogImage={`${import.meta.env.VITE_BASE_URL}/logo.svg`}
                pageType="public"
            />
            <Ads />
        </HomeLayout>
    );
}

export default Home;