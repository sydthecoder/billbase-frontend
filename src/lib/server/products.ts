import { serverApi } from './api'
import type { Product, ProductCategory, CreateProductPayload, CreateProductCategoryPayload } from '$lib/types'

// ── Products ─────────────────────────────────────────────────

export async function getProducts(token: string): Promise<Product[]> {
    const response = await serverApi('/products', {}, `auth_token=${token}`)

    if (!response.ok) throw new Error('Failed to fetch products')

    const json = await response.json()
    return json.data
}

export async function createProduct(token: string, payload: CreateProductPayload): Promise<Product> {
    const response = await serverApi('/products', {
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

// ── Categories ───────────────────────────────────────────────

export async function getCategories(token: string): Promise<ProductCategory[]> {
    const response = await serverApi('/products/categories', {}, `auth_token=${token}`)

    if (!response.ok) throw new Error('Failed to fetch categories')

    const json = await response.json()
    return json.data
}

export async function createCategory(token: string, payload: CreateProductCategoryPayload): Promise<ProductCategory> {
    const response = await serverApi('/products/categories', {
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

export async function deleteCategory(token: string, id: number): Promise<void> {
    const response = await serverApi(`/products/categories/${id}`, {
        method: 'DELETE',
    }, `auth_token=${token}`)

    if (!response.ok) throw new Error('Failed to delete category')
}