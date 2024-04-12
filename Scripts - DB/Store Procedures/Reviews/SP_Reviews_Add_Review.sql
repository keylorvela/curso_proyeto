DELIMITER //

CREATE PROCEDURE SP_Reviews_Add_Review(
    IN p_name VARCHAR(64),
    IN p_reviewContent text,
    IN p_stars INT,
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

    -- If no treatment with that ID
    IF @v_treatmentCount <= 0 THEN
        SET o_status = "Error: Treatment NOT found";
        SET v_transactionStatus = 0;
    ELSE
        -- Insert the new review
        INSERT INTO Review(Name, ReviewContent, PublishedDate, Stars, Response, TreatmentID)
            VALUES(p_name, p_reviewContent, CURRENT_DATE(), p_stars, "", p_treatmentID);

        SET o_status = "Success: Review added";
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
