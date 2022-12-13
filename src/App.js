import { Route, Routes } from "react-router-dom"
import AppContainers from "./containers/AppContainers"
import Layout from "./containers/Layout"
import Support from "./pages/Support"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import PostDetail from "./pages/posts/PostDetail"
import ProfileContainer from "./containers/ProfileContainer"
import Bookmarks from "./pages/profile/Bookmarks"
import MyPosts from "./pages/profile/MyPosts"
const App = () => {
  return (
    <Routes>
    <Route path="/" element={<AppContainers />} />
    <Route element={<Layout/>}>
      <Route path="/support" element={<Support/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/posts/:slug/:hashId" element={<PostDetail/>} />
      <Route element={<ProfileContainer/>}>
        <Route path="/profile/bookmarks" element={<Bookmarks/>} />
        <Route path="/profile/my-posts" element={<MyPosts/>} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Route>
  </Routes>
  )
}

export default App