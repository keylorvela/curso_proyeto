-- -----------------------------------------------------
-- procedure SP_Group_Update
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_Update`(
    IN p_groupID INT,
    IN p_startingDate DATE,
    IN p_scheduleDate VARCHAR(128),
    IN p_scheduleHour TIME,
    IN p_capacity INT,
    IN p_teacherID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_groupCount INT;
    DECLARE v_teacherCount INT;
    DECLARE v_transactionStatus INT;

    -- Check if the group exists
    SELECT COUNT(*)
        INTO @v_groupCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;
	
    -- Check if the teacher exists
	SELECT COUNT(*)
        INTO @v_teacherCount
        FROM User AS U
		INNER JOIN UserType AS UT
			ON U.UserTypeID = UT.ID
        WHERE U.ID = p_teacherID AND UT.TypeName = "Profesor";

    -- Start transaction process
    START TRANSACTION;

    -- Error if the course does not exists
    IF @v_groupCount = 0 THEN
        SET o_status = "Error: Group NOT found";
        SET v_transactionStatus = 0;
	ELSEIF (@v_teacherCount <= 0) THEN
        SET o_status = "Error: Teacher does not exists";
        SET v_transactionStatus = 0;
    ELSE
        -- Update the course information
        UPDATE bqhd9nbafrpsvzpzrgvc.Group
        SET
            StartingDate = p_startingDate,
            ScheduleDate = p_scheduleDate,
            ScheduleHour = p_scheduleHour,
            Capacity = p_capacity,
            Teacher_UserID = p_teacherID
        WHERE ID = p_groupID;

        SET o_status = "Success: Group updated";
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