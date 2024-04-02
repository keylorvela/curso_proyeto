DELIMITER //

CREATE PROCEDURE SP_Course_ListEnrolled(
    IN p_UserID INT
)
BEGIN
    SELECT
        C.Name,
        C.Description,
        G.ScheduleDate,
        G.ScheduleHour
    FROM GroupsByUser AS GU
    INNER JOIN bqhd9nbafrpsvzpzrgvc.Group AS G
        ON GU.GroupID = G.ID
    INNER JOIN Course AS C
        ON GU.CourseID = C.ID
    WHERE GU.UserID = p_UserID;
END //

DELIMITER ;