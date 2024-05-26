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

export interface ApplicantInformation {
    ApplicantName: string | null
    ApplicantEmail: string | null
    o_status: string
}

export interface ApplicationResponse {
    result1: [ { o_status: string } ]
    result2: [ { o_status: string } ]
    finalResult: [ ApplicantInformation ]
}