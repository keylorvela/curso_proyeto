export interface addReviewBody {
    p_name: String,
    p_reviewContent: String,
    p_stars: number,
    p_treatmentID: number
}

export interface Review {
    ID: number
    Name: string
    ReviewContent: string
    PublishedDate: string
    Stars: number
    Response: string
    o_status: string
}

export interface TreatmentIDBody {
    treatment_id: number
}

export interface ResponseBody {
    review_id: number
    respond: string
}

export interface removeReviewBody {
    id: number
}