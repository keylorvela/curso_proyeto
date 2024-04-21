DELIMITER //

CREATE PROCEDURE SP_Group_ReadAll_ByCourse(
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
            G.StartingDate,
            G.ScheduleDate,
            G.ScheduleHour,
            G.Capacity,
            o_status
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.CourseID = p_courseID AND G.isActive = 1;

        COMMIT;
    END IF;
END //

DELIMITER ;