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
}

func (a *App) OnReady(ctx context.Context) {
	// Wait for the frontend to have loaded correctly before continuing.
	time.Sleep(2 * time.Second)
	stationId := types.NewSafeStruct(a.config.DefaultStationId)

	go func() {
		stationId.UpdateValue(a.config.DefaultStationId)
		time.Sleep(2 * time.Second)
		stationId.UpdateValue("B02")
		time.Sleep(20 * time.Second)
		stationId.UpdateValue("E03")
	}()

	trainsRetriever := &TrainsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Trains,
			PollingRateInSeconds: a.config.TrainUpdateInSeconds,
			Url:                  a.config.BaseUrl + a.config.TrainRoute,
		},
		stationId: stationId,
	}
	go utils.RunIntervalEvent(ctx, trainsRetriever, trainsRetriever.config)

	incidentsRetriever := &IncidentsDataRetriever{
		config: utils.DataRetrieverConfig{
			EventName:            constants.Incidents,
			PollingRateInSeconds: a.config.IncidentUpdateInSeconds,
			Url:                  a.config.BaseUrl + a.config.IncidentRoute,
		},
		stationId: stationId,
	}
	go utils.RunIntervalEvent(ctx, incidentsRetriever, incidentsRetriever.config)
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
