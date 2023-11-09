package app

import (
	"log"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

type Config struct {
	BaseUrl                 string `env:"BASE_URL,required"`
	DefaultStationId        string `env:"DEFAULT_STATION_ID,required"`
	TrainUpdateInSeconds    int    `env:"TRAIN_UPDATE_IN_SECONDS,required"`
	TrainRoute              string `env:"TRAIN_ROUTE,required"`
	IncidentUpdateInSeconds int    `env:"TRAIN_UPDATE_IN_SECONDS,required"`
	IncidentRoute           string `env:"INCIDENT_ROUTE,required"`
}

// Generates a Config based on the values found in a .env file found in the root directory.
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
