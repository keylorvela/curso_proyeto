-- -----------------------------------------------------
-- procedure SP_Group_DropOut
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_DropOut`(
    IN p_userID INT,
    IN p_groupID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    DECLARE v_groupByUserCount INT;

    SELECT COUNT(*)
        INTO @v_groupByUserCount
        FROM GroupsByUser AS GBU
        WHERE GBU.UserID = p_userID AND GBU.GroupID = p_groupID AND GBU.isActive = true;

    -- Check if that user exists
    IF @v_groupByUserCount <= 0 THEN
        SET o_status = "Error: User not found";
    ELSE
        UPDATE GroupsByUser
            SET isActive = false
            WHERE UserID = p_userID AND GroupID = p_groupID;

        SET o_status = "Success: GroupByUser updated";
    END IF;

    SELECT o_status;
END$$

DELIMITER ;