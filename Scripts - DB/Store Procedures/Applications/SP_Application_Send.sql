DELIMITER //

CREATE PROCEDURE SP_Application_Send(
    IN p_name VARCHAR(64),
    IN p_payment_receipt BLOB,
    IN p_email VARCHAR(64),
    IN p_phone_number VARCHAR(32),
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_groupCount INT;
    DECLARE v_statusID INT;
    DECLARE v_transactionStatus INT;

    -- Check if the group exists
    SELECT COUNT(*)
        INTO @v_groupCount
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
    ELSE
        -- Insert the application
        INSERT INTO StudentApplication(StudentName, PaymentReceipt, Date, Email, PhoneNumber, StatusID, GroupID)
            VALUES(p_name, p_payment_receipt, CURRENT_DATE(), p_email, p_phone_number, @v_statusID, p_groupID);

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
END //

DELIMITER ;