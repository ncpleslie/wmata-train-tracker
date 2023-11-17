package app

import (
	"context"
	"time"

	constants "github.com/ncpleslie/wmata-train-tracker/app/constants"
	db "github.com/ncpleslie/wmata-train-tracker/app/db"
	train "github.com/ncpleslie/wmata-train-tracker/app/services"
	utils "github.com/ncpleslie/wmata-train-tracker/app/utils"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	_ "modernc.org/sqlite"
)

// App represents the main application struct, encapsulating the application's state and components.
//
// Fields:
//   - ctx:          The context.Context for managing the application's context.
//   - config:       Configuration settings for the application.
//   - trainService: The train service for interacting with train-related data.
//   - preferences:  Database queries for accessing user preferences.
type App struct {
	ctx          context.Context
	config       Config
	trainService *train.Service
	preferences  *db.Queries
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup initializes and starts the application.
// Startup is called by Wails.
// The function sets up the application's configuration, database connection,
// and initializes various services required for the application to run.

// Parameters:
//   - ctx: The context.Context for managing the application's context.
//   - a:   A pointer to the App struct representing the application.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.config = generateConfig()

	_, preferences, err := db.Initialize(ctx, a.config.SQLiteURL)
	if err != nil {
		panic(err)
	}
	a.preferences = preferences
	err = a.preferences.SetDefaultStationId(ctx, a.config.DefaultStationId)

	trainServiceConfig := train.Config{
		TrainsUrl:      a.config.BaseUrl + a.config.TrainRoute,
		IncidentsUrl:   a.config.BaseUrl + a.config.IncidentRoute,
		StationsUrl:    a.config.BaseUrl + a.config.StationsRoute,
		StationByIdUrl: a.config.BaseUrl + a.config.StationByIdRoute,
	}
	a.trainService = train.InitializeService(trainServiceConfig)
}

// OnReady is called when the application is considered ready to start.
// It is called by Wails when the UI has finish initializing.
//
// Note: This function is typically called once the application has completed its startup
// process and is ready to handle incoming requests. The delay before emitting the "Started"
// event may be adjusted based on specific requirements.
func (a *App) OnReady(ctx context.Context) {
	a.startBackgroundTasks(ctx)

	// Wait for the frontend to have loaded correctly before continuing.
	time.Sleep(2 * time.Second)
	runtime.EventsEmit(ctx, constants.Started)
}

// GetTrains retrieves information about trains based on the user's selected station.
// It returns a train.TrainsResponse containing a list of trains and an error, if any.
func (a *App) GetTrains() (train.TrainsResponse, error) {
	stationId, err := a.preferences.GetStationId(a.ctx)
	if err != nil {
		return train.TrainsResponse{}, err
	}

	return a.trainService.GetTrainsByStationId(stationId)
}

// GetIncidents retrieves information about incidents related to trains based on the user's selected station.
// It returns a train.IncidentsResponse containing a list of incidents and an error, if any.
func (a *App) GetIncidents() (train.IncidentsResponse, error) {
	stationId, err := a.preferences.GetStationId(a.ctx)
	if err != nil {
		return train.IncidentsResponse{}, err
	}

	return a.trainService.GetIncidentsByStationId(stationId)
}

// GetStations retrieves a list of all available train stations.
// It returns a train.StationsResponse containing a list of stations and an error, if any.
func (a *App) GetStations() (train.StationsResponse, error) {
	return a.trainService.GetStations()
}

// GetSelectedStation retrieves information about the user's currently selected station.
// It returns a train.Station representing the selected station and an error, if any.
func (a *App) GetSelectedStation() (train.Station, error) {
	stationId, err := a.preferences.GetStationId(a.ctx)
	if err != nil {
		return train.Station{}, err
	}

	return a.trainService.GetSelectedStationById(stationId)
}

// SetSelectedStation updates the user's selected station ID in preferences.
// It takes the new station ID as a parameter and returns an error, if any.
//
// Parameters:
//   - stationId:  The new station ID to set.
func (a *App) SetSelectedStation(stationId string) error {
	return a.preferences.UpdateStationId(a.ctx, stationId)
}

// GetCurrentStationPage retrieves the current page number for the user's selected station.
// It returns the current page number and an error, if any.
func (a *App) GetCurrentStationPage() (int64, error) {
	return a.preferences.GetStationPage(a.ctx)
}

