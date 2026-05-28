import { API_BASE_URL } from '$env/static/private'

export async function serverApi(
    path: string,
    options: RequestInit = {},
    cookieHeader?: string
) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
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