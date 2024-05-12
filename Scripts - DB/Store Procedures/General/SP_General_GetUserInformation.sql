DELIMITER //

CREATE PROCEDURE SP_General_GetUserInformation(
	IN p_userID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables (User)
    DECLARE v_UserCount INT;
    DECLARE v_hash VARCHAR(256);

    -- Check if the user exists
    SELECT COUNT(*)
        INTO @v_UserCount
        FROM User AS U
        WHERE U.ID = p_userID;

	-- Start TRANSACTION process
	START TRANSACTION;

    -- Retrieve user information
    IF @v_UserCount > 0  THEN
        SET o_status = "Success: User found";

        SELECT
            P.Name AS Name,
            P.Photo AS Photo,
            P.PhoneNumber AS PhoneNumber,
            P.Email AS Email,
            o_status
        FROM User AS U
        INNER JOIN Person AS P
            ON U.PersonID = P.ID
        WHERE U.ID = p_userID;

        -- Commit if everything is fine
        COMMIT;
    ELSE
		ROLLBACK;
        SET o_status = "Error: Failed insertion";
        SELECT o_status;
    END IF;
END //

DELIMITER ;
