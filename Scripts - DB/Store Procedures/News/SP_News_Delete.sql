DELIMITER //

CREATE PROCEDURE SP_News_Delete(
    IN p_newsID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_newsCount INT;
    DECLARE v_transactionStatus INT;

    -- Check if the News exists
    SELECT COUNT(*)
        INTO @v_newsCount
        FROM News AS N
        WHERE N.ID = p_newsID;

    -- Start transaction process
    START TRANSACTION;

    -- Error if the News does not exists
    IF @v_newsCount = 0 THEN
        SET o_status = "Error: News NOT found";
        SET v_transactionStatus = 0;
    ELSE
        DELETE FROM News
            WHERE ID = p_newsID;

        SET o_status = "Success: News deleted";
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