import { NextResponse } from "next/server";

const getUserToken = async (req) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/load`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${req.cookies.get('userToken')?.name}=${req.cookies.get('userToken')?.value}`
    }
  });
  const data = await res.json();
  return data._id;
};

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;
  const userId = await getUserToken(req);
  
  const requiresNamedParams = ["/profile","/chat","/post/edit"];
  
  const requiresExactPath = ["/chat","/post/create"];
  
  if (requiresNamedParams.some(path => pathname.startsWith(path)) && !userId) {
    return NextResponse.redirect(new URL("/no-auth", url));
  }

  if (requiresExactPath.includes(pathname) && !userId) {
    return NextResponse.redirect(new URL("/no-auth", url));
  }

  if (pathname === "/no-auth" && userId) {
    return NextResponse.redirect(new URL("/not-found", url));
  }

  if (pathname === "/signin" && userId) {
    return NextResponse.redirect(new URL("/", url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/chat/:path*", "/post/edit/:path*", "/chat", "/post/create", "/no-auth", "/signin"],
};