import PostContainer from "./home/Posts"
import SidebarContainer from "./home/Sidebar"

export const dynamic = "force-dynamic"

export default async function Home() {

  return (
      <section className="container mx-auto px-3 relative font-Ilight">
        <SidebarContainer/>
        <PostContainer/>
      </section>
  )
}
