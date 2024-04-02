DELIMITER //

CREATE PROCEDURE SP_Course_DropOut(
    IN p_userID INT,
    IN p_groupID INT,
    OUT o_status VARCHAR(32)
)
BEGIN
    UPDATE GroupsByUser
        SET isActive = true
        WHERE UserID = p_userID AND GroupID = p_groupID;
END //

DELIMITER ;