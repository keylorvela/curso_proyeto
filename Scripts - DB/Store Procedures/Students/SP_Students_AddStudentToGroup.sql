-- -----------------------------------------------------
-- procedure SP_Students_AddStudentToGroup
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Students_AddStudentToGroup`(
    IN p_userID INT,
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Control variables
    DECLARE v_groupCount INT;
    DECLARE v_userCount INT;
    DECLARE v_registerCount INT;
    DECLARE v_transactionStatus INT;
    DECLARE v_userTypeStudent INT;

    -- Get the user type student ID
    SELECT UT.ID
        INTO @v_userTypeStudent
        FROM UserType AS UT
        WHERE UT.TypeName = "Estudiante";

    -- Check if the group exists
    SELECT COUNT(*)
        INTO @v_groupCount
        FROM bqhd9nbafrpsvzpzrgvc.Group AS G
        WHERE G.ID = p_groupID;

    -- Check if the user exists
    SELECT COUNT(*)
        INTO @v_userCount
        FROM User AS U
        WHERE U.ID = p_userID AND U.UserTypeID = @v_userTypeStudent;

    -- Check if the user is already registered
    SELECT COUNT(*)
        INTO @v_registerCount
        FROM GroupsByUser AS GBU
        WHERE GBU.UserID = p_userID AND GBU.GroupID = p_groupID AND GBU.isActive = true;

    -- Start transaction process
    START TRANSACTION;

    -- Verify counters
    IF @v_groupCount <= 0 OR @v_userCount <= 0 THEN
        SET o_status = "Error: Group / User not found";
        SET v_transactionStatus = 0;
    ELSEIF @v_registerCount > 0 THEN
        SET o_status = "Error: User already registered";
        SET v_transactionStatus = 0;
    ELSE
        INSERT INTO bqhd9nbafrpsvzpzrgvc.GroupsByUser(UserID,GroupID)
            VALUES(p_userID, p_groupID);

		SET o_status = "Success: Student reg. in group";
        SET v_transactionStatus = 1;
	END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT o_status;
END$$

DELIMITER ;