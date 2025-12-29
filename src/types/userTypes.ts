export interface LoginResponse {
    token: string
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
    club: string
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    token: string,
}

export interface ConfirmRegisterRequest {
    token: string
}

export interface MeResponse {
    name: string,
    email: string,
    roles: string
}

