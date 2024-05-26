-- -----------------------------------------------------
-- procedure SP_Reviews_Respond
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Reviews_Respond`(
    IN p_reviewID INT,
    IN p_response text,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    DECLARE v_reviewCount INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_reviewCount
        FROM Review AS R
        WHERE R.ID = p_reviewID;

    -- Start transaction
    START TRANSACTION;

    -- If no review with that ID
    IF @v_reviewCount <= 0 THEN
        SET o_status = "Error: Review NOT found";
        SET v_transactionStatus = 0;
    ELSE
        -- Add the response to the review
        UPDATE Review
            SET Response = p_response
            WHERE Review.ID = p_reviewID;

        SET o_status = "Success: Response added";
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