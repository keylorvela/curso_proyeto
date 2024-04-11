export interface addReviewBody {
    p_name: String,
    p_reviewContent: String,
    p_publishedDate: String,
    p_stars: String,
    p_response: String,
    p_treatmentID: String
}

export interface removeReviewBody {
    id: number
}