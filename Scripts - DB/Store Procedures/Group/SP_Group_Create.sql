-- -----------------------------------------------------
-- procedure SP_Group_Create
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_Create`(
    IN p_startingDate DATE,
    IN p_scheduleDate VARCHAR(128),
    IN p_scheduleHour TIME,
    IN p_capacity INT,
    IN p_courseID INT,
    IN p_teacherID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_courseCount INT;
    DECLARE v_teacherCount INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.ID = p_courseID;
        
	SELECT COUNT(*)
        INTO @v_teacherCount
        FROM User AS U
		INNER JOIN UserType AS UT
			ON U.UserTypeID = UT.ID
        WHERE U.ID = p_teacherID AND UT.TypeName = "Profesor";

	-- Start transaction process
    START TRANSACTION;

    IF (@v_courseCount <= 0) THEN
        SET o_status = "Error: Course does not exists";
        SET v_transactionStatus = 0;
	ELSEIF (@v_teacherCount <= 0) THEN
        SET o_status = "Error: Teacher does not exists";
        SET v_transactionStatus = 0;
    ELSE

        INSERT INTO bqhd9nbafrpsvzpzrgvc.Group(StartingDate, ScheduleDate, ScheduleHour, Capacity, CourseID, Teacher_UserID)
            VALUES (p_startingDate, p_scheduleDate, p_scheduleHour, p_capacity, p_courseID, p_teacherID);

        SET o_status = "Success: Group created";
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