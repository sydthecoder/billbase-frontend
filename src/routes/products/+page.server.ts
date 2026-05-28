import { fail } from '@sveltejs/kit'
import { getProducts, getCategories, createCategory } from '$lib/server/products'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!

    const [products, categories] = await Promise.all([
        getProducts(token),
        getCategories(token),
    ])

    return { products, categories }
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
}