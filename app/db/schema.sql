CREATE TABLE IF NOT EXISTS user_preferences (
    id INTEGER PRIMARY KEY,
    station_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_activity (
    id INTEGER PRIMARY KEY,
    station_page INTEGER  NOT NULL
);