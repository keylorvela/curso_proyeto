-- -----------------------------------------------------
-- procedure SP_General_GetAllTreatmentCategories
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_General_GetAllTreatmentCategories`()
BEGIN
    SELECT TC.ID, TC.CategoryName
        FROM TreatmentCategory AS TC;
END$$

DELIMITER ;