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
import CreatePost from "./pages/posts/create/CreatePost"
import Chat from "./pages/chat/Chat"
import { SecureRoute } from "./utils/SecureRoute"
import Message from "./pages/chat/Message"
import ProtectedAdmin from "./utils/checkAdmin"
import VerifyPost from "./pages/admin/VerifyPost"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainers />} />
      <Route element={<Layout />}>
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/posts/:hashId/:slug" element={<PostDetail />} />
        <Route element={<SecureRoute />}>
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/edit/:hashId/:slug" element={<CreatePost />} />
          <Route path="/chat" element={<Chat/>}>
            <Route path="/chat/:chatId" element={<Message/>}/>
          </Route>
          <Route element={<ProfileContainer />}>
            <Route path="/profile/bookmarks" element={<Bookmarks />} />
            <Route path="/profile/my-posts" element={<MyPosts />} />
          </Route>
            <Route element={<ProtectedAdmin/>}>
              <Route path="/admin/post-verify" element={<VerifyPost/>} />
            </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App