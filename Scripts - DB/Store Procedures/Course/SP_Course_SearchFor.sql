-- -----------------------------------------------------
-- procedure SP_Course_SearchFor
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Course_SearchFor`(
    IN p_courseID INT,
    OUT o_status VARCHAR(32)
)
BEGIN

    DECLARE v_courseCount INT;

    SELECT COUNT(*)
		INTO @v_courseCount
		FROM Course AS C
		WHERE C.ID = p_courseID;

    IF @v_courseCount = 0 THEN
        SET o_status = "Error: Course NOT found";
        SELECT o_status;
    ELSE
		SET o_status = "Success: Course found";
        
        SELECT
            C.ID,
            C.Name,
            C.Description,
            C.Topics,
            C.Includes,
            C.Duration,
            C.Price,
            C.CourseImage,
            C.UserTarget,
            C.PayLink,
            o_status
        FROM Course AS C
        WHERE C.ID = p_courseID AND C.isActive = 1;
    END IF;

END$$

DELIMITER ;