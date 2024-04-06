DELIMITER //

CREATE PROCEDURE SP_Course_Update(
    IN p_courseID INT,
    IN p_startingDate DATE,
    IN p_date VARCHAR(128),
    IN p_hour TIME,
    IN p_capacity INT,
    IN p_name VARCHAR(32),
    IN p_description TEXT,
    IN p_price decimal(15,2),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_courseCount INT;

    -- Check if the course exists
    SELECT COUNT(*)
        INTO @v_courseCount
        FROM course AS T
        WHERE T.ID = p_courseID;

    -- Error if the course does not exists
    IF @v_courseCount = 0 THEN
        SET o_status = "Error: Course NOT found";
    ELSE
        -- Update the course information
        UPDATE Course
        INNER JOIN bqhd9nbafrpsvzpzrgvc.Group as G
            on Course.ID = G.CourseID
        SET
            Course.Name = p_name,
            Course.Description = p_description,
            Course.Price = p_price,
            G.StartingDate = p_startingDate,
            G.ScheduleDate = p_date,
            G.ScheduleHour = p_hour,
            G.Capacity = p_capacity
        WHERE ID = p_courseID;

        SET o_status = "Success: Course updated";
    END IF;
    
    SELECT o_status;
END //

DELIMITER ;