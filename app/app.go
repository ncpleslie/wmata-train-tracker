package app

import (
	"context"

	"time"

	constants "github.com/ncpleslie/wmata-train-tracker/app/constants"
	trainDB "github.com/ncpleslie/wmata-train-tracker/app/db"

	train "github.com/ncpleslie/wmata-train-tracker/app/services"

	// api "github.com/ncpleslie/wmata-train-tracker/app/services"
	types "github.com/ncpleslie/wmata-train-tracker/app/types"
	utils "github.com/ncpleslie/wmata-train-tracker/app/utils"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	_ "modernc.org/sqlite"
)

// App struct
type App struct {
	ctx          context.Context
	config       Config
	data         Data
	trainService *train.Service
}

// A collection of values used throughout the application
type Data struct {
	stationId   *types.SafeStruct[string]
	stationPage *types.SafeStruct[int8]
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup is called when the app starts.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.config = generateConfig()

	trainDb, err := trainDB.Initialize(ctx, a.config.SQLiteURL)
	if err != nil {
		panic(err)
	}

	trainServiceConfig := train.Config{
		TrainsUrl:      a.config.BaseUrl + a.config.TrainRoute,
		IncidentsUrl:   a.config.BaseUrl + a.config.IncidentRoute,
		StationsUrl:    a.config.BaseUrl + a.config.StationsRoute,
		StationByIdUrl: a.config.BaseUrl + a.config.StationByIdRoute,
	}

	a.trainService = train.InitializeService(trainDb, trainServiceConfig)

	// resp, err := a.trainDB.SetStationId(a.ctx, a.config.DefaultStationId)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Println(resp)
}

func (a *App) OnReady(ctx context.Context) {
	// Wait for the frontend to have loaded correctly before continuing.
	time.Sleep(2 * time.Second)

	trainsRetriever := &TrainsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Trains,
			PollingRateInSeconds: a.config.TrainUpdateInSeconds,
		},
		trainService: a.trainService,
	}
	go utils.RunIntervalEvent(ctx, trainsRetriever, trainsRetriever.config)

	incidentsRetriever := &IncidentsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Incidents,
			PollingRateInSeconds: a.config.IncidentUpdateInSeconds,
		},
		trainService: a.trainService,
	}
	go utils.RunIntervalEvent(ctx, incidentsRetriever, incidentsRetriever.config)
	runtime.EventsEmit(ctx, constants.Started)
}

func (a *App) GetTrains() (train.TrainsResponse, error) {
	return a.trainService.GetTrains()
}

func (a *App) GetIncidents() (train.IncidentsResponse, error) {
	return a.trainService.GetIncidents()
}

func (a *App) GetStations() (train.StationsResponse, error) {
	return a.trainService.GetStations()

}

func (a *App) GetSelectedStation() (train.Station, error) {
	return a.trainService.GetSelectedStation()
}

func (a *App) SetSelectedStation(stationId string) {
	a.data.stationId.UpdateValue(stationId)
}

func (a *App) GetCurrentStationPage() int8 {
	return a.data.stationPage.ReadValue()
}

func (a *App) SetCurrentStationPage(page int8) {
	a.data.stationPage.UpdateValue(page)
}

type TrainsDataRetriever struct {
	config       utils.DataRetrieverConfig
	trainService *train.Service
}

func (t *TrainsDataRetriever) Run() (interface{}, error) {
	return t.trainService.GetTrains()
}

type IncidentsDataRetriever struct {
	config       utils.DataRetrieverConfig
	trainService *train.Service
}

func (t *IncidentsDataRetriever) Run() (interface{}, error) {
	return t.trainService.GetIncidents()
}
