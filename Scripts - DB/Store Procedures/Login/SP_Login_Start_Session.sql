-- -----------------------------------------------------
-- procedure SP_Login_Start_Session
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Login_Start_Session`(
    IN p_user VARCHAR(64),
    IN p_password VARCHAR(64)
)
BEGIN
    -- Declare variables to store user details
    DECLARE v_ID_User INT;
    DECLARE v_Username VARCHAR(64);
    DECLARE v_UserTypeID INT;
    DECLARE v_original_hash VARCHAR(256);
    DECLARE v_entry_hash VARCHAR(256);
    DECLARE v_salt VARCHAR(256);

    -- Select user details based on the input username
    SELECT
        U.ID,
        U.Username,
        U.UserTypeID,
        U.Password,
        U.Salt
    INTO
        v_ID_User,
        v_Username,
        v_UserTypeID,
        v_original_hash,
        v_salt
    FROM User AS U
    WHERE U.Username = p_user;

    SET v_entry_hash = SHA2(CONCAT(p_password, v_salt), 256);

    -- Return user details if the password matches
    IF v_ID_User IS NOT NULL AND v_entry_hash = v_original_hash THEN
        SELECT
            v_ID_User AS ID,
            v_Username AS Username,
            v_UserTypeID AS UserTypeID;
    ELSE
        SELECT
            NULL AS ID,
            NULL AS Username,
            NULL AS UserTypeID;
    END IF;

END$$

DELIMITER ;