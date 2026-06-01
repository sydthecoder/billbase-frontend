import { getCustomers } from '$lib/server/customers'
import { deleteCustomer } from '$lib/server/customers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!

    const customers = await getCustomers(token)

    return { customers }
}

export const actions: Actions = {
    delete: async ({ request, cookies }) => {
        const token = cookies.get('auth_token')!
        const form = await request.formData()
        const id = Number(form.get('id'))

        try {
            await deleteCustomer(token, id)
            return { success: true }
        } catch {
            return fail(500, { error: 'Failed to delete customer.' })
        }
    },
}