-- -----------------------------------------------------
-- procedure SP_Login_Verify_Email
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Login_Verify_Email`(
    IN p_email VARCHAR(64),
    IN p_otp INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_userID INT;
    DECLARE v_isValid INT;
    DECLARE v_personName VARCHAR(64);
    DECLARE v_transactionStatus INT;

    -- Get the user ID
    SELECT U.ID, P.Name
        INTO @v_userID, @v_personName
        FROM User AS U
        INNER JOIN Person AS P
            ON U.PersonID = P.ID
        WHERE P.Email = p_email;

    -- Start transaction
	START TRANSACTION;

    IF @v_userID IS NULL THEN
        SET o_status = 'Error: User not found.';
        SET @v_isValid = 0;
        SET v_transactionStatus = 0;
    ELSE

        INSERT INTO OTP(userID, otpCode, creationDate)
            VALUES(@v_userID, p_otp, NOW());

		SET o_status = "Success: OPT Inserted";
        SET @v_isValid = 1;
        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT @v_isValid AS IsValid, @v_personName AS Name, o_status;
END$$

DELIMITER ;