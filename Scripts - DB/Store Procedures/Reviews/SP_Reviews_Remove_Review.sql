DELIMITER //

CREATE PROCEDURE SP_Reviews_Remove_Review(
    IN p_reviewID VARCHAR(64),

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
        -- Delete the selected review
        DELETE
            FROM Review
            WHERE Review.ID = p_reviewID;

        SET o_status = "Success: Review deleted";
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
