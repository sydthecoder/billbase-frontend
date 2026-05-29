export interface CustomerAddress {
    street_address: string | null
    suburb: string | null
    city: string | null
    province: string | null
    province_label: string | null
    postal_code: string | null
}

export interface Customer {
    id: number
    customer_code: string
    company_name: string | null
    company_reg_number: string | null
    vat_number: string | null
    first_name: string
    last_name: string
    full_name: string
    email: string
    phone: string | null
    address: CustomerAddress
    notes: string | null
    status: 'active' | 'inactive'
    created_at: string
}

export interface CreateCustomerPayload {
    company_name?: string
    company_reg_number?: string
    vat_number?: string
    first_name: string
    last_name: string
    email: string
    phone?: string
    street_address?: string
    suburb?: string
    city?: string
    province?: string
    postal_code?: string
    notes?: string
    status?: 'active' | 'inactive'
}