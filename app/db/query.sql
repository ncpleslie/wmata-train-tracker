-- name: SetStationId :one
INSERT INTO user_preferences (
  station_id
) VALUES (
  ?
)
RETURNING station_id;