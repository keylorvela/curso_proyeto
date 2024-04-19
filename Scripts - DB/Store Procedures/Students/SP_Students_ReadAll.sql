DELIMITER //

CREATE PROCEDURE SP_Students_ReadAll(
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Control variables
    DECLARE v_userTypeID INT;

    -- Set the userType ID
    SELECT UT.ID
        INTO @v_userTypeID
        FROM UserType AS UT
        WHERE UT.TypeName = "Estudiante";

    -- Verify correct user type
    IF @v_userTypeID IS NULL THEN
        SET o_status = "Error: UserType NOT found";
		SELECT o_status;
    ELSE
		SET o_status = "Success: Students found";

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