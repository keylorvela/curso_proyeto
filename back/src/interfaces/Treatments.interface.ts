export interface createTreatmentBody {
    p_name: String
    p_description: String
    p_price: String
    p_includes: String
    p_procedureDuration: String
    p_effectDuration: String
    p_information: String
    p_treatmentImage: string
    p_categoryID: String
}

export interface updateTreatmentBody {
    p_treatmentID: String
    p_name: String
    p_description: String
    p_price: String
    p_includes: String
    p_procedureDuration: String
    p_effectDuration: String
    p_information: String
    p_treatmentImage: string
    p_categoryID: String
}

export interface TreatmentID {
    o_treatmentID: number
}

export interface TreatmentImage {
    ID: number
    ImageURL: string
    o_status: string
}

export interface Treatment {
    ID: number
    Name: String
    Description: String
    Price: String
    Includes: String
    ProcedureDuration: String
    EffectDuration: String
    Information: String
    TreatmentImage: string
    o_status: String
}

export interface Categories {
    ID: number,
    CategoryName: string
}