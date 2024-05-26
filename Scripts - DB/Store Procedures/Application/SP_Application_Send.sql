-- -----------------------------------------------------
-- procedure SP_Application_Send
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Application_Send`(
    IN p_name VARCHAR(64),
    IN p_payment_receipt MEDIUMBLOB,
    IN p_email VARCHAR(64),
    IN p_phone_number VARCHAR(32),
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_groupCount INT;
    DECLARE v_capacity INT;
    DECLARE v_statusID INT;
    DECLARE v_transactionStatus INT;

    -- Check if the group exists and has space available
    SELECT COUNT(*), G.Capacity
        INTO
			@v_groupCount,
            @v_capacity
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;

    -- Get the pending status ID
    SELECT ST.ID
        INTO @v_statusID
        FROM StatusType AS ST
        WHERE ST.StatusName = "Pendiente";

    START TRANSACTION;

    -- Error if the treatment does not exists
    IF @v_groupCount <= 0 OR @v_statusID IS NULL THEN
        SET o_status = "Error: Variables NOT found";
        SET v_transactionStatus = 0;
	ELSEIF @v_capacity <= 0 THEN
        SET o_status = "Error: Not space available";
        SET v_transactionStatus = 0;
    ELSE
		-- Update the space available
		UPDATE `bqhd9nbafrpsvzpzrgvc`.`Group`
		SET
			`Capacity` = @v_capacity - 1
		WHERE `ID` = p_groupID;
        
        -- Insert the application
        INSERT INTO StudentApplication(StudentName, PaymentReceipt, Date, Email, PhoneNumber, StatusID, GroupID)
            VALUES(p_name, p_payment_receipt, NOW(), p_email, p_phone_number, @v_statusID, p_groupID);

        SET o_status = "Success: Application updated";
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