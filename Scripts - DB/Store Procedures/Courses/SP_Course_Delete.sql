DELIMITER //

CREATE PROCEDURE SP_Course_Delete(
    IN p_courseID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_courseCount INT;

    -- Check if the course exists
    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.ID = p_courseID;

    -- Error if the course does not exists
    IF @v_courseCount = 0 THEN
        SET o_status = "Error: Course NOT found";
    ELSE
        -- Delete the course
        DELETE FROM Course
            WHERE ID = p_courseID;

        -- Delete the group
        DELETE FROM bqhd9nbafrpsvzpzrgvc.Group
            WHERE CourseID = p_courseID;

        SET o_status = "Success: Course deleted";
    END IF;
    
    SELECT o_status;
END //

DELIMITER ;