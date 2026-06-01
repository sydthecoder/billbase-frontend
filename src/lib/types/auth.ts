export interface AuthUser {
    id: number
    first_name: string
    last_name: string
    full_name: string | null
    email: string
    phone: string | null
    role: 'owner' | 'admin' | 'staff'
    avatar_url: string | null
    last_login_at: string | null
    organization: {
        id: number
        org_code: string
        name: string | null
        email: string | null
        phone: string | null
        logo_url: string | null
        address: {
            street_address: string | null
            suburb: string | null
            city: string | null
            province: string | null
            postal_code: string | null
            country: string
        }
        currency: string
        reg_number: string | null
        tax_number: string | null
        status: string
        subscription: {
            status: string | null
            trial_ends_at: string | null
            is_usable: boolean
            plan: {
                id: number | null
                name: string | null
                slug: string | null
            }
        }
    }
}

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    email: string
    password: string
    password_confirmation: string
}

export interface AuthResponse {
    status: string
    data: {
        access_token: string
        token_type: string
        user: AuthUser
    }
}

export interface MeResponse {
    status: string
    data: {
        user: AuthUser
    }
}