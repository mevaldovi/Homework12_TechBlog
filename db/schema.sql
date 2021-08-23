DROP DATABASE IF EXISTS techblog_db;
CREATE DATABASE techblog_db;

SELECT sourcecode_id FROM sourcecodes_tags 
WHERE sourcecode_id NOT IN (SELECT id FROM sourcecodes AS tmp);