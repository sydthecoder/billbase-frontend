import { fail, redirect } from '@sveltejs/kit'
import { serverApi } from '$lib/server/api'
import { dev } from '$app/environment'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData()

        const email = form.get('email') as string
        const password = form.get('password') as string

        if (!email || !password) {
            return fail(422, { error: 'All fields are required.' })
        }

        const response = await serverApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })

        const json = await response.json()

        if (!response.ok) {
            return fail(response.status, {
                error: json.message ?? 'Registration failed.',
                email,
            })
        }

        const setCookie = response.headers.get('set-cookie')

        if (setCookie) {
            const token = setCookie.match(/auth_token=([^;]+)/)?.[1]

            if (token) {
                cookies.set('auth_token', token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: !dev,
                    maxAge: 60 * 60 * 24 * 7,
                })
            }
        }

        redirect(303, '/')
    },
}