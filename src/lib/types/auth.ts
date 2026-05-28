export interface AuthUser {
    id: number
    first_name: string
    last_name: string
    email: string
    role: 'owner' | 'admin' | 'staff'
    organization_id: number
    last_login_at: string | null
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