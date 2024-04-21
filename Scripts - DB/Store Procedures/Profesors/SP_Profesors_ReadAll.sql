DELIMITER //

CREATE PROCEDURE SP_Profesors_ReadAll(
    OUT o_status VARCHAR(32)
)
BEGIN
	-- Declare control variable
    DECLARE v_userTypeID INT;

    -- Check if the group exists
	SELECT UT.ID
		INTO @v_userTypeID
        FROM UserType AS UT
        WHERE UT.TypeName = "Profesor";

    -- Verify if group exists
    IF @v_userTypeID IS NULL THEN
        SET o_status = "Error: Profesor NOT found";
		SELECT o_status;
    ELSE
		SET o_status = "Success: Profesor found";

		SELECT
            U.ID AS UserID,
            P.ID AS PersonID,
            P.Photo,
            P.Email,
            P.PhoneNumber,
            P.Name,
            o_status
        FROM User AS U
        INNER JOIN Person AS P
            ON U.PersonID = P.ID
        WHERE U.UserTypeID = @v_userTypeID;

	END IF;
END //

DELIMITER ;