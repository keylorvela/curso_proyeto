DELIMITER //

CREATE PROCEDURE SP_Categories_GetTreatmentCategories()
BEGIN
	SELECT TC.ID, TC.CategoryName
        FROM TreatmentCategory AS TC;
END //

DELIMITER ;