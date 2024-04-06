DELIMITER //

CREATE PROCEDURE SP_Login_Register_Person(
    IN p_name VARCHAR(64),
    IN p_email VARCHAR(64),
    IN p_phone_number VARCHAR(32),
    IN p_photo BLOB,

    OUT o_personID INT
)
BEGIN
    -- Declare control variable
    DECLARE v_PersonCount INT;

    -- Check for person information repeated
    SELECT COUNT(*)
        INTO @v_PersonCount
        FROM Person AS P
        WHERE P.Email = p_email OR P.PhoneNumber = p_phone_number;

    -- Insert only is the information is not repeated
    IF @v_PersonCount <= 0 THEN
        INSERT INTO Person(Photo, Email, PhoneNumber, Name)
            VALUES(p_photo, p_email, p_phone_number, p_name);

        SET o_personID = LAST_INSERT_ID();
    ELSE
        SET o_personID = -1;
    END IF;

    SELECT o_status;
END //

DELIMITER ;
