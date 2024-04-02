DELIMITER //

CREATE PROCEDURE SP_Treatment_ReadAll(
    IN p_limit INT,
    IN p_offset INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Verify if the input are right
    IF p_limit < 0 OR p_offset < 0 THEN
        SET o_status = "Error: Bad input";
    ELSE
        SELECT
            Name, Description, Price 
            FROM Treatment AS T
            LIMIT p_limit
            OFFSET p_offset;

        SET o_status = "Success: Treatments found";
    END IF;
END //

DELIMITER ;