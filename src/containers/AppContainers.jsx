import { SEO } from "../utils/SEO";
import Navbar from "../components/navbar/Navbar"
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
        ogTitle=" امین دیوار : مرجع انواع نیازمندی و آگهی‌های نو و دست دو در شهر مشهد"
        ogDescription="امین دیوار : مرجع انواع نیازمندی و آگهی‌های نو و دست دو در شهر مشهد"
        ogImage={`${process.env.REACT_APP_BASE_URL}/logo.svg`}
      />
      <Navbar />
      <section className="container mx-auto px-3 relative">
        <SidebarContainer />
        <PostsContainer />
      </section>
    </>
  );
}

export default AppContainers;
