export interface ApplicationBody {
    name: String,
    payment_receipt: JSON,
    email: String,
    phone_number: String,
    groupID: number
}
export interface Application {
    ID: string;
    StudentName: string;
    PaymentReceipt: JSON;
    Date: string;
    StartingDate: string;
    CourseName: string;
}

export interface ApplicationRespond {
    ApplicantName: string | null
    ApplicantEmail: string | null
    o_status: string
}