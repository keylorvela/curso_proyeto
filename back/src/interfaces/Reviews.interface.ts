export interface addReviewBody {
    p_name: String,
    p_reviewContent: String,
    p_stars: number,
    p_treatmentID: number
}

export interface removeReviewBody {
    id: number
}