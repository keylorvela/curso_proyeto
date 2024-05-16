DELIMITER //

CREATE PROCEDURE SP_Group_ListGroupsOfTeacher(
    IN p_UserID INT
)
BEGIN
    SELECT
        G.ID AS GroupID,
        C.ID AS CourseID,
        C.Name AS CourseName,
        G.ScheduleDate,
        G.ScheduleHour
    FROM bqhd9nbafrpsvzpzrgvc.Group AS G
    INNER JOIN Course AS C
        ON G.CourseID = C.ID
    WHERE G.Teacher_UserID = p_UserID;
END //

DELIMITER ;