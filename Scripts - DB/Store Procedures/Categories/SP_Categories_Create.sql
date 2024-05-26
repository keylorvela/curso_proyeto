-- -----------------------------------------------------
-- procedure SP_Categories_Create
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Categories_Create`(
    IN p_categoryName VARCHAR(128),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    SELECT COUNT(*)
        INTO @v_categories
        FROM TreatmentCategory AS TC
        WHERE TC.CategoryName = p_categoryName;

    -- Start transaction process
	START TRANSACTION;

    IF (@v_categories > 0) THEN
        SET o_status = "Error: Category already exists";
        ROLLBACK;
    ELSE
        INSERT INTO TreatmentCategory(CategoryName)
            VALUES(p_categoryName);

        SET o_status = "Success: Category inserted";
        COMMIT;
    END IF;

	SELECT o_status;
END$$

DELIMITER ;