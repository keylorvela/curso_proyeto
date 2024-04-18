DELIMITER //

CREATE PROCEDURE SP_Students_ReadAll_inGroup(
    IN p_groupID INT,

    OUT o_status VARCHAR(32)
)
BEGIN
    -- Control variables
    DECLARE v_groupCount INT;

    -- Set the group count
    SELECT COUNT(*)
        INTO @v_groupCount
        FROM GroupsByUser AS GbU
        WHERE GbU.GroupID = p_groupID;

    -- Verify found group ID
    IF @v_groupCount <= 0 THEN
        SET o_status = "Error: GroupID not found";
		SELECT o_status;
    ELSE
		SET o_status = "Success: Students found";

        SELECT
            U.ID AS UserID,
            P.ID AS PersonID,
            P.Photo,
            P.Email,
            P.PhoneNumber,
            P.Name,
            o_status
        FROM GroupsByUser AS GbU
        INNER JOIN User AS U
            ON GbU.UserID = U.ID
        INNER JOIN Person AS P
            ON U.PersonID = P.ID
        WHERE GbU.GroupID = p_groupID;

	END IF;
END //

DELIMITER ;