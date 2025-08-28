import {
  createBrowserRouter,
  redirect
} from "react-router";
import AppContainers from "./containers/AppContainers";
import ProfileContainer from "./containers/ProfileContainer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import VerifyPost from "./pages/admin/VerifyPost";
import Chat from "./pages/chat/Chat";
import Message from "./pages/chat/Message";
import PostDetail from "./pages/posts/PostDetail";
import CreatePost from "./pages/posts/create/CreatePost";
import Bookmarks from "./pages/profile/Bookmarks";
import MyPosts from "./pages/profile/MyPosts";
import { SecureRoute } from "./utils/SecureRoute";
import ProtectedAdmin from "./utils/checkAdmin";
import Layout from "./containers/Layout";
import NotFound from "./pages/NotFound";
import http from "./services/httpService";

const router = createBrowserRouter([{
  element: < Layout / > ,
  errorElement: < NotFound / > ,
  // public routes
  children: [{
      index: true,
      element: < AppContainers / >
    },
    {
      path: "/support",
      element: < Support / > ,
    },
    {
      path: "/signup",
      element: < Signup / > ,
    },
    {
      path: "/signin",
      element: < Signin / > ,
    },
    {
      path: "/posts/:hashId/:slug",
      element: < PostDetail / > ,
    },
    // private routes
    {
      element: < SecureRoute / > ,
      children: [{
          path: "/posts/create",
          element: < CreatePost / > ,
        },
        {
          path: "/posts/edit/:hashId/:slug",
          element: < CreatePost / > ,
        },
        {
          path: "/chat",
          element: < Chat / > ,
          children: [{
            path: "/chat/:chatId",
            element: < Message / > ,
            loader: async ({
              params
            }) => {
              try {
                const res = await http.get(`/api/messages/${params.chatId}`);
                return res.data;
              } catch (err) {
                if (err?.response?.status === 404) {
                  throw redirect("/not-found");
                }
              }
            },
            action: async ({
              params,
              request
            }) => {
              if (request.method === "DELETE") {
                const form = await request.formData();
                const userId = form.get("userId");

                try {
                  const {
                    status
                  } = await http.delete(`/api/user/delete/chat/${params.chatId}/${userId}`);
                  if (status === 200) {
                    window.location.href = "/chat"
                  }
                } catch {
                  throw new Response("حذف گفتگو ناموفق بود", {
                    status: 500
                  });
                }
              }
            }
          }, ],
        },
        {
          path: "/profile",
          element: < ProfileContainer / > ,
          children: [{
              path: "/profile/bookmarks",
              element: < Bookmarks / > ,
            },
            {
              path: "/profile/my-posts",
              element: < MyPosts / > ,
            },
          ],
        },
      ],
    },
    // admin routes
    {
      element: < ProtectedAdmin / > ,
      children: [{
        path: "/admin/post-verify",
        element: < VerifyPost / > ,
      }, ],
    },
  ]
}, ]);

export default router;