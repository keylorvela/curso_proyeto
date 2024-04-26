DELIMITER //

CREATE PROCEDURE SP_Image_AddTreatmentImage(
    IN p_imageURL TEXT,
    IN p_treatmentID INT,
    IN p_imageType VARCHAR(32),

    OUT o_status INT
)
BEGIN
	-- Declare control variables
	DECLARE v_treatmentCount INT;
	DECLARE v_imageTypeID INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_treatmentCount
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;

    SELECT IT.ID
        INTO @v_imageTypeID
        FROM ImageType AS IT
        WHERE IT.Name = p_imageType;

    -- Start transaction
    START TRANSACTION;

    -- If no treatment with that ID
    IF @v_treatmentCount <= 0 OR @v_imageTypeID IS NULL THEN
        SET o_status = "Error: Treatm/ImgType NOT found";
        SET v_transactionStatus = 0;
    ELSE
        -- Insert the new image
        INSERT INTO TreatmentImage(ImageUrl, TreatmentID, ImageTypeID)
            VALUES(p_imageURL, p_treatmentID, @v_imageTypeID);

        SET o_status = "Success: Treatm. Image added";
        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

    SELECT o_status;
END //

DELIMITER ;