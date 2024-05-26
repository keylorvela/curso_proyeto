-- -----------------------------------------------------
-- procedure SP_Professors_Update
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Professors_Update`(
    IN p_personID INT,
    IN p_photo MEDIUMTEXT,
    IN p_email VARCHAR(64),
    IN p_phoneNumber VARCHAR(32),
    IN p_name VARCHAR(64),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Control variables
    DECLARE v_personCount INT;

    -- Set the group count
    SELECT COUNT(*)
        INTO @v_personCount
        FROM Person AS P
        WHERE P.ID = p_personID;

    -- Start transaction
    START TRANSACTION;

    -- Verify found group ID
    IF @v_personCount <= 0 THEN
        SET o_status = "Error: Person NOT found";
        ROLLBACK;
    ELSE
        UPDATE Person
            SET
                Photo = p_photo,
                Email = p_email,
                PhoneNumber = p_phoneNumber,
                Name = p_name
            WHERE Person.ID = p_personID;

		SET o_status = "Success: Person updated";

        COMMIT;
	END IF;

	SELECT o_status;
END$$

DELIMITER ;