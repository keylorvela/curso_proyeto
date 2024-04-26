export interface StartSession {
    ID_User: number | null
}

export interface RegisterPerson {
    PersonID: number
}

export interface ForgetPasswordBody {
    requested_email: string
}