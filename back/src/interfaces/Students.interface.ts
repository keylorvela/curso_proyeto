export interface Student {
    UserID: number;
    PersonID: number;
    Photo: string;
    Email: string;
    PhoneNumber: string;
    Name: string;
    o_status: string;
}

export interface RegStudentInGroup {
    UserID: number;
    GroupID: number;
}