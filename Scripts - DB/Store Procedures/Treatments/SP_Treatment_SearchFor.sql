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
			T.ID,
			T.Name,
			T.Description,
			T.Price,
			T.Includes,
			T.ProcedureDuration,
			T.EffectDuration,
			T.Information,
			o_status
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID AND T.isActive = 1;
    END IF;
END //

DELIMITER ;