export interface StartSession {
    ID_User: number | null
}

export interface OTP_Verification {
    IsValid: boolean
    Name: string,
    o_status: string
}

export interface OTP_Body {
    OTP: number
}

export interface OTP_Response {
    UserID: number
    o_status: string
}

export interface OTP_PasswordResetBody {
    UserID: number
    Password: string
}

export interface RegisterPerson {
    PersonID: number
}

export interface ForgetPasswordBody {
    requested_email: string
}