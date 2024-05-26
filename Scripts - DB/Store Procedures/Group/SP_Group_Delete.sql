-- -----------------------------------------------------
-- procedure SP_Group_Delete
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_Delete`(
    IN p_groupID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_groupCount INT;
    DECLARE v_transactionStatus INT;

    -- Check if the group exists
    SELECT COUNT(*)
        INTO @v_groupCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;

    -- Start transaction process
    START TRANSACTION;

    -- Error if the course does not exists
    IF @v_groupCount = 0 THEN
        SET o_status = "Error: Group NOT found";
        SET v_transactionStatus = 0;
    ELSE
        -- Delete the group
        UPDATE bqhd9nbafrpsvzpzrgvc.Group
            SET isActive = 0
            WHERE ID = p_groupID;

        SET o_status = "Success: Group deleted";
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