DELIMITER //

CREATE PROCEDURE SP_Login_Verify_Email(
    IN p_email VARCHAR(64),
    IN p_otp INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_userID INT;
    DECLARE v_transactionStatus INT;

    -- Get the user ID
    SELECT U.ID
        INTO @v_userID
        FROM User AS U
        INNER JOIN Person AS P
            ON U.PersonID = P.ID
        WHERE P.Email = p_email;

    -- Start transaction
	START TRANSACTION;

    IF @v_userID IS NULL THEN
        SET o_status = 'Error: User not found.';
        SET v_transactionStatus = 0;
    ELSE

        INSERT INTO OTP(userID, otpCode, creationDate)
            VALUES(@v_userID, p_otp, CURRENT_DATE());

		SET o_status = "Success: OPT Inserted";
        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT o_status;
END //

DELIMITER ;
