DELIMITER //

CREATE PROCEDURE SP_Treatment_SearchFor(
    IN p_treatmentID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_treatmentCount INT;

    SELECT COUNT(*)
        INTO v_treatmentCount
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;

    IF @v_treatmentCount = 0 THEN
        SET o_status = "Error: Treatment NOT found";
        SELECT o_status;
    ELSE
        SET o_status = "Success: Treatment found";

        SELECT
            Name, Description, Price, o_status
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;
    END IF;
END //

DELIMITER ;