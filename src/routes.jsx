import { createBrowserRouter, redirect } from "react-router";
import ProfileLayout from "./layouts/ProfileLayout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import VerifyAdsPage from "./pages/admin/VerifyAdsPage";
import Chat from "./pages/chat/Chat";
import Message from "./pages/chat/Message";
import AdsDetail from "./pages/ads/AdsDetail";
import CreateAdPage from "./pages/ads/create/CreateAdPage";
import Bookmarks from "./pages/profile/Bookmarks";
import MyAds from "./pages/profile/MyAds";
import { SecureRoute } from "@/features/auth/SecureRoute";
import SecureAdminRoute from "@/features/auth/admin/SecureAdminRoute";
import Layout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import http from "./services/httpService";
import Home from "./pages/Home";

const router = createBrowserRouter([{
  element: <Layout /> ,
  errorElement: <NotFound /> ,
  // public routes
  children: [{
      index: true,
      element: <Home />
    },
    {
      path: "/support",
      element: <Support /> ,
    },
    {
      path: "/signup",
      element: <Signup /> ,
    },
    {
      path: "/signin",
      element: <Signin /> ,
    },
    {
      path: "/ads/:hashId/:slug",
      element: <AdsDetail /> ,
    },
    // private routes
    {
      element: <SecureRoute /> ,
      children: [{
          path: "/ads/create",
          element: <CreateAdPage /> ,
        },
        {
          path: "/ads/edit/:hashId/:slug",
          element: <CreateAdPage /> ,
        },
        {
          path: "/chat",
          element: <Chat / > ,
          children: [{
            path: "/chat/:chatId",
            element: <Message /> ,
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
          element: <ProfileLayout /> ,
          children: [{
              path: "/profile/bookmarks",
              element: <Bookmarks /> ,
            },
            {
              path: "/profile/my-ads",
              element: <MyAds /> ,
            },
          ],
        },
      ],
    },
    // admin routes
    {
      element: <SecureAdminRoute /> ,
      children: [{
        path: "/admin/ads-verify",
        element: <VerifyAdsPage /> ,
      }, ],
    },
  ]
}, ]);

export default router;