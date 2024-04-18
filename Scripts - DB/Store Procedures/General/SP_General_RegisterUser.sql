DELIMITER //

CREATE PROCEDURE SP_General_RegisterUser(
	IN p_name VARCHAR(64),
    IN p_email VARCHAR(64),
    IN p_phone_number VARCHAR(32),
    IN p_photo BLOB,
    IN p_user VARCHAR(64),
    IN p_password VARCHAR(64),
    IN p_type VARCHAR(32),

    OUT o_status VARCHAR(32)
)
BEGIN
	-- Declare control variable (Person)
    DECLARE v_PersonCount INT;

    -- Declare control variables (User)
    DECLARE v_UserTypeID INT;
    DECLARE v_UserCount INT;

    -- Declare hash variables
    DECLARE v_salt VARCHAR(256);
    DECLARE v_hash VARCHAR(256);

    -- Check for person information repeated
    SELECT COUNT(*)
        INTO @v_PersonCount
        FROM Person AS P
        WHERE P.Email = p_email OR P.PhoneNumber = p_phone_number;

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

	-- Start transaction process
	START TRANSACTION;

    -- Insert the user if the user type exist and the information is not repeated
    IF @v_PersonCount <= 0 AND @v_UserCount <= 0 AND @v_UserTypeID IS NOT NULL THEN

        SET @v_salt = SHA2(UUID(), 256);
        SET @v_hash = SHA2(CONCAT(p_password, @v_salt), 256);

		INSERT INTO Person(Photo, Email, PhoneNumber, Name)
            VALUES(p_photo, p_email, p_phone_number, p_name);

        INSERT INTO User(Username, Password, Salt, PersonID, UserTypeID)
            VALUES(p_user, @v_hash, @v_salt, LAST_INSERT_ID(), @v_UserTypeID);

        SET o_status = "Success: User created";
        -- Commit if everything is fine
        COMMIT;
    ELSE
		ROLLBACK;
        SET o_status = "Error: Failed insertion";
    END IF;

    SELECT o_status;
END //

DELIMITER ;
