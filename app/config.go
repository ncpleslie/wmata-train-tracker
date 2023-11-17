package app

import (
	"log"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

// Config represents the configuration settings for the application, loaded from environment variables.
//
// Fields:
//   - BaseUrl:                 The base URL for API endpoints.
//   - DefaultStationId:        The default station ID for the application.
//   - TrainUpdateInSeconds:    The polling rate in seconds for updating train data.
//   - TrainRoute:              The route for fetching train data.
//   - IncidentUpdateInSeconds: The polling rate in seconds for updating incident data.
//   - IncidentRoute:           The route for fetching incident data.
//   - StationByIdRoute:        The route for fetching station data by ID.
//   - StationsRoute:           The route for fetching all stations data.
//   - SQLiteURL:               The URL for the SQLite database.
type Config struct {
	BaseUrl                 string `env:"BASE_URL,required"`
	DefaultStationId        string `env:"DEFAULT_STATION_ID,required"`
	TrainUpdateInSeconds    int    `env:"TRAIN_UPDATE_IN_SECONDS,required"`
	TrainRoute              string `env:"TRAIN_ROUTE,required"`
	IncidentUpdateInSeconds int    `env:"TRAIN_UPDATE_IN_SECONDS,required"`
	IncidentRoute           string `env:"INCIDENT_ROUTE,required"`
	StationByIdRoute        string `env:"STATION_BY_ID_ROUTE,required"`
	StationsRoute           string `env:"STATIONS_ROUTE,required"`
	SQLiteURL               string `env:"SQLITE_URL,required"`
}

// generateConfig loads configuration settings from environment variables using the godotenv and env packages.
//
// Returns:
//   - Config: The configuration settings for the application.
//
// Note: The function panics if there is an error loading the .env file or parsing environment variables.
func generateConfig() Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		panic(err)
	}

	var cfg = Config{}

	err = env.Parse(&cfg)
	if err != nil {
		log.Fatalf("Unable to parse environment variables: %e", err)
		panic(err)
	}

	return cfg
}
