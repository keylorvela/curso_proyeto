DELIMITER //

CREATE PROCEDURE SP_Treatment_Create(
    IN p_name VARCHAR(64),
    IN p_description TEXT,
    IN p_price decimal(15,2),
    IN p_categoryID INT,

    OUT o_treatmentID INT
)
BEGIN
    -- Insert the new treatment
    INSERT INTO Treatment (Name, Description, Price, CategoryID) 
        VALUES (p_name, p_description, p_price, p_categoryID);
    
    SET o_treatmentID = LAST_INSERT_ID();
END //

DELIMITER ;