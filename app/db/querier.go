// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0

package train_db

import (
	"context"
)

type Querier interface {
	GetStationId(ctx context.Context) (string, error)
	GetStationPage(ctx context.Context) (int64, error)
	SetDefaultStationId(ctx context.Context, stationID string) error
	UpdateStationId(ctx context.Context, stationID string) error
	UpdateStationPage(ctx context.Context, stationPage int64) error
}

var _ Querier = (*Queries)(nil)
