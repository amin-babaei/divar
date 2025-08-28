import { SEO } from "../utils/SEO";
import PostsContainer from "./PostsContainer";
import SidebarContainer from "./SidebarContainer"
const AppContainers = () => {

  return (
    <>
      <SEO 
        title="امین دیوار"
        description="در امین دیوار رایگان آگهی ثبت کنید و صدها آگهی و نیازمندی را در شهر مشهد مشاهده کنید"
        ogUrl={process.env.REACT_APP_BASE_URL}
        ogType="website"
        ogTitle="امین دیوار | مرجع آگهی و نیازمندی‌های نو و دست دو در مشهد"
        ogDescription="امین دیوار بستری برای ثبت و مشاهده آگهی‌های خرید و فروش کالا و خدمات در مشهد."
        ogImage={`${process.env.REACT_APP_BASE_URL}/logo.svg`}
        pageType="public"
      />
      <section className="container mx-auto px-3 relative">
        <SidebarContainer />
        <PostsContainer />
      </section>
    </>
  );
}

export default AppContainers;
