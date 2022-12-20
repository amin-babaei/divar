import Helmet from "react-helmet";
import Navbar from "../components/navbar/Navbar"
import PostsContainer from "./PostsContainer";
import SidebarContainer from "./SidebarContainer"
const AppContainers = () => {

  return (
    <>
      <Helmet>
        <title>دیوار</title>
      </Helmet>
      <Navbar />
      <section className="container mx-auto px-3 relative font-Ilight">
        <SidebarContainer />
        <PostsContainer />
      </section>
    </>
  );
}

export default AppContainers;
