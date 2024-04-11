export interface createTreatmentBody {
    p_name: String
    p_description: String
    p_price: String
    p_categoryID: String
}

export interface updateTreatmentBody {
    p_treatmentID: String
    p_name: String
    p_description: String
    p_price: String
    p_categoryID: String
}

export interface TreatmentID {
    o_treatmentID: number
}

export interface Treatment {
    ID: number
    Name: String
    Description: String
    Price: String
    o_status: String
}