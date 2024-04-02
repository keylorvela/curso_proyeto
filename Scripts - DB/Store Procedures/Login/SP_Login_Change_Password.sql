DELIMITER //

CREATE PROCEDURE SP_Login_Change_Password(
    IN p_userID INT,
    IN p_newPassword VARCHAR(64),
    
    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_UserCount INT;
    
    -- Check if the user exist
    SELECT COUNT(*)
        INTO @v_UserCount
        FROM User AS U
        WHERE U.ID = p_userID;
    
    IF @v_UserCount = 0 THEN
        SET o_status = 'Error: User not found.';
    ELSE
        -- Update user password
        UPDATE User
            SET Password = p_newPassword
            WHERE ID = p_userID;
        
        SET o_status = "Success: User updated";
    END IF;
END //

DELIMITER ;
