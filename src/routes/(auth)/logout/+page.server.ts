import { redirect } from '@sveltejs/kit'
import { serverApi } from '$lib/server/api'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ cookies }) => {
        const token = cookies.get('auth_token')

        if (token) {
            await serverApi('/auth/logout', {
                method: 'POST',
                headers: { Cookie: `auth_token=${token}` },
            })
        }

        cookies.delete('auth_token', { path: '/' })

        redirect(303, '/login')
    },
}