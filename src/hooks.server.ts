import { redirect } from '@sveltejs/kit'
import { serverApi } from '$lib/server/api'
import type { Handle } from '@sveltejs/kit'

const publicRoutes = ['/login', '/register']

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('auth_token')
    const isPublic = publicRoutes.some(route => event.url.pathname.startsWith(route))

    if (!isPublic) {
        if (!token) {
            redirect(303, '/login')
        }

        // Validate token with Laravel and load user into every request
        const response = await serverApi('/auth/me', {}, `auth_token=${token}`)

        if (!response.ok) {
            event.cookies.delete('auth_token', { path: '/' })
            redirect(303, '/login')
        }

        const json = await response.json()
        event.locals.user = json.data.user
    }

    return resolve(event)
}