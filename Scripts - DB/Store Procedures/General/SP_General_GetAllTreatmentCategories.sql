DELIMITER //

CREATE PROCEDURE SP_General_GetAllTreatmentCategories()
BEGIN
    SELECT TC.ID, TC.CategoryName
        FROM TreatmentCategory AS TC;
END //

DELIMITER ;
