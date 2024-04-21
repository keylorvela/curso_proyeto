export interface GroupBody {
    StartingDate: string
    ScheduleDate: string
    ScheduleHour: string
    Capacity: number
    CourseID: number
}

export interface Group {
    StartingDate: string
    ScheduleDate: string
    ScheduleHour: string
    Capacity: number
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