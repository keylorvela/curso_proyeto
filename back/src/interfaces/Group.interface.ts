export interface GroupBody {
    StartingDate: string
    ScheduleDate: string
    ScheduleHour: string
    Capacity: number
    CourseID: number
    TeacherID: number
}

export interface Group {
    GroupID: number
    StartingDate: string
    ScheduleDate: string
    ScheduleHour: string
    Capacity: number
    TeacherName: string
    TeacherPhoneNumber: string
    TeacherEmail: string
    o_status: string
}

export interface GroupInformation {
    CourseID: number
    GroupID: number
    UserID: number
    PersonID: number
    TeacherName: string
    TeacherEmail: string
    TeacherPhoneNumber: string
    Name: string
    ScheduleDate: string
    ScheduleHour: string
    o_status: string
}

export interface EnrolledCourses {
    CourseID: number,
    GroupID: number,
    Name: String,
    Description: String,
    ScheduleDate: String,
    ScheduleHour: String
}

export interface TeacherGroup {
    CourseID: number,
    GroupID: number,
    Name: String,
    Description: String,
    ScheduleDate: String,
    ScheduleHour: String
}