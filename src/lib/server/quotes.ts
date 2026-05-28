import { serverApi } from './api'
import type { Quote, CreateQuotePayload } from '$lib/types'

export async function getQuotes(token: string): Promise<Quote[]> {
    const response = await serverApi('/quotes', {}, `auth_token=${token}`)

    if (!response.ok) throw new Error('Failed to fetch quotes')

    const json = await response.json()
    return json.data
}

export async function getQuote(token: string, id: number): Promise<Quote> {
    const response = await serverApi(`/quotes/${id}`, {}, `auth_token=${token}`)

    if (!response.ok) throw new Error('Failed to fetch quote')

    const json = await response.json()
    return json.data
}

export async function createQuote(token: string, payload: CreateQuotePayload): Promise<Quote> {
    const response = await serverApi('/quotes', {
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

export async function updateQuoteStatus(token: string, id: number, status: string): Promise<Quote> {
    const response = await serverApi(`/quotes/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }, `auth_token=${token}`)

    if (!response.ok) {
        const json = await response.json()
        throw { status: response.status, message: json.message }
    }

    const json = await response.json()
    return json.data
}

export async function deleteQuote(token: string, id: number): Promise<void> {
    const response = await serverApi(`/quotes/${id}`, {
        method: 'DELETE',
    }, `auth_token=${token}`)

    if (!response.ok) throw new Error('Failed to delete quote')
}