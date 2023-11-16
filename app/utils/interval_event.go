package utils

import (
	"context"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type IntervalEvent interface {
	Run() (interface{}, error)
}

type DataRetrieverConfig struct {
	EventName            string
	PollingRateInSeconds int
}

func RunIntervalEvent(ctx context.Context, retrieveData IntervalEvent, config DataRetrieverConfig) {
	for {
		data, err := retrieveData.Run()
		if err != nil {
			runtime.EventsEmit(ctx, config.EventName+"_error", data)
			time.Sleep(time.Duration(config.PollingRateInSeconds) * time.Second)
			continue
		}

		runtime.EventsEmit(ctx, config.EventName, data)
		time.Sleep(time.Duration(config.PollingRateInSeconds) * time.Second)
	}
}
