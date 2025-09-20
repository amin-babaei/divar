import Category from "@/features/ads/category/Category";
import Sort from "@/features/ads/sort/Sort";
import SidebarFooter from "@/ui/SidebarFooter";

const HomeLayout = ({ children }) => {

  return (
      <section className="container mx-auto px-3 relative">
        <div className="flex mt-5 gap-x-4 overflow-auto sm:block sm:mt-0 sm:fixed sm:w-56 sm:top-28 sm:overflow-scroll sm:side-h hide-scroll z-10">
          <Category />
          <hr className='text-gray-300' />
          <Sort />
          <hr className='text-gray-300' />
          <SidebarFooter/>
        </div>
        {children}
      </section>
  );
}

export default HomeLayout;
