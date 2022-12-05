import Navbar from "../components/Navbar"
import SidebarContainer from "./SidebarContainer"
const AppContainers = () => {
  
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-3 relative">
        <SidebarContainer/>
      </section>
    </>
  );
}

export default AppContainers;
