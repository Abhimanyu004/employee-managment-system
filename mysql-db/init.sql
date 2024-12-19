CREATE DATABASE IF NOT EXISTS employee;
USE employee;
CREATE TABLE IF NOT EXISTS employees (
        first_name VARCHAR(255) NOT NULL,
        second_name VARCHAR(255) NOT NULL,
        emp_id VARCHAR(10) NOT NULL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_no CHAR(10) NOT NULL,
        dept ENUM('HR', 'Engineering', 'Marketing', 'Finance', 'Sales') NOT NULL,
        doj DATE NOT NULL,
        role VARCHAR(100) NOT NULL 
      );