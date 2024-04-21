DELIMITER //

CREATE PROCEDURE SP_Course_Create(
    IN p_name VARCHAR(64),
    IN p_description text,
    IN p_topics text,
    IN p_includes text,
    IN p_duration text,
    IN p_price DECIMAL(15,2),
    IN p_userTarget text,

    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_courseCount INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.Name = p_name;

	-- Start TRANSACTION process
    START TRANSACTION;

    IF (@v_courseCount > 0) THEN
        SET o_status = "Error: Course repeated";
        SET v_transactionStatus = 0;
    ELSE
        INSERT INTO Course (Name, Description, Topics, Includes, Duration, Price, UserTarget)
            VALUES (p_name, p_description, p_topics, p_includes, p_duration, p_price, p_userTarget);

        SET o_status = "Success: Course created";
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