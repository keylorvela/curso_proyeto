export interface CourseBody {
    Name: string
    Description: string
    Topics: string
    Includes: string
    Duration: string
    Price: number
    UserTarget: string
}

export interface Course {
    ID: number,
    Name: string
    Description: string
    Topics: string
    Includes: string
    Duration: string
    Price: number
    UserTarget: string
    o_status: String
}