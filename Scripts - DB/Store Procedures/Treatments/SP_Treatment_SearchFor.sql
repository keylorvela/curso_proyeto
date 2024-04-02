DELIMITER //

CREATE PROCEDURE SP_Treatment_SearchFor(
    IN p_treatmentID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_treatmentCount INT;

    SELECT COUNT(*)
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;

    IF @v_treatmentCount = 0 THEN
        SET o_status = "Error: Treatment NOT found";
    ELSE
        SELECT
            Name, Description, Price 
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;

        SET o_status = "Success: Treatment found";
    END IF;
END //

DELIMITER ;