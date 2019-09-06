INSERT INTO accounts
(user_id, savings, checking, pin)
VALUES
($1, 0.00, 0.00, $2)
RETURNING savings, checking;