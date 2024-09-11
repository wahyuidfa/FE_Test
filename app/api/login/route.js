import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(req) {
    try {
        // Parsing body dari request
        const body = await req.json();
        const { username, password } = body;

        // Mengirim request ke backend external
        const response = await axios.post(`${process.env.API_BASE_URL}/auth/login`, {
            username,
            password,
        });

        // Ambil token dari respons backend eksternal
        const { token } = response.data;

        // Set cookie untuk token
        cookies().set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24
        })


        // Return success response
        return new Response(JSON.stringify({ message: 'Login successful', token }), {
            status: 200,
        });
    } catch (err) {
        console.error('Login error:', err);

        // Handle error from axios
        if (err.response) {
            return new Response(JSON.stringify({
                error: err.response.data.message,
                status: err.response.status,
            }), {
                status: err.response.status,
            });
        }

        // Return internal server error for unknown errors
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
        });
    }
}
