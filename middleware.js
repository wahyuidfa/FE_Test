import { NextResponse } from "next/server";

export async function middleware(request) {
    // Ambil cookie session dari request
    const sessionCookie = request.cookies.get("authToken");
    const currentPath = new URL(request.url).pathname;

    // Jika cookie ada dan pengguna mengakses halaman login, redirect ke dashboard
    if (sessionCookie && currentPath === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Jika tidak ada cookie dan pengguna mengakses halaman dilindungi, redirect ke login
    if (!sessionCookie && ["/dashboard", "/laporan-lalin-perhari", "/master-gerbang"].includes(currentPath)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Lanjutkan ke halaman yang diminta
    return NextResponse.next();
}

// Tentukan path yang menggunakan middleware
export const config = {
    matcher: ["/dashboard", "/laporan-lalin-perhari", "/master-gerbang", "/login"],
};
