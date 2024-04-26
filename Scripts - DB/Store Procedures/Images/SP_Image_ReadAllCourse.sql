DELIMITER //

CREATE PROCEDURE SP_Image_ReadAllCourse(
    IN p_courseID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    DECLARE v_courseCount INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.ID = p_courseID;

    -- Start transaction
    START TRANSACTION;

    -- If no review with that ID
    IF @v_courseCount <= 0 THEN
        SET o_status = "Error: Course NOT found";
        SET v_transactionStatus = 0;
    ELSE
        SET o_status = "Success: Images found";

        -- Select response
        SELECT
                TI.ID,
                TI.ImageUrl,
                o_status
            FROM CourseImage AS CI
            WHERE CI.CourseID = p_courseID;

        SET v_transactionStatus = 1;
    END IF;

    -- Commit or rollback transaction based on status
    IF v_transactionStatus = 1 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

END //

DELIMITER ;
