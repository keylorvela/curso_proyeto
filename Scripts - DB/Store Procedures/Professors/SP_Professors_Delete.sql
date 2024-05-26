-- -----------------------------------------------------
-- procedure SP_Professors_Delete
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Professors_Delete`(
    IN p_userID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_userCount INT;
    DECLARE v_personID INT;
    DECLARE v_teacherAssignCount INT;
    DECLARE v_transactionStatus INT;

    -- Check if the User exists
    SELECT COUNT(*)
        INTO @v_userCount
        FROM User AS U
        WHERE U.ID = p_userID;
        
	-- Check if the professor is assign to a group
    SELECT COUNT(*)
        INTO @v_teacherAssignCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.Teacher_UserID = p_userID;

    -- Start transaction process
    START TRANSACTION;

    -- Error if the News does not exists
    IF @v_userCount = 0 THEN
        SET o_status = "Error: User NOT found";
        SET v_transactionStatus = 0;
	ELSEIF @v_teacherAssignCount > 0 THEN
        SET o_status = "Error: Teacher still in group";
        SET v_transactionStatus = 0;
    ELSE
        SELECT U.PersonID
            INTO @v_personID
            FROM User AS U
            WHERE U.ID = p_userID;

        DELETE FROM User
            WHERE ID = p_userID;

        DELETE FROM Person
            WHERE ID = @v_personID;

        SET o_status = "Success: User / person deleted";
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