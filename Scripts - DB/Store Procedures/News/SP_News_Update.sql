-- -----------------------------------------------------
-- procedure SP_News_Update
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_News_Update`(
    IN p_newsID INT,
    IN p_title VARCHAR(64),
    IN p_content TEXT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_newsCount INT;
    DECLARE v_transactionStatus INT;

    -- Check if the treatment exists
    SELECT COUNT(*)
        INTO @v_newsCount
        FROM News AS N
        WHERE N.ID = p_newsID;

    -- Start transaction process
    START TRANSACTION;

    -- Error if the news does not exists
    IF @v_newsCount = 0 THEN
        SET o_status = "Error: News NOT found";
        SET v_transactionStatus = 0;
    ELSE
        UPDATE News
            SET
                Title = p_title,
                Content = p_content,
                PublishedDate = NOW()
            WHERE ID = p_newsID;

        SET o_status = "Success: News updated";
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