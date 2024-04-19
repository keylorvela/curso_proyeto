DELIMITER //

CREATE PROCEDURE SP_Treatment_Delete(
    IN p_treatmentID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_treatmentCount INT;

    -- Check if the treatment exists
    SELECT COUNT(*)
        INTO @v_treatmentCount
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;

    -- Error if the treatment does not exists
    IF @v_treatmentCount = 0 THEN
        SET o_status = "Error: Treatment NOT found";
    ELSE
        -- Delete the treatment
        UPDATE Treatment
            SET isActive = 0
            WHERE ID = p_treatmentID;

        SET o_status = "Success: Treatment deleted";
    END IF;

    SELECT o_status;
END //

DELIMITER ;