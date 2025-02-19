import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";

const publicRoutes = [
  { path: "/auth/Login", whenAuthenticated: "redirect" },
  { path: "/auth/SignUp", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
  { path: "/About", whenAuthenticated: "next" },
  { path: "/Blog", whenAuthenticated: "next" },
  { path: /^\/Blog\/BlogPage\/\d+$/, whenAuthenticated: "next" },
  { path: "/Contact", whenAuthenticated: "next" },
  { path: "/Contact/BecomeAPartner", whenAuthenticated: "next" },
  { path: "/OurServices", whenAuthenticated: "next" },
  { path: "/OurServices/OurFleet", whenAuthenticated: "next" },
  { path: /^\/OurServices\/ServicePage\/\d+$/, whenAuthenticated: "next" },
  { path: "/BookATrip", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth/Login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("NEVESJR_TOKEN");
  const publicRoute = publicRoutes.find((route) =>
    typeof route.path === "string" ? route.path === path : route.path.test(path)
  );
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }
  if (authToken && publicRoute?.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/Internal";
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|[^/]+\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff2?|ttf|eot)).*)",
  ],
};
