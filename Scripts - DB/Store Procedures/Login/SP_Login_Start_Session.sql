DELIMITER //

CREATE PROCEDURE SP_Login_Start_Session(
    IN p_user VARCHAR(64),
    IN p_password VARCHAR(64)
)
BEGIN
    -- Declare the variable to store the user id
    DECLARE v_ID_User INT;
    DECLARE v_original_hash VARCHAR(256);
    DECLARE v_entry_hash VARCHAR(256);
    DECLARE v_salt VARCHAR(256);

    -- Select the user id based on the params
    SELECT
        U.ID,
        U.Password,
        U.Salt
    INTO
        @v_ID_User,
        @v_original_hash,
        @v_salt
    FROM User AS U
    WHERE U.Username = p_user;

    SET @v_entry_hash = SHA2(CONCAT(p_password, @v_salt), 256);

    -- Return the user id found
    IF @v_ID_User IS NOT NULL AND @v_entry_hash = @v_original_hash THEN
        SELECT v_ID_User AS ID_User;
    ELSE
        SELECT NULL AS ID_User;
    END IF;

END //

DELIMITER ;
