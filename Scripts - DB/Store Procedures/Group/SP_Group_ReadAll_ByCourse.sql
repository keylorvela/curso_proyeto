-- -----------------------------------------------------
-- procedure SP_Group_ReadAll_ByCourse
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_ReadAll_ByCourse`(
    IN p_courseID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_courseCount INT;

    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.ID = p_courseID;

	-- Start TRANSACTION process
    START TRANSACTION;

    IF (@v_courseCount <= 0) THEN
        SET o_status = "Error: Course does NOT exists";
        SELECT o_status;
        ROLLBACK;
    ELSE
        SET o_status = "Success: Groups found";

        SELECT
			G.ID AS GroupID,
            G.StartingDate,
            G.ScheduleDate,
            G.ScheduleHour,
            G.Capacity,
            P.Name AS TeacherName,
            P.PhoneNumber AS TeacherPhoneNumber,
            P.Email AS TeacherEmail,
            o_status
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        INNER JOIN User AS U
			ON G.Teacher_UserID = U.ID
		INNER JOIN Person AS P
			ON U.PersonID = P.ID
        WHERE G.CourseID = p_courseID AND G.isActive = 1;

        COMMIT;
    END IF;
END$$

DELIMITER ;