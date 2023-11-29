package main

import (
	"context"
	"testing"

	app "github.com/ncpleslie/wmata-train-tracker/app"
	"github.com/stretchr/testify/mock"
)

type MockQueries struct {
	mock.Mock
}

func (m *MockQueries) SetDefaultStationId(ctx context.Context, stationID string) error {
	args := m.Called(ctx, stationID)
	return args.Error(0)
}

func (m *MockQueries) GetStationId(ctx context.Context) (string, error) {
	args := m.Called(ctx)
	return "", args.Error(0)
}

func (m *MockQueries) GetStationPage(ctx context.Context) (int64, error) {
	args := m.Called(ctx)
	return 0, args.Error(0)
}

func (m *MockQueries) UpdateStationId(ctx context.Context, stationID string) error {
	args := m.Called(ctx, stationID)
	return args.Error(0)
}

func (m *MockQueries) UpdateStationPage(ctx context.Context, stationPage int64) error {
	args := m.Called(ctx, stationPage)
	return args.Error(0)
}

func TestStartup(t *testing.T) {
	application := app.NewApp()
	ctx := context.TODO()
	mockQueries := new(MockQueries)

	config := app.Config{
		BaseUrl:                 "",
		DefaultStationId:        "B01",
		TrainUpdateInSeconds:    3000,
		TrainRoute:              "trainRoute",
		IncidentUpdateInSeconds: 3000,
		IncidentRoute:           "incidentRoute",
		StationByIdRoute:        "stationByIdRoute",
		StationsRoute:           "stationsRoute",
		SQLiteURL:               "sql",
	}

	// Set expectations for the mock database method calls
	mockQueries.On("SetDefaultStationId", ctx, config.DefaultStationId).Return(nil)

	application.InitializeApplicationServices(ctx, config, mockQueries)
	mockQueries.AssertExpectations(t)
}
