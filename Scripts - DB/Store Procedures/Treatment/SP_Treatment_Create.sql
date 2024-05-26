-- -----------------------------------------------------
-- procedure SP_Treatment_Create
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Treatment_Create`(
    IN p_name VARCHAR(64),
    IN p_description TEXT,
    IN p_price decimal(15,2),
    IN p_includes TEXT,
	IN p_procedureDuration TEXT,
	IN p_effectDuration TEXT,
	IN p_information TEXT,
    IN p_categoryID INT,
    IN p_treatmentImage VARCHAR(256),
    IN p_payLink VARCHAR(256),

    OUT o_treatmentID INT
)
BEGIN
	DECLARE categoryCount INT;
    
	SELECT COUNT(*)
		INTO @categoryCount
        FROM TreatmentCategory AS TC
        WHERE TC.ID = p_categoryID;
        
	IF @categoryCount <= 0 THEN
		SET o_treatmentID = -1;
		SELECT o_treatmentID;
	ELSE
		-- Insert the new treatment
		INSERT INTO Treatment (Name, Description, Price, Includes, ProcedureDuration, EffectDuration, Information, CategoryID, TreatmentImage, PayLink) 
			VALUES (p_name, p_description, p_price, p_includes, p_procedureDuration, p_effectDuration, p_information, p_categoryID, p_treatmentImage, p_payLink);
    
		SET o_treatmentID = LAST_INSERT_ID();
		SELECT o_treatmentID;
    END IF;
END$$

DELIMITER ;