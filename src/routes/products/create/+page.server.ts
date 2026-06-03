import { fail, redirect } from '@sveltejs/kit'
import { getCategories, createProduct, createCategory } from '$lib/server/products'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!
    const categories = await getCategories(token)
    return { categories }
}

export const actions: Actions = {
    createProduct: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()

        const payload = {
            product_category_id: form.get('product_category_id') ? Number(form.get('product_category_id')) : undefined,
            name:                form.get('name') as string,
            description:         form.get('description') as string || undefined,
            price:               Number(form.get('price')),
            unit:                form.get('unit') as string || undefined,
            is_taxable:          form.get('is_taxable') === 'true',
            sku:                 form.get('sku') as string || undefined,
        }

        try {
            await createProduct(token, payload)
        } catch (err: any) {
            return fail(err.status ?? 500, {
                error: err.message ?? 'Failed to create product.',
                errors: err.errors ?? {},
                ...payload,
            })
        }

        redirect(303, '/products')
    },

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