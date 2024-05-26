-- -----------------------------------------------------
-- procedure SP_Treatment_Update
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Treatment_Update`(
    IN p_treatmentID INT,
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

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_treatmentCount INT;
    DECLARE v_treatmentCategoryCount INT;

    -- Check if the treatment exists
    SELECT COUNT(*)
        INTO @v_treatmentCount
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;
        
	SELECT COUNT(*)
        INTO @v_treatmentCategoryCount
        FROM TreatmentCategory AS TC
        WHERE TC.ID = p_categoryID;

    -- Error if the treatment does not exists
    IF @v_treatmentCount = 0 THEN
        SET o_status = "Error: Treatment NOT found";
	ELSEIF @v_treatmentCategoryCount = 0 THEN
		SET o_status = "Error: CategoryID NOT found";
    ELSE
        -- Update the treatment information
        UPDATE Treatment
            SET
                Name = p_name,
                Description = p_description,
                Price = p_price,
                Includes = p_includes,
                ProcedureDuration = p_procedureDuration,
                EffectDuration = p_effectDuration,
                Information = p_information,
                CategoryID = p_categoryID,
                TreatmentImage = p_treatmentImage,
                PayLink = p_payLink
            WHERE ID = p_treatmentID;

        SET o_status = "Success: Treatment updated";
    END IF;
    
    SELECT o_status;
END$$

DELIMITER ;