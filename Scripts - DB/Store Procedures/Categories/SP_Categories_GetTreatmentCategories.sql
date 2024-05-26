-- -----------------------------------------------------
-- procedure SP_Categories_GetTreatmentCategories
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Categories_GetTreatmentCategories`()
BEGIN
	SELECT TC.ID, TC.CategoryName
        FROM TreatmentCategory AS TC;
END$$

DELIMITER ;