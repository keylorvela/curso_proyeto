-- -----------------------------------------------------
-- procedure SP_Login_Change_Password
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Login_Change_Password`(
    IN p_userID INT,
    IN p_oldPassword VARCHAR(64),
    IN p_newPassword VARCHAR(64),
    
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_UserCount INT;
    DECLARE v_currentOldPassword VARCHAR(256);
    DECLARE v_insertedOldPassword VARCHAR(256);
    DECLARE v_salt VARCHAR(256);
    DECLARE v_transactionStatus INT;
    
    -- Check if the user exist
    SELECT COUNT(*)
        INTO @v_UserCount
        FROM User AS U
        WHERE U.ID = p_userID;
	
    -- Start transaction
	START TRANSACTION;
    
    IF @v_UserCount = 0 THEN
        SET o_status = 'Error: User not found.';
        SET v_transactionStatus = 0;
    ELSE
		-- Get the salt and current password
        SELECT
			U.Password, U.Salt
		INTO
			@v_currentOldPassword, @v_salt
		FROM `User` AS U
        WHERE U.ID = p_userID;
        
        -- Compare passwords
        SET @v_insertedOldPassword = SHA2(CONCAT(p_oldPassword, @v_salt), 256);
        IF @v_currentOldPassword != @v_insertedOldPassword THEN
			SET o_status = "Error: Passwords not match";
            SET v_transactionStatus = 0;
		ELSE
			 -- Update user password
			UPDATE User
				SET Password = SHA2(CONCAT(p_newPassword, @v_salt), 256)
				WHERE ID = p_userID;
                
			SET o_status = "Success: User updated";
            SET v_transactionStatus = 1;
        END IF;
    END IF;
    
    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;
    
    SELECT o_status;
END$$

DELIMITER ;