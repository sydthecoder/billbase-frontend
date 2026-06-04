import { fail } from '@sveltejs/kit'
import { getQuotes, deleteQuote, updateQuoteStatus } from '$lib/server/quotes'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!
    const quotes = await getQuotes(token)
    return { quotes }
}

export const actions: Actions = {
    delete: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()
        const id = Number(form.get('id'))

        try {
            await deleteQuote(token, id)
            return { success: true }
        } catch (err: any) {
            return fail(500, { error: 'Failed to delete quote.' })
        }
    },

    bulkDelete: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()
        const ids = form.getAll('ids').map(Number)

        try {
            await Promise.all(ids.map(id => deleteQuote(token, id)))
            return { success: true }
        } catch (err: any) {
            return fail(500, { error: 'Failed to delete quotes.' })
        }
    },

    updateStatus: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()
        const id = Number(form.get('id'))
        const status = form.get('status') as string

        try {
            await updateQuoteStatus(token, id, status)
            return { success: true }
        } catch (err: any) {
            return fail(500, { error: 'Failed to update status.' })
        }
    },
}