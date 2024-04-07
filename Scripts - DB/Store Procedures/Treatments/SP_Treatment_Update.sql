DELIMITER //

CREATE PROCEDURE SP_Treatment_Update(
    IN p_treatmentID INT,
    IN p_name VARCHAR(64),
    IN p_description TEXT,
    IN p_price decimal(15,2),
    IN p_categoryID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_treatmentCount INT;
    DECLARE v_treatmentCategoryCount INT;

    -- Check if the treatment exists
    SELECT COUNT(*)
        INTO @v_treatmentCount
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;
        
	SELECT COUNT(*)
        INTO @v_treatmentCategoryCount
        FROM TreatmentCategory AS TC
        WHERE TC.ID = p_categoryID;

    -- Error if the treatment does not exists
    IF @v_treatmentCount = 0 THEN
        SET o_status = "Error: Treatment NOT found";
	ELSE IF @v_treatmentCategoryCount = 0 THEN
		SET o_status = "Error: CategoryID NOT found";
    ELSE
        -- Update the treatment information
        UPDATE Treatment
            SET
                Name = p_name,
                Description = p_description,
                Price = p_price,
                CategoryID = p_categoryID
            WHERE ID = p_treatmentID;

        SET o_status = "Success: Treatment updated";
    END IF;

    SELECT o_status;
END //

DELIMITER ;