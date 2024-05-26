-- -----------------------------------------------------
-- procedure SP_Group_ListEnrolled
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_ListEnrolled`(
    IN p_UserID INT
)
BEGIN
    SELECT
        C.ID AS CourseID,
        G.ID AS GroupID,
        C.Name,
        C.Description,
        G.StartingDate,
        G.ScheduleDate,
        G.ScheduleHour
    FROM GroupsByUser AS GU
    INNER JOIN bqhd9nbafrpsvzpzrgvc.Group AS G
        ON GU.GroupID = G.ID
    INNER JOIN Course AS C
        ON G.CourseID = C.ID
    WHERE GU.UserID = p_UserID AND GU.isActive = true;
END$$

DELIMITER ;