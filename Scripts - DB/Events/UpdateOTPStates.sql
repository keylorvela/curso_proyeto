delimiter |

CREATE EVENT UpdateOTPStates
ON SCHEDULE EVERY 12 HOUR
DO
BEGIN
    UPDATE OTP
		SET isActive = 0
        WHERE isActive = 1 AND TIMESTAMPDIFF(MINUTE, creationDate, NOW()) >= 30;
END|

delimiter ;