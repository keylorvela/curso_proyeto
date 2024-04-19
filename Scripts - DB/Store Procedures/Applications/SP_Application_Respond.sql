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
    DECLARE v_transactionStatus INT;

    DECLARE v_Name VARCHAR(64);
    DECLARE v_Email VARCHAR(64);
    DECLARE v_PhoneNumber VARCHAR(32);
    DECLARE v_TempPassword VARCHAR(32);
    DECLARE v_UserType VARCHAR(32);

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

    -- Start transaction process
    START TRANSACTION;

    -- Error if the treatment does not exists
    IF @v_applicationCount = 0 OR @v_statusID IS NULL THEN
        SET o_status = "Error: Bad Input";
        SET v_transactionStatus = 0;
    ELSE
        -- Update the treatment information
        UPDATE StudentApplication
            SET StatusID = @v_statusID
            WHERE ID = p_applicationID;

        -- TODO:
        -- If the status is accepted -> Register person
        IF p_status = "Aceptado" THEN
            SELECT
                    StudentName,
                    Email,
                    PhoneNumber
                INTO
                    @v_Name,
                    @v_Email,
                    @v_PhoneNumber
                FROM StudentApplication AS SA
                WHERE SA.ID = p_applicationID;

            SET v_TempPassword = "1234";
            SET v_UserType = "Estudiante";

            -- Register new student user
            CALL SP_General_RegisterUser(@v_Name, @v_Email, @v_PhoneNumber, NULL, @v_Email, @v_TempPassword, @v_UserType, @o_status);
        END IF;


        SET o_status = "Success: Application updated";
        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT o_status;
END //

DELIMITER ;