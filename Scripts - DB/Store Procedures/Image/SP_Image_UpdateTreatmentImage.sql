-- -----------------------------------------------------
-- procedure SP_Image_UpdateTreatmentImage
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_Image_UpdateTreatmentImage`(
    IN p_imageID INT,
    IN p_imageURL VARCHAR(64),

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variable
    DECLARE v_imageCount INT;
    DECLARE v_transactionStatus INT;

    -- Check if the Image exists
    SELECT COUNT(*)
        INTO @v_imageCount
        FROM TreatmentImage AS TI
        WHERE TI.ID = p_imageID;

    -- Start transaction
    START TRANSACTION;

    -- Error if the Image does not exists
    IF @v_imageCount <= 0 THEN
        SET o_status = "Error: Treatm.Image NOT found";
        SET v_transactionStatus = 0;
    ELSE
        -- Update the image url
        UPDATE TreatmentImage
            SET
                ImageUrl = p_imageURL
            WHERE ID = p_imageID;

        SET o_status = "Success: Treatm.Image updated";
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