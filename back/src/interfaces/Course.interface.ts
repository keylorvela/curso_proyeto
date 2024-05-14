export interface CourseID {
    o_courseID: number
}

export interface photoBody {
    imageID: number
    url: string
    imageType: string
}

export interface CourseBody {
    Name: string
    Description: string
    Topics: string
    Includes: string
    Duration: string
    Price: number
    Photos: [ photoBody ]
    UserTarget: string
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
    Photos: [ CourseImage ] | string
    GroupsByCourse: string
    o_status: String
}