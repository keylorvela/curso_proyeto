-- -----------------------------------------------------
-- procedure SP_Treatment_ReadAll
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Treatment_ReadAll`(
    IN p_categoryID INT,
    IN p_limit INT,
    IN p_offset INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Verify if the input are right
    IF p_limit < 0 OR p_offset < 0 THEN
        SET o_status = "Error: Bad input";
        SELECT o_status;
    ELSE
		SET o_status = "Success: Treatments found";
        
		IF p_categoryID IS NULL THEN
			SELECT
				T.ID,
				T.Name,
				T.Description,
				T.Price,
				T.Includes,
				T.ProcedureDuration,
				T.EffectDuration,
				T.Information,
                T.TreatmentImage,
				o_status
			FROM Treatment AS T
			WHERE T.isActive = 1
            ORDER BY T.ID
			LIMIT p_limit
			OFFSET p_offset;
        ELSE
			SELECT
				T.ID,
				T.Name,
				T.Description,
				T.Price,
				T.Includes,
				T.ProcedureDuration,
				T.EffectDuration,
				T.Information,
                T.TreatmentImage,
				o_status
			FROM Treatment AS T
            WHERE T.CategoryID = p_categoryID AND T.isActive = 1
            ORDER BY T.ID
			LIMIT p_limit
			OFFSET p_offset;
		END IF;
    END IF;
END$$

DELIMITER ;