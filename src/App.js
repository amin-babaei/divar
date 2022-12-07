import { Route, Routes } from "react-router-dom"
import AppContainers from "./containers/AppContainers"
import Layout from "./containers/Layout"
import Support from "./pages/Support"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
const App = () => {
  return (
    <Routes>
    <Route path="/" element={<AppContainers />} />
    <Route element={<Layout/>}>
      <Route path="/support" element={<Support/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="*" element={<NotFound/>} />
    </Route>
  </Routes>
  )
}

export default App