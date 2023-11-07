package app

import (
	"context"

	train "github.com/ncpleslie/wmata-train-tracker/app/services"
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

// Gets a collection of trains based on the provided stationId
func (a *App) GetTrainsByStationId(stationId string) (train.TrainsResponse, error) {
	return train.QueryTrpcApiGet[train.TrainRequest, train.TrainsResponse](
		a.config.BaseUrl+"train.getTrains",
		train.TrainRequest{StationId: stationId},
	)
}
