import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "", whenAuthenticated: "next" },
  { path: "/auth/Login", whenAuthenticated: "redirect" },
  { path: "/auth/SignUp", whenAuthenticated: "redirect" },
  { path: "/auth/ValidateCode", whenAuthenticated: "redirect" },
  { path: "/auth/NewPassword", whenAuthenticated: "redirect" },
  { path: "/auth/RecoverPassword", whenAuthenticated: "redirect" },
  { path: /^\/auth\/NewPassword\/\d+$/, whenAuthenticated: "redirect" },
  { path: /^\/activate-account(\/|\?|$)/, whenAuthenticated: "redirect" },
  { path: "/About", whenAuthenticated: "next" },
  { path: "/Blog", whenAuthenticated: "next" },
  { path: /^\/BookATrip\d+$/, whenAuthenticated: "next" },
  { path: "/privacy-policy", whenAuthenticated: "next" },
  { path: "/BookATrip", whenAuthenticated: "next" },
  { path: /^\/Blog\/BlogPage\/\d+$/, whenAuthenticated: "next" },
  { path: "/Contact", whenAuthenticated: "next" },
  { path: "/Contact/BecomeAPartner", whenAuthenticated: "next" },
  { path: "/OurServices", whenAuthenticated: "next" },
  { path: "/OurServices/OurFleet", whenAuthenticated: "next" },
  { path: /^\/OurServices\/ServicePage\/\d+$/, whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth/Login";

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const locale = request.nextUrl.locale || routing.defaultLocale;

  const path = request.nextUrl.pathname.replace(
    new RegExp(`^/(${routing.locales.join("|")})`),
    ""
  );

  const authToken = request.cookies.get("NEVESJR_TOKEN");
  const RecoverPasswordToken = request.cookies.get("code-validation");

  const publicRoute = publicRoutes.find((route) =>
    typeof route.path === "string" ? route.path === path : route.path.test(path)
  );

  const NewPasswordRoute = publicRoute?.path === "/auth/NewPassword";
  if (NewPasswordRoute && !RecoverPasswordToken) {
    const redirectUrl = new URL(
      `/${locale}${REDIRECT_WHEN_NOT_AUTHENTICATED}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (NewPasswordRoute && RecoverPasswordToken) {
    return response;
  }

  if (!authToken && publicRoute) {
    return response;
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = new URL(
      `/${locale}${REDIRECT_WHEN_NOT_AUTHENTICATED}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute?.whenAuthenticated === "redirect") {
    const redirectUrl = new URL(`/${locale}/Internal`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|[^/]+\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff2?|ttf|eot)).*)",
  ],
};
