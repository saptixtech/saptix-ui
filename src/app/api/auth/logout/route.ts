import { NextRequest, NextResponse } from "next/server";

const COOKIES_TO_CLEAR = [
  "saptix_token",
  "saptix_session",
  "saptix_auth",
  "saptix_sso_session",
  "token",
  "refreshToken",
];

function applyClearedCookies(response: NextResponse) {
  const expired = "Thu, 01 Jan 1970 00:00:00 GMT";
  for (const name of COOKIES_TO_CLEAR) {
    // 1. Wildcard domain (.saptix.tech)
    response.headers.append(
      "Set-Cookie",
      `${name}=; Domain=.saptix.tech; Path=/; Expires=${expired}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    );
    // 2. Exact domain (saptix.tech)
    response.headers.append(
      "Set-Cookie",
      `${name}=; Domain=saptix.tech; Path=/; Expires=${expired}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    );
    // 3. Host-only
    response.headers.append(
      "Set-Cookie",
      `${name}=; Path=/; Expires=${expired}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    );
    // 4. Non-HttpOnly for client scripts
    response.headers.append(
      "Set-Cookie",
      `${name}=; Domain=.saptix.tech; Path=/; Expires=${expired}; Max-Age=0; SameSite=Lax`
    );
    response.headers.append(
      "Set-Cookie",
      `${name}=; Path=/; Expires=${expired}; Max-Age=0; SameSite=Lax`
    );
  }
  return response;
}

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully from Saptix Ecosystem",
    });
    return applyClearedCookies(response);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Logout failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redirectTarget =
    url.searchParams.get("redirect") || `${url.origin}/login?logged_out=1`;
  const response = NextResponse.redirect(new URL(redirectTarget, req.url));
  return applyClearedCookies(response);
}
