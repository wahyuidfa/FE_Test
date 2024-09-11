import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies()
    try {
        if (cookieStore.get('authToken')) {
            cookieStore.delete('authToken')

            return new Response(JSON.stringify({ message: 'Logout successful' }), {
                status: 200,
            });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
        });
    }
}