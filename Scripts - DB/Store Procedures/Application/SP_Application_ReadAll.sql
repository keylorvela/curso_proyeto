-- -----------------------------------------------------
-- procedure SP_Application_ReadAll
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Application_ReadAll`()
BEGIN
    SELECT
        SA.ID,
        SA.StudentName,    
        SA.Email,
        SA.Date,    
        SA.PhoneNumber,    
        SA.StatusID,    
        SA.GroupID,    
        G.StartingDate,
        C.Name AS CourseName
    FROM StudentApplication AS SA
    INNER JOIN bqhd9nbafrpsvzpzrgvc.Group AS G
        ON SA.GroupID = G.ID
    INNER JOIN Course AS C
        ON G.CourseID = C.ID
	INNER JOIN StatusType AS ST
		ON SA.StatusID = ST.ID
	WHERE ST.StatusName = 'Pendiente';
END$$

DELIMITER ;