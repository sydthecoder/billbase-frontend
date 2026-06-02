export async function serverApi(
    path: string,
    options: RequestInit = {},
    cookieHeader?: string
) {
    const response = await fetch(`https://api.billbase.co.za${path}`, {
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