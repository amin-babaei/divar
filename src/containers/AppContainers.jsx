import Navbar from "../components/navbar/Navbar"
import AdsContainer from "./AdsContainer";
import SidebarContainer from "./SidebarContainer"
const AppContainers = () => {
  
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-3 relative">
        <SidebarContainer/>
        <AdsContainer/>
      </section>
    </>
  );
}

export default AppContainers;