// SetCurrentStationPage updates the current page number for the user's selected station in preferences.
// It takes the new page number as a parameter and returns an error, if any.
//
// Parameters:
//   - page: The new page number to set.
func (a *App) SetCurrentStationPage(page int64) error {
	return a.preferences.UpdateStationPage(a.ctx, page)
}

// startBackgroundTasks initiates and runs background tasks for periodically retrieving
// and updating train and incident data. It takes a context.Context as a parameter
// to manage the application's context.
//
// The function performs the following steps:
//  1. Creates a TrainsDataRetriever instance to retrieve and update train data
//     based on the specified polling rate and starts it as a goroutine.
//  2. Creates an IncidentsDataRetriever instance to retrieve and update incident data
//     based on the specified polling rate and starts it as a goroutine.
//
// Parameters:
//   - ctx: The context.Context for managing the application's context.
//
// Note: The background tasks run independently in goroutines and periodically fetch
// updated train and incident data based on the configured polling rates.
func (a *App) startBackgroundTasks(ctx context.Context) {
	trainsRetriever := &TrainsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Trains,
			PollingRateInSeconds: a.config.TrainUpdateInSeconds,
		},
		ctx:          ctx,
		trainService: a.trainService,
		preferences:  a.preferences,
	}
	go utils.RunIntervalEvent(ctx, trainsRetriever, trainsRetriever.config)

	incidentsRetriever := &IncidentsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Incidents,
			PollingRateInSeconds: a.config.IncidentUpdateInSeconds,
		},
		ctx:          ctx,
		trainService: a.trainService,
		preferences:  a.preferences,
	}
	go utils.RunIntervalEvent(ctx, incidentsRetriever, incidentsRetriever.config)
}

// TrainsDataRetriever is a data retriever implementation for fetching and updating train data.
// It implements the utils.DataRetriever interface.
//
// Fields:
//   - config:       Configuration for the data retriever.
//   - ctx:          The context.Context for managing the data retrieval process.
//   - trainService: The train service for interacting with train-related data.
//   - preferences:  Database queries for accessing user preferences.
//
// Methods:
//   - Run(): Implements the Run method of the utils.DataRetriever interface.
//     It retrieves the user's selected station ID from preferences
//     and calls the GetTrainsByStationId method of the train service.
//
// Example:
//
//	retriever := &TrainsDataRetriever{ /* initialization */ }
//	data, err := retriever.Run()
type TrainsDataRetriever struct {
	config       utils.DataRetrieverConfig
	ctx          context.Context
	trainService *train.Service
	preferences  *db.Queries
}

// Implements the Run method of the utils.DataRetriever interface.
//
//	It retrieves the user's selected station ID from preferences
//	and calls the GetTrainsByStationId method of the train service.
func (t *TrainsDataRetriever) Run() (interface{}, error) {
	stationId, err := t.preferences.GetStationId(t.ctx)
	if err != nil {
		return train.Station{}, err
	}

	return t.trainService.GetTrainsByStationId(stationId)
}

// IncidentsDataRetriever is a data retriever implementation for fetching and updating incident data.
// It implements the utils.DataRetriever interface.
//
// Fields:
//   - config:       Configuration for the data retriever.
//   - ctx:          The context.Context for managing the data retrieval process.
//   - trainService: The train service for interacting with train-related data.
//   - preferences:  Database queries for accessing user preferences.
//
// Methods:
//   - Run(): Implements the Run method of the utils.DataRetriever interface.
//     It retrieves the user's selected station ID from preferences
//     and calls the GetIncidentsByStationId method of the train service.
//
// Example:
//
//	retriever := &IncidentsDataRetriever{ /* initialization */ }
//	data, err := retriever.Run()
type IncidentsDataRetriever struct {
	config       utils.DataRetrieverConfig
	ctx          context.Context
	trainService *train.Service
	preferences  *db.Queries
}

// Implements the Run method of the utils.DataRetriever interface.
//
//	It retrieves the user's selected station ID from preferences
//	and calls the GetIncidentsByStationId method of the train service.
func (t *IncidentsDataRetriever) Run() (interface{}, error) {
	stationId, err := t.preferences.GetStationId(t.ctx)
	if err != nil {
		return train.Station{}, err
	}

	return t.trainService.GetIncidentsByStationId(stationId)
}
