import { getSession } from "next-auth/react";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const cookie = req.headers.get("cookie");

  const session = cookie
    ? await getSession({ req: { headers: { cookie } } as any })
    : null;

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}
