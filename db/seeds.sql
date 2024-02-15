USE EmployeeDirectory_db;

INSERT INTO department (name) VALUES
('Engineering'),
('Human Resources'),
('Finance'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('HR Manager', 70000, 2),
('Accountant', 75000, 3),
('Marketing Coordinator', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Locke', 1, NULL),
('Desmond', 'Hume', 2, NULL),
('Juliet', 'Burke', 3, NULL),
('Benjamin', 'Linus', 4, 1);