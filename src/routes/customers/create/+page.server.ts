import { fail, redirect } from '@sveltejs/kit'
import { createCustomer } from '$lib/server/customers'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()

        const payload = {
            first_name:         form.get('first_name') as string,
            last_name:          form.get('last_name') as string,
            email:              form.get('email') as string,
            phone:              form.get('phone') as string || undefined,
            company_name:       form.get('company_name') as string || undefined,
            company_reg_number: form.get('company_reg_number') as string || undefined,
            vat_number:         form.get('vat_number') as string || undefined,
            street_address:     form.get('street_address') as string || undefined,
            suburb:             form.get('suburb') as string || undefined,
            city:               form.get('city') as string || undefined,
            province:           form.get('province') as string || undefined,
            postal_code:        form.get('postal_code') as string || undefined,
            notes:              form.get('notes') as string || undefined,
        }

        try {
            await createCustomer(token, payload)
        } catch (err: any) {
            return fail(err.status ?? 500, {
                error: err.message ?? 'Failed to create customer.',
                errors: err.errors ?? {},
                ...payload,
            })
        }

        redirect(303, '/customers')
    },
}