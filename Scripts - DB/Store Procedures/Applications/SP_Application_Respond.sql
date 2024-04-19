DELIMITER //

CREATE PROCEDURE SP_Application_Respond(
    IN p_applicationID INT,
    IN p_status VARCHAR(32),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_applicationCount INT;
    DECLARE v_statusID INT;

    -- Check if the treatment exists
    SELECT COUNT(*)
        INTO @v_applicationCount
        FROM StudentApplication AS SA
        WHERE SA.ID = p_applicationID;

    -- Get the status ID
    SELECT ST.ID
        INTO @v_statusID
        FROM StatusType AS ST
        WHERE ST.StatusName = p_status;

    -- Error if the treatment does not exists
    IF @v_applicationCount = 0 OR @v_statusID IS NULL THEN
        SET o_status = "Error: Bad Input";
    ELSE
        -- Update the treatment information
        UPDATE StudentApplication
            SET StatusID = @v_statusID
            WHERE ID = p_treatmentID;

        SET o_status = "Success: Application updated";
    END IF;

    SELECT o_status;
END //

DELIMITER ;