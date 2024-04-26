DELIMITER //

CREATE PROCEDURE SP_Image_AddCourseImage(
    IN p_imageURL TEXT,
    IN p_courseID INT,
    IN p_imageType VARCHAR(32),

    OUT o_status INT
)
BEGIN
	-- Declare control variables
	DECLARE v_courseCount INT;
	DECLARE v_imageTypeID INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.ID = p_courseID;

    SELECT IT.ID
        INTO @v_imageTypeID
        FROM ImageType AS IT
        WHERE IT.Name = p_imageType;

    -- Start transaction
    START TRANSACTION;

    -- If no course with that ID
    IF @v_courseCount <= 0 OR @v_imageTypeID IS NULL THEN
        SET o_status = "Error: Course/ImgType NOT found";
        SET v_transactionStatus = 0;
    ELSE
        -- Insert the new image
        INSERT INTO CourseImage(ImageUrl, CourseID, ImageTypeID)
            VALUES(p_imageURL, p_courseID, @v_imageTypeID);

        SET o_status = "Success: Course Image added";
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