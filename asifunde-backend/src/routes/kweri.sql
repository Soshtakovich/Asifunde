START TRANSACTION;

-- Insert sample content
INSERT INTO Content (Subject_ID, Title, Description) VALUES
    (2, 'Electricity', 'Fundamentals of Electric Circuits'),
    (2, 'Forces', 'Understanding Foreces');

-- Insert sample sub-content with links
INSERT INTO Sub_Content (Content_ID, Sub_Title, Description, Link) VALUES
    (5, 'Force', 'Learn how to factor algebraic expressions.', 'path/to/factorise.pdf'),
    (5, 'Gravity', 'Techniques for solving equations for x.', 'path/to/solve_for_x.pdf'),
    (5, 'Friction', 'Methods for grouping algebraic terms.', 'path/to/grouping_terms.pdf'),
    (6, 'Energy', 'Introduction to the concept of patterns.', 'path/to/pattern_concept.pdf'),
    (6, 'Statics', 'Steps to find the rule of a pattern.', 'path/to/pattern_rule.pdf'),
    (6, 'Dynamics', 'Deriving the general formula for patterns.', 'path/to/general_formula.pdf');


COMMIT;
