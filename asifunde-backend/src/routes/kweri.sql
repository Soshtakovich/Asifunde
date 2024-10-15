-- Step 1: Insert Assessment
INSERT INTO Assessments (Subject_ID, Name, Description, DueDate, Total_Mark)
VALUES (2, 'Forces', 'Newtons laws', '2024-10-12', 80);



INSERT INTO Assessment_Marks (Assessment_ID, Learner_ID, Mark, Submission_Date)
VALUES (7, 1, 83, CURDATE());
