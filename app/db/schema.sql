CREATE TABLE IF NOT EXISTS user_preferences (
    id INTEGER PRIMARY KEY,
    station_id TEXT NOT NULL,
    station_page INTEGER DEFAULT 0 NOT NULL,
    unique_constant_column INTEGER DEFAULT 1 NOT NULL -- Enforce only one row
);
