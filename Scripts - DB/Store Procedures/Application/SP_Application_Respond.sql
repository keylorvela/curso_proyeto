-- -----------------------------------------------------
-- procedure SP_Application_Respond
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Application_Respond`(
    IN p_applicationID INT,
    IN p_status VARCHAR(32),
    IN p_tempPassword VARCHAR(256),

    OUT o_status VARCHAR(32)
)
BEGIN
	-- Declare control variable
    DECLARE v_applicationCount INT;
    DECLARE v_statusID INT;
    DECLARE v_transactionStatus INT;
    DECLARE v_groupID INT;

    DECLARE v_Name VARCHAR(64);
    DECLARE v_Email VARCHAR(64);
    DECLARE v_PhoneNumber VARCHAR(32);
    DECLARE v_TempPassword VARCHAR(32);
    DECLARE v_UserType VARCHAR(32);

    -- Check if the treatment exists
    SELECT COUNT(*), SA.GroupID
        INTO
			@v_applicationCount,
            @v_groupID
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

        -- If the status is accepted -> Register person
        IF p_status = "Aceptado" THEN
            SET @v_UserType = "Estudiante";
            
			-- Check if user is already registered
            SELECT COUNT(*), U.ID
				INTO
					@v_userCount,
					@v_userID
                FROM User AS U
                INNER JOIN Person AS P
					ON P.ID = U.PersonID
                WHERE P.Email = @v_Email;
            
            -- If user is not register
            IF @v_userCount <= 0 THEN
				-- Register new student user
				CALL SP_General_RegisterUser(@v_Name, @v_Email, @v_PhoneNumber, "", @v_Email, p_tempPassword, @v_UserType, @o_status);

				-- Get the last inserted user
				SELECT U.ID
				INTO
					@v_userID
                FROM User AS U
                INNER JOIN Person AS P
					ON P.ID = U.PersonID
                WHERE P.Email = @v_Email;
                
                -- Link user and group
                CALL SP_Students_AddStudentToGroup(@v_userID, @v_groupID, @o_status);

            -- If user already exists
            ELSEIF @v_userID IS NOT NULL THEN
				SELECT "Info: User already registered" AS o_status;
				CALL SP_Students_AddStudentToGroup(@v_userID, @v_groupID, @o_status);
			ELSE
				SELECT "Error: Failed with user" AS o_status;
                SELECT "Error: Failed with registration" AS o_status;
            END IF;

            SET o_status = "Success: Application updated";            
		-- User was rejected
        ELSE
			SELECT "Error: User not created" as o_status;
            SELECT "Error: User not registered" as o_status;
			UPDATE `bqhd9nbafrpsvzpzrgvc`.`Group`
			SET
				Capacity = Capacity + 1
			WHERE `ID` = @v_groupID;
            SET o_status = "Info: Application rejected";
        END IF;

        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT @v_Name AS ApplicantName, @v_Email AS ApplicantEmail, o_status;
END$$

DELIMITER ;