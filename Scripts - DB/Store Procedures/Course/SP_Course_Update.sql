-- -----------------------------------------------------
-- procedure SP_Course_Update
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Course_Update`(
    IN p_courseID INT,
    IN p_name VARCHAR(64),
    IN p_description text,
    IN p_topics text,
    IN p_includes text,
    IN p_duration text,
    IN p_price DECIMAL(15,2),
    IN p_courseImage VARCHAR(256),
    IN p_userTarget text,
    IN p_payLink VARCHAR(256),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_courseCount INT;

    -- Check if the course exists
    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS T
        WHERE T.ID = p_courseID;

    -- Error if the course does not exists
    IF @v_courseCount = 0 THEN
        SET o_status = "Error: Course NOT found";
    ELSE
        -- Update the course information
        UPDATE Course
        SET
            Course.Name = p_name,
            Course.Description = p_description,
            Course.Topics = p_topics,
            Course.Includes = p_includes,
            Course.Duration = p_duration,
            Course.Price = p_price,
            Course.CourseImage = p_courseImage,
            Course.UserTarget = p_userTarget,
            Course.PayLink = p_payLink
        WHERE ID = p_courseID;

        SET o_status = "Success: Course updated";
    END IF;
    
    SELECT o_status;
END$$

DELIMITER ;