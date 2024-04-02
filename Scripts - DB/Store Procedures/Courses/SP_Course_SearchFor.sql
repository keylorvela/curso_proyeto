DELIMITER //

CREATE PROCEDURE SP_Course_SearchFor(
    IN p_courseID INT,
    OUT o_status VARCHAR(32)
)
BEGIN

    DECLARE v_courseCount INT;

    SELECT COUNT(*)
    FROM Course AS C
    WHERE C.ID = p_courseID;

    IF @v_courseCount = 0 THEN
        SET o_status = "Error: Course NOT found";
    ELSE
        SELECT
            Name,
            Description,
            Price,
            StartingDate,
            ScheduleDate,
            ScheduleHour,
            Capacity 
        FROM Course AS C
        INNER JOIN bqhd9nbafrpsvzpzrgvc.Group AS G
            ON G.CourseID = C.ID
        WHERE C.ID = p_courseID;

        SET o_status = "Success: Course found";
    END IF;

END //

DELIMITER ;