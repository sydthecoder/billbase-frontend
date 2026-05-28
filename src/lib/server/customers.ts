import { serverApi } from './api'
import type { Customer, CreateCustomerPayload } from '$lib/types'

export async function getCustomers(token: string): Promise<Customer[]> {
    const response = await serverApi('/customers', {}, `auth_token=${token}`)

    if (!response.ok) {
        throw new Error('Failed to fetch customers')
    }

    const json = await response.json()
    return json.data
}

export async function createCustomer(
    token: string,
    payload: CreateCustomerPayload
): Promise<Customer> {
    const response = await serverApi('/customers', {
        method: 'POST',
        body: JSON.stringify(payload),
    }, `auth_token=${token}`)

    if (!response.ok) {
        const json = await response.json()
        throw { status: response.status, errors: json.errors ?? {}, message: json.message }
    }

    const json = await response.json()
    return json.data
}