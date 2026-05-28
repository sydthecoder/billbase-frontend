import { fail, redirect } from '@sveltejs/kit'
import { getCustomers } from '$lib/server/customers'
import { getProducts } from '$lib/server/products'
import { createQuote } from '$lib/server/quotes'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!

    const [customers, products] = await Promise.all([
        getCustomers(token),
        getProducts(token),
    ])

    return { customers, products }
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()

        // Parse items from form
        const items: any[] = []
        let index = 0

        while (form.has(`items[${index}][description]`)) {
            items.push({
                product_id:      form.get(`items[${index}][product_id]`) ? Number(form.get(`items[${index}][product_id]`)) : undefined,
                description:     form.get(`items[${index}][description]`) as string,
                quantity:        Number(form.get(`items[${index}][quantity]`)),
                unit:            form.get(`items[${index}][unit]`) as string || undefined,
                unit_price:      Number(form.get(`items[${index}][unit_price]`)),
                is_taxable:      form.get(`items[${index}][is_taxable]`) === 'true',
                discount_amount: form.get(`items[${index}][discount_amount]`) ? Number(form.get(`items[${index}][discount_amount]`)) : undefined,
                sort_order:      index,
            })
            index++
        }

        const payload = {
            customer_id:      Number(form.get('customer_id')),
            title:            form.get('title') as string || undefined,
            issue_date:       form.get('issue_date') as string,
            expires_at:       form.get('expires_at') as string,
            discount_amount:  form.get('discount_amount') ? Number(form.get('discount_amount')) : undefined,
            discount_percent: form.get('discount_percent') ? Number(form.get('discount_percent')) : undefined,
            notes:            form.get('notes') as string || undefined,
            footer:           form.get('footer') as string || undefined,
            items,
        }

        try {
            await createQuote(token, payload)
        } catch (err: any) {
            return fail(err.status ?? 500, {
                error: err.message ?? 'Failed to create quote.',
                errors: err.errors ?? {},
            })
        }

        redirect(303, '/quotes')
    },
}