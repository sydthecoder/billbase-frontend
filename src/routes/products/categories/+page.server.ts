import { fail } from '@sveltejs/kit'
import { getCategories, createCategory, deleteCategory } from '$lib/server/products'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!
    const categories = await getCategories(token)
    return { categories }
}

export const actions: Actions = {
    createCategory: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()

        const payload = {
            name:        form.get('name') as string,
            description: form.get('description') as string || undefined,
        }

        try {
            await createCategory(token, payload)
            return { success: true }
        } catch (err: any) {
            return fail(err.status ?? 500, {
                categoryError: err.message ?? 'Failed to create category.',
            })
        }
    },

    deleteCategory: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()
        const id = Number(form.get('id'))

        try {
            await deleteCategory(token, id)
            return { success: true }
        } catch (err: any) {
            return fail(500, { categoryError: 'Failed to delete category.' })
        }
    },
}