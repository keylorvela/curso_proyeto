export interface Course {
    ID: number,
    Name: String,
    Description: String,
    Price: String,
    StartingDate: String,
    ScheduleDate: String,
    ScheduleHour: String,
    Capacity: number,
    o_status: String
}

export interface EnrolledCourses {
    CourseID: number,
    GroupID: number,
    Name: String,
    Description: String,
    ScheduleDate: String,
    ScheduleHour: String
}