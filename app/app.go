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
	a.data = Data{
		stationId:   types.NewSafeStruct(a.config.DefaultStationId),
		stationPage: types.NewSafeStruct(int8(0)),
	}
}

func (a *App) OnReady(ctx context.Context) {
	// Wait for the frontend to have loaded correctly before continuing.
	time.Sleep(2 * time.Second)

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

func (a *App) GetTrains() (api.TrainsResponse, error) {
	return api.QueryTrpcApiGet[api.TrainRequest, api.TrainsResponse](
		a.config.BaseUrl+a.config.TrainRoute,
		api.TrainRequest{StationId: a.data.stationId.ReadValue()},
	)
}

func (a *App) GetIncidents() (api.IncidentsResponse, error) {
	return api.QueryTrpcApiGet[api.IncidentRequest, api.IncidentsResponse](
		a.config.BaseUrl+a.config.IncidentRoute,
		api.IncidentRequest{StationId: a.data.stationId.ReadValue()},
	)
}

func (a *App) GetStations() (api.StationsResponse, error) {
	return api.QueryTrpcApiGet[api.StationsRequest, api.StationsResponse](
		a.config.BaseUrl+a.config.StationsRoute,
		api.StationsRequest{},
	)
}

func (a *App) GetSelectedStation() (api.Station, error) {
	return api.QueryTrpcApiGet[api.StationRequest, api.Station](
		a.config.BaseUrl+a.config.StationByIdRoute,
		api.StationRequest{StationId: a.data.stationId.ReadValue()},
	)
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
