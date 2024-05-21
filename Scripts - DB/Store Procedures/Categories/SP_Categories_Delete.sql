DELIMITER //

CREATE PROCEDURE SP_Categories_Delete(
    IN p_categoryID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    SELECT COUNT(*)
        INTO @v_categories
        FROM TreatmentCategory AS TC
        WHERE TC.ID = p_categoryID;

    -- Start transaction process
	START TRANSACTION;

    IF (@v_categories <= 0) THEN
        SET o_status = "Error: Category doesnt exists";
        ROLLBACK;
    ELSE
        DELETE FROM TreatmentCategory
            WHERE ID = p_categoryID;

        SET o_status = "Success: Category deleted";
        COMMIT;
    END IF;

	SELECT o_status;
END //

DELIMITER ;