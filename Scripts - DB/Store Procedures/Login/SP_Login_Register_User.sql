DELIMITER //

CREATE PROCEDURE SP_Login_Register_User(
    IN p_user VARCHAR(64),
    IN p_password VARCHAR(64),
    IN p_type VARCHAR(32),
    IN p_personID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    DECLARE v_UserTypeID INT;
    DECLARE v_UserCount INT;
    DECLARE v_salt VARCHAR(256);
    DECLARE v_hash VARCHAR(256);

    -- Look up for the user type id
    SELECT UT.ID
        INTO @v_UserTypeID
        FROM UserType AS UT
        WHERE UT.TypeName = p_type;

    -- Check if the information is already registered
    SELECT COUNT(*)
        INTO @v_UserCount
        FROM User AS U
        WHERE U.Username = p_user OR U.PersonID = p_personID;

    -- Insert the user if the user type exist and the information is not repeated
    IF @v_UserCount <= 0 AND @v_UserTypeID IS NOT NULL THEN

        SET @v_salt = SHA2(UUID(), 256);
        SET @v_hash = SHA2(CONCAT(p_password, @v_salt), 256);

        INSERT INTO User(Username, Password, Salt, PersonID, UserTypeID)
            VALUES(p_user, @v_hash, @v_salt, p_personID, @v_UserTypeID);

        SET o_status = "Success: User created";
    ELSE
        SET o_status = "Error: Failed insertion";
    END IF;

    SELECT o_status;
END //

DELIMITER ;
