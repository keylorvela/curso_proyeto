-- -----------------------------------------------------
-- procedure SP_GetPaymentReceiptByID
-- -----------------------------------------------------

DELIMITER $$
USE `bqhd9nbafrpsvzpzrgvc`$$
CREATE DEFINER=`ukxp0bgvknoxjle0`@`%` PROCEDURE `SP_GetPaymentReceiptByID`(
    IN p_id INT
)
BEGIN
    SELECT
        SA.PaymentReceipt
    FROM
        StudentApplication AS SA
    WHERE
        SA.ID = p_id;
END$$

DELIMITER ;