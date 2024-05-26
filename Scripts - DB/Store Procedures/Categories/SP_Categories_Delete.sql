-- -----------------------------------------------------
-- procedure SP_Categories_Delete
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Categories_Delete`(
    IN p_categoryID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    SELECT COUNT(*)
        INTO @v_categories
        FROM TreatmentCategory AS TC
        WHERE TC.ID = p_categoryID;
        
	SELECT COUNT(*)
        INTO @v_treatmentsWithCategoryID
        FROM Treatment AS T
        WHERE T.CategoryID = p_categoryID;

    -- Start transaction process
	START TRANSACTION;

    IF (@v_categories <= 0) THEN
        SET o_status = "Error: Category doesnt exists";
        ROLLBACK;
	ELSEIF (@v_treatmentsWithCategoryID > 0) THEN
        SET o_status = "Error: Treatm. with that catgID";
        ROLLBACK;
    ELSE
        DELETE FROM TreatmentCategory
            WHERE ID = p_categoryID;

        SET o_status = "Success: Category deleted";
        COMMIT;
    END IF;

	SELECT o_status;
END$$

DELIMITER ;