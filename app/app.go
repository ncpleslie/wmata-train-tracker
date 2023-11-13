package app

import (
	"context"
	"time"

	constants "github.com/ncpleslie/wmata-train-tracker/app/constants"
	api "github.com/ncpleslie/wmata-train-tracker/app/services"
	types "github.com/ncpleslie/wmata-train-tracker/app/types"
	utils "github.com/ncpleslie/wmata-train-tracker/app/utils"
)

// App struct
type App struct {
	ctx    context.Context
	config Config
	data   Data
}

// A collection of values used throughout the application
type Data struct {
	stationId *types.SafeStruct[string]
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.config = generateConfig()
	a.data = Data{
		stationId: types.NewSafeStruct(a.config.DefaultStationId),
	}
}

func (a *App) OnReady(ctx context.Context) {
	// Wait for the frontend to have loaded correctly before continuing.
	time.Sleep(2 * time.Second)

	go func() {
		a.data.stationId.UpdateValue(a.config.DefaultStationId)
		time.Sleep(2 * time.Second)
		a.data.stationId.UpdateValue("B02")
		time.Sleep(20 * time.Second)
		a.data.stationId.UpdateValue("E03")
	}()

	trainsRetriever := &TrainsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Trains,
			PollingRateInSeconds: a.config.TrainUpdateInSeconds,
			Url:                  a.config.BaseUrl + a.config.TrainRoute,
		},
		stationId: a.data.stationId,
	}
	go utils.RunIntervalEvent(ctx, trainsRetriever, trainsRetriever.config)

	incidentsRetriever := &IncidentsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Incidents,
			PollingRateInSeconds: a.config.IncidentUpdateInSeconds,
			Url:                  a.config.BaseUrl + a.config.IncidentRoute,
		},
		stationId: a.data.stationId,
	}
	go utils.RunIntervalEvent(ctx, incidentsRetriever, incidentsRetriever.config)
}

func (a *App) GetTrainsByStationId(stationId string) (api.TrainsResponse, error) {
	return api.QueryTrpcApiGet[api.TrainRequest, api.TrainsResponse](
		a.config.BaseUrl+a.config.TrainRoute,
		api.TrainRequest{StationId: stationId},
	)
}

func (a *App) GetIncidents() (api.IncidentsResponse, error) {
	return api.QueryTrpcApiGet[api.IncidentRequest, api.IncidentsResponse](
		a.config.BaseUrl+a.config.IncidentRoute,
		api.IncidentRequest{StationId: a.data.stationId.ReadValue()},
	)
}

func (a *App) GetStations() (api.StationsResponse, error) {
	return api.QueryTrpcApiGet[api.StationRequest, api.StationsResponse](
		a.config.BaseUrl+a.config.StationsRoute,
		api.StationRequest{},
	)
}

type TrainsDataRetriever struct {
	config    utils.DataRetrieverConfig
	stationId *types.SafeStruct[string]
}

func (t *TrainsDataRetriever) Run() (interface{}, error) {
	return api.QueryTrpcApiGet[api.TrainRequest, api.TrainsResponse](
		t.config.Url,
		api.TrainRequest{StationId: t.stationId.ReadValue()},
	)
}

type IncidentsDataRetriever struct {
	config    utils.DataRetrieverConfig
	stationId *types.SafeStruct[string]
}

func (t *IncidentsDataRetriever) Run() (interface{}, error) {
	return api.QueryTrpcApiGet[api.IncidentRequest, api.IncidentsResponse](
		t.config.Url,
		api.IncidentRequest{StationId: t.stationId.ReadValue()},
	)
}
