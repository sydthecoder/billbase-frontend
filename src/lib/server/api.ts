import { env } from "$env/dynamic/private";

export async function serverApi(
    path: string,
    options: RequestInit = {},
    cookieHeader?: string
) {
    const baseUrl = env.API_BASE_URL;

    const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            ...options.headers,
        },
    })

    return response
}