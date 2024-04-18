DELIMITER //

CREATE PROCEDURE SP_Application_ReadAll()
BEGIN
    SELECT
        SA.ID,
        SA.StudentName,
        SA.PaymentReceipt,
        SA.Date,
        G.StartingDate,
        C.Name AS CourseName
    FROM StudentApplication AS SA
    INNER JOIN bqhd9nbafrpsvzpzrgvc.Group AS G
        ON SA.GroupID = G.ID
    INNER JOIN Course AS C
        ON G.CourseID = C.ID;
END //

DELIMITER ;