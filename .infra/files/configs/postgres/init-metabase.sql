-- Create metabase database only if it doesn't exist
SELECT 'CREATE DATABASE metabase'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'metabase')\gexec

-- Grant privileges to postgres user
GRANT ALL PRIVILEGES ON DATABASE metabase TO postgres;
