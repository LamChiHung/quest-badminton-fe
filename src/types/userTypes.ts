export interface LoginResponse {
    token: string
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
    club: string
}

export interface ConfirmRegisterRequest {
    token: string
}

