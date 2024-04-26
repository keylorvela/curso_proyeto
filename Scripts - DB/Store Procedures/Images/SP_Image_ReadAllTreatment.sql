DELIMITER //

CREATE PROCEDURE SP_Image_ReadAllTreatment(
    IN p_treatmentID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Declare control variables
    DECLARE v_treatmentCount INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_treatmentCount
        FROM Treatment AS T
        WHERE T.ID = p_treatmentID;

    -- Start transaction
    START TRANSACTION;

    -- If no review with that ID
    IF @v_treatmentCount <= 0 THEN
        SET o_status = "Error: Treatment NOT found";
        SET v_transactionStatus = 0;
    ELSE
        SET o_status = "Success: Images found";

        -- Select response
        SELECT
                TI.ID,
                TI.ImageUrl,
                o_status
            FROM TreatmentImage AS TI
            WHERE TI.TreatmentID = p_treatmentID;

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
