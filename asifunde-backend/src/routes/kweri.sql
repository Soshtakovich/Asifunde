
UPDATE Subjects
SET Subject_ID = 3
WHERE Subject_ID = 11;

-- Step 2: Associate Teachers with Subjects
INSERT INTO Teacher_Subjects (Teacher_ID, Subject_ID) VALUES
(1, 1),  -- Teacher 1 teaches Mathematics (Subject 1)
(2, 2),  -- Teacher 2 teaches Physical Sciences (Subject 2)
(3, 1),  -- Teacher 3 teaches Mathematics (Subject 1)
(4, 2),  -- Teacher 4 teaches Physical Sciences (Subject 2)
(5, 1),  -- Teacher 5 teaches Mathematics (Subject 1)
(6, 2),  -- Teacher 6 teaches Physical Sciences (Subject 2)
(6, 1),  -- Teacher 6 also teaches Mathematics (Subject 1) in Grade 11
(7, 3),  -- Teacher 7 teaches an additional subject (Subject 3)
(7, 1);  -- Teacher 7 teaches Mathematics (Subject 1) in Grade 11