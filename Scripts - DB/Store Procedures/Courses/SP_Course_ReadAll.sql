DELIMITER //

CREATE PROCEDURE SP_Course_ReadAll(
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

        SELECT
            C.ID,
            C.Name,
            C.Description,
            C.Topics,
            C.Includes,
            C.Duration,
            C.Price,
            C.UserTarget,
            o_status
        FROM Course AS C
        WHERE C.isActive = 1
        LIMIT p_limit
        OFFSET p_offset;

    END IF;
END //

DELIMITER ;