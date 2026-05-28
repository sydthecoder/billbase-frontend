import { getCustomers } from '$lib/server/customers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth_token')!

    const customers = await getCustomers(token)

    return { customers }
}