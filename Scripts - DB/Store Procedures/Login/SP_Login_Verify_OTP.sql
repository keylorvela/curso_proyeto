DELIMITER //

CREATE PROCEDURE SP_Login_Verify_OTP(
    IN p_inputOTP INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_otpID INT;
    DECLARE v_userID INT;
    DECLARE v_transactionStatus INT;

    -- Get the user ID and otp ID
    SELECT O.ID, O.userID
        INTO
            @v_otpID,
            @v_userID
        FROM OTP AS O
        WHERE O.otpCode = p_inputOTP AND isActive = 1;

    -- Start transaction
	START TRANSACTION;

    IF @v_userID IS NULL OR @v_otpID IS NULL THEN
        SET o_status = 'Error: OTP not found.';
        SET v_transactionStatus = 0;
    ELSE

        -- Update the otp status
        UPDATE OTP
        SET
            isActive = 0,
            activationDate = NOW()
        WHERE ID = @v_otpID AND isActive = 1;

		SET o_status = "Success: OPT Validate";
        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT @v_userID AS UserID, o_status;
END //

DELIMITER ;
