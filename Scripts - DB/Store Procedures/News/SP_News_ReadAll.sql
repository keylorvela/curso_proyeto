-- -----------------------------------------------------
-- procedure SP_News_ReadAll
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_News_ReadAll`(
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
	-- Declare control variable
    DECLARE v_groupCount INT;

    -- Check if the group exists
	SELECT COUNT(*)
		INTO @v_groupCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;

    -- Verify if group exists
    IF @v_groupCount = 0 THEN
        SET o_status = "Error: Group NOT found";
		SELECT o_status;
    ELSE
		SET o_status = "Success: Treatments found";

		SELECT
			N.ID, N.Title, N.Content, N.PublishedDate, o_status
			FROM News AS N
            WHERE N.GroupID = p_groupID;
	END IF;
END$$

DELIMITER ;