import { useLocation } from "react-router";
import CreateAd from "@/features/ads/create/CreateAd";
import { SEO } from "@/utils/SEO";

const CreateAdPage = () => {

    const { pathname } = useLocation()

    return (
        <>
            <SEO
                title={`امین دیوار - ${pathname.startsWith('/ads/edit') ? 'ویرایش' : 'ثبت'} آگهی`}
                description="آگهی خود را رایگان ثبت کنید و در مشهد دیده شوید"
                pageType='private'
                ogType='website'
            />
            <CreateAd />
        </>
    );
}

export default CreateAdPage;