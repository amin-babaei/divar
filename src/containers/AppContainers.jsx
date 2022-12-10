import Navbar from "../components/navbar/Navbar"
import PostsContainer from "./PostsContainer";
import SidebarContainer from "./SidebarContainer"
const AppContainers = () => {
  
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-3 relative font-Ilight">
        <SidebarContainer/>
        <PostsContainer/>
      </section>
    </>
  );
}

export default AppContainers;
