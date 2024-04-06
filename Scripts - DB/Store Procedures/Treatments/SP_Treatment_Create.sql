DELIMITER //

CREATE PROCEDURE SP_Treatment_Create(
    IN p_name VARCHAR(64),
    IN p_description TEXT,
    IN p_price decimal(15,2),
    IN p_categoryID INT,

    OUT o_treatmentID INT
)
BEGIN
	DECLARE categoryCount INT;
    
	SELECT COUNT(*)
		INTO @categoryCount
        FROM TreatmentCategory AS TC
        WHERE TC.ID = p_categoryID;
        
	IF @categoryCount <= 0 THEN
		SELECT -1 AS treatmentID;
	ELSE
		-- Insert the new treatment
		INSERT INTO Treatment (Name, Description, Price, CategoryID) 
			VALUES (p_name, p_description, p_price, p_categoryID);
    
		SET o_treatmentID = LAST_INSERT_ID();
		SELECT o_treatmentID AS treatmentID;
    END IF;
END //

DELIMITER ;