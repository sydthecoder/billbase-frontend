export interface ProductCategory {
    id: number
    name: string
    description: string | null
    created_at: string
}

export interface Product {
    id: number
    name: string
    description: string | null
    price: number
    unit: string | null
    unit_label: string | null
    is_taxable: boolean
    sku: string | null
    status: 'active' | 'inactive'
    category: {
        id: number
        name: string
    } | null
    created_at: string
}

export interface CreateProductPayload {
    product_category_id?: number
    name: string
    description?: string
    price: number
    unit?: string
    is_taxable?: boolean
    sku?: string
    status?: 'active' | 'inactive'
}

export interface CreateProductCategoryPayload {
    name: string
    description?: string
}