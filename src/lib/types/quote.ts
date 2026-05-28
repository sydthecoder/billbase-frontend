export interface QuoteCustomer {
    id: number
    name: string
    email: string
    company: string | null
}

export interface QuoteCreatedBy {
    id: number
    name: string
}

export interface QuoteItem {
    id: number
    product_id: number | null
    description: string
    quantity: number
    unit: string | null
    unit_price: number
    is_taxable: boolean
    tax_rate: number
    discount_amount: number | null
    line_total: number
    sort_order: number
}

export interface Quote {
    id: number
    quote_number: string
    title: string | null
    status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined' | 'expired'
    is_locked: boolean
    issue_date: string
    expires_at: string
    subtotal: number
    discount_amount: number | null
    discount_percent: number | null
    tax_total: number
    total: number
    notes: string | null
    footer: string | null
    sent_at: string | null
    viewed_at: string | null
    converted_at: string | null
    converted_to_invoice_id: number | null
    customer: QuoteCustomer
    created_by: QuoteCreatedBy
    items: QuoteItem[]
    created_at: string
}

export interface CreateQuoteItemPayload {
    product_id?: number
    description: string
    quantity: number
    unit?: string
    unit_price: number
    is_taxable?: boolean
    discount_amount?: number
    sort_order?: number
}

export interface CreateQuotePayload {
    customer_id: number
    title?: string
    issue_date: string
    expires_at: string
    discount_amount?: number
    discount_percent?: number
    notes?: string
    footer?: string
    items: CreateQuoteItemPayload[]
}