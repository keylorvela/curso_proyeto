-- -----------------------------------------------------
-- procedure SP_Group_GetGroupInformation
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Group_GetGroupInformation`(
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_groupCount INT;

    SELECT COUNT(*)
        INTO @v_groupCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;

    IF (@v_groupCount <= 0) THEN
        SET o_status = "Error: Group does NOT exists";
        SELECT o_status;
    ELSE
        -- Set teacher information
        SELECT
            U.ID AS UserID,
            P.ID AS PersonID,
            P.Name,
            P.Email,
            P.PhoneNumber
        INTO
            @v_UserID,
            @v_PersonID,
            @v_TeacherName,
            @v_TeacherEmail,
            @v_TeacherPhoneNumber
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        INNER JOIN User AS U
            ON G.Teacher_UserID = U.ID
        INNER JOIN Person AS P
            ON U.PersonID = P.ID
        INNER JOIN UserType AS UT
            ON U.UserTypeID = UT.ID
        WHERE G.ID = p_groupID AND UT.TypeName = "Profesor";

        SET o_status = "Success: Group created";

        -- Get group information
        SELECT
            C.ID AS CourseID,
            G.ID AS GroupID,
            G.Teacher_UserID AS TeacherID,
            G.Capacity AS Capacity,
            G.StartingDate AS StartingDate,
            @v_TeacherName AS TeacherName,
            @v_TeacherEmail AS TeacherEmail,
            @v_TeacherPhoneNumber AS TeacherPhoneNumber,
            C.Name,
            G.ScheduleDate,
            G.ScheduleHour,
            o_status
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        INNER JOIN Course AS C
            ON G.CourseID = C.ID
        WHERE G.ID = p_groupID;

    END IF;

END$$

DELIMITER ;