export interface CourseID {
    o_courseID: number
}

export interface CourseBody {
    Name: string
    Description: string
    Topics: string
    Includes: string
    Duration: string
    Price: number
    CourseImage: string
    UserTarget: string
    PayLink: string
}

export interface CourseImage {
    ID: number
    ImageURL: string
    o_status: string
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
    CourseImage: string
    PayLink: string
    GroupsByCourse: string
    o_status: String
}