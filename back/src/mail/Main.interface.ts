export interface OTP_EmailBody {
    name: string
    otp: string
}

export interface UserRegistration {
    name: string
    username: string
    password: string
}

export interface FormVerification {
    name: string
    phoneNumber: string
    email: string
    courseName: string
    courseSchedule: string
}

export interface ApplicationRejected {
    name: string
}