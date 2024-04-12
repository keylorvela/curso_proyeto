DELIMITER //

CREATE PROCEDURE SP_Course_Create(
    IN p_startingDate DATE,
    IN p_date VARCHAR(128),
    IN p_hour TIME,
    IN p_capacity INT,
    IN p_name VARCHAR(32),
    IN p_description TEXT,
    IN p_price decimal(15,2),

    OUT o_status VARCHAR(32)
)
BEGIN
    DECLARE v_courseCount INT;
    DECLARE v_transactionStatus INT;

    SELECT COUNT(*)
        INTO @v_courseCount
        FROM Course AS C
        WHERE C.Name = p_name;

	-- Start transaction process
    START TRANSACTION;

    IF (@v_courseCount > 0) THEN
        SET o_status = "Error: Course repeated";
        SET v_transactionStatus = 0;
    ELSE
        INSERT INTO Course (Name, Description, Price)
            VALUES (p_name, p_description, p_price);

        INSERT INTO bqhd9nbafrpsvzpzrgvc.Group(StartingDate, ScheduleDate, ScheduleHour, Capacity, CourseID)
            VALUES (p_startingDate, p_date, p_hour, p_capacity, LAST_INSERT_ID());

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