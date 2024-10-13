START TRANSACTION;

ALTER TABLE Subjects ADD COLUMN Icon VARCHAR(100);

UPDATE Subjects
SET Icon = CASE
    WHEN Subject_ID = 1 THEN 'bx bx-math'
    WHEN Subject_ID = 2 THEN 'bx bxl-sketch'
    ELSE NULL
END
WHERE Subject_ID IN (1, 2);

COMMIT;
