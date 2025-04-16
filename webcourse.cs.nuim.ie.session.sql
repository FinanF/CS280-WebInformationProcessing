-- Drop tables if they already exist
DROP TABLE IF EXISTS JourneyPlan;
DROP TABLE IF EXISTS TravelLog;
DROP TABLE IF EXISTS User;
-- User Model
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(password) >= 8),
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255),
    travel_logs JSON,
    -- Array of travel log IDs
    journey_plans JSON -- Array of journey plan IDs
);
-- Travel Log Model
CREATE TABLE TravelLog (
    travel_log_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    post_date DATE NOT NULL,
    tags JSON -- Array of strings
);
-- Journey Plan Model
CREATE TABLE JourneyPlan (
    journey_plan_id INT AUTO_INCREMENT PRIMARY KEY,
    journey_plan_name VARCHAR(255) NOT NULL,
    journey_plan_locations JSON,
    -- Array of strings
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    activities JSON,
    -- Array of strings
    description TEXT
);