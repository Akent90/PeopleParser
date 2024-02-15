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