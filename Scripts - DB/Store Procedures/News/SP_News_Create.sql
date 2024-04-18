DELIMITER //

CREATE PROCEDURE SP_News_Create(
    IN p_title VARCHAR(64),
    IN p_content TEXT,
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
	DECLARE groupCount INT;
	DECLARE v_transactionStatus INT;

	SELECT COUNT(*)
		INTO @groupCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;

	-- Start transaction process
    START TRANSACTION;

	IF @groupCount <= 0 THEN
		SET o_status = "Error: Group not found";
        SET v_transactionStatus = 0;
	ELSE
		-- Insert news
		INSERT INTO News (Title, Content, PublishedDate, GroupID)
			VALUES (p_title, p_content, CURRENT_DATE(), p_groupID);

		SET o_status = "Success: News created";
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