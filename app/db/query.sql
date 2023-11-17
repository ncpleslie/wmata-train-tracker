-- name: SetDefaultStationId :exec
INSERT INTO user_preferences (
  station_id
) VALUES (
  ?
)
ON CONFLICT DO NOTHING;

-- name: UpdateStationId :exec
UPDATE user_preferences SET station_id = ? WHERE unique_constant_column = 1;

-- name: GetStationId :one
SELECT station_id FROM user_preferences WHERE unique_constant_column = 1;

-- name: UpdateStationPage :exec
UPDATE user_preferences SET station_page = ? WHERE unique_constant_column = 1;

-- name: GetStationPage :one
SELECT station_page FROM user_preferences WHERE unique_constant_column = 1;