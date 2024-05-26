-- -----------------------------------------------------
-- procedure SP_Login_ChangeByForget
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Login_ChangeByForget`(
    IN p_userID INT,
    IN p_otp INT,
    IN p_newPassword VARCHAR(64),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_UserCount INT;
    DECLARE v_OTP_ID INT;
    DECLARE v_UserRequestPasswordReset INT;
    DECLARE v_salt VARCHAR(256);
    DECLARE v_transactionStatus INT;

    -- Check if the user exist
    SELECT COUNT(*)
        INTO @v_UserCount
        FROM User AS U
        WHERE U.ID = p_userID;

    -- Check if the user request the password change
    SELECT O.ID, COUNT(*)
        INTO @v_OTP_ID, @v_UserRequestPasswordReset
        FROM OTP AS O
        WHERE O.userID = p_userID AND O.isActive = 0 AND O.hasPasswordReset = 0 AND O.otpCode = p_otp;

    -- Start transaction
	START TRANSACTION;

    IF @v_UserCount <= 0 OR @v_UserRequestPasswordReset <= 0 THEN
        SET o_status = 'Error: User not found.';
        SET v_transactionStatus = 0;
    ELSE
		-- Get the salt
        SELECT
			U.Salt
		INTO
			@v_salt
		FROM User AS U
        WHERE U.ID = p_userID;

		-- Update user password
		UPDATE User
			SET Password = SHA2(CONCAT(p_newPassword, @v_salt), 256)
			WHERE ID = p_userID;
            
		-- Update OTP status
        UPDATE OTP
			SET hasPasswordReset = true
			WHERE ID = @v_OTP_ID;

		SET o_status = "Success: Password updated";
        SET v_transactionStatus = 1;
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